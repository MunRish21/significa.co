import { env } from '$env/dynamic/private';
import { Resend } from 'resend';
import { getTextTemplate } from './template';
import { getTextTemplate as getMinimalTextTemplate } from './template-minimal';
import emailTemplate from './template.html?raw';
import minimalEmailTemplate from './template-minimal.html?raw';
import type { FormType } from '$components/contact-form.svelte';

const escapeHTML = (unsafeContent: string | undefined | null): string => {
  if (!unsafeContent) {
    return '&lt;empty&gt;';
  }

  return unsafeContent
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll(`'`, '&#39;');
};

let resendClient: Resend | null = null;
const getResend = () => {
  if (!env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured');
  }
  if (!resendClient) {
    resendClient = new Resend(env.RESEND_API_KEY);
  }
  return resendClient;
};

type SendEmailInput = {
  to: string[];
  subject: string;
  html?: string;
  text?: string;
  replyTo?: string;
};

export const sendEmail = async ({ to, subject, html, text, replyTo }: SendEmailInput) => {
  const from = env.RESEND_FROM_ADDRESS;
  if (!from) {
    throw new Error('RESEND_FROM_ADDRESS is not configured');
  }

  const resend = getResend();
  const { error } = await resend.emails.send({
    from,
    to,
    subject,
    ...(html ? { html } : {}),
    ...(text ? { text } : {}),
    ...(replyTo ? { replyTo } : {})
  } as Parameters<typeof resend.emails.send>[0]);

  if (error) {
    throw new Error(`Resend error: ${error.message || 'unknown'}`);
  }
};

export const sendTransactionalEmail = async ({
  name,
  email,
  subject,
  template = 'default'
}: {
  name: string;
  email: string;
  subject: string;
  template?: 'default' | 'minimal';
}) => {
  const safeName = escapeHTML(name);

  await sendEmail({
    to: [email],
    subject,
    html:
      template === 'minimal'
        ? minimalEmailTemplate.replaceAll('{{name}}', safeName)
        : emailTemplate.replaceAll('{{name}}', safeName),
    text: template === 'minimal' ? getMinimalTextTemplate(safeName) : getTextTemplate(safeName)
  });
};

export const sendEmailNotification = async ({
  name,
  email,
  message,
  formType,
  notionLink,
  notionErrorMessage
}: {
  name: string;
  email: string;
  message: string;
  formType: FormType;
  notionLink?: string;
  notionErrorMessage?: string;
}) => {
  const formTypeToDestinationEmail: Record<FormType, string | undefined> = {
    quote: env.NOTIFICATION_EMAIL_ADDRESS_QUOTE,
    career: env.NOTIFICATION_EMAIL_ADDRESS_CAREER,
    contact: env.NOTIFICATION_EMAIL_ADDRESS_CONTACT,
    estimations: env.NOTIFICATION_EMAIL_ADDRESS_ESTIMATIONS
  };

  const destinationEmail = formTypeToDestinationEmail[formType];

  if (!destinationEmail) {
    console.warn(
      `Destination email not configured: Skipping sending of email notification for form type ${formType}`
    );
    return;
  }

  const recipientEmails = destinationEmail
    .split(',')
    .map((e) => e.trim())
    .filter(Boolean);

  const errorMessage = notionErrorMessage
    ? `Note: failed to store submission to Notion: '${notionErrorMessage}'\n`
    : '';

  await sendEmail({
    to: recipientEmails,
    subject: `New ${formType} submission from ${name}`,
    replyTo: email,
    text: [
      errorMessage,
      `New website submission.\n`,
      notionLink && `Notion Link: ${notionLink}`,
      `Form: ${formType}`,
      `Name: ${name}`,
      `Email: ${email}`,
      ``,
      `Message:`,
      message
    ]
      .filter(Boolean)
      .join('\n')
  });
};
