import { isFormType } from '$components/contact-form.svelte';
import { env } from '$env/dynamic/private';
import { t } from '$lib/i18n';
import { sendEmailNotification, sendTransactionalEmail } from '$lib/mail/sendEmail.server.js';
import { notion } from '$lib/notion.server.js';
import { fail, redirect } from '@sveltejs/kit';

const NOTION_DB_LEADS = env.NOTION_DB_LEADS;
const NOTION_DB_CANDIDATES = env.NOTION_DB_CANDIDATES;
const NOTION_DB_CONTACTS = env.NOTION_DB_CONTACTS;
const isNotionEnabled = Boolean(env.NOTION_TOKEN);

type FormFields = {
  name: string;
  email: string;
  message: string;
  position?: string;
  budget?: string;
  'submitted-using-progressive-enhancement'?: string;
  'return-to'?: string;
  estimations?: string;
};

export const actions = {
  default: async (event) => {
    const data = await event.request.formData();
    const formType = event.params.type;
    let notionLink = '';

    if (!isFormType(formType)) {
      return fail(500, {
        error: {
          message: 'Failed to send internal email notification'
        }
      });
    }

    const fields = Object.fromEntries(data.entries()) as FormFields;
    const { name, email, message } = fields;

    if (!name || !email || !message) {
      return fail(400, {
        error: {
          type: 'fields',
          fields: {
            name: !name,
            email: !email,
            message: !message
          }
        }
      });
    }

    try {
      if (!isNotionEnabled) {
        // Notion not configured — skip storing the lead. Email notification still fires below.
      } else {
        switch (event.params.type) {
          case 'quote':
            if (NOTION_DB_LEADS) {
              const response = await notion.pages.create({
                parent: { database_id: NOTION_DB_LEADS },
                properties: {
                  Name: { title: [{ text: { content: name } }] },
                  Email: { email: email },
                  Budget: { select: { name: fields.budget || 'n/a' } },
                  Message: { rich_text: [{ text: { content: message || '' } }] },
                  Status: { select: { name: 'To triage' } },
                  Type: { select: { name: 'Organic' } },
                  Source: { select: { name: 'Website' } },
                  'Account Owner': {
                    people: [{ id: 'd8a42f29-ea96-44d4-80bb-4129259b1d41', object: 'user' }]
                  }
                }
              });
              if ('url' in response) {
                notionLink = response.url;
              }
            }
            break;
          case 'estimations':
            if (NOTION_DB_LEADS) {
              const response = await notion.pages.create({
                parent: { database_id: NOTION_DB_LEADS },
                properties: {
                  Name: { title: [{ text: { content: name } }] },
                  Email: { email: email },
                  Message: { rich_text: [{ text: { content: message || '' } }] },
                  Status: { select: { name: 'To triage' } },
                  Estimations: { rich_text: [{ text: { content: fields.estimations || '' } }] }
                }
              });
              if ('url' in response) {
                notionLink = response.url;
              }
            }
            break;

          case 'career':
            if (NOTION_DB_CANDIDATES) {
              await notion.pages.create({
                parent: { database_id: NOTION_DB_CANDIDATES },
                properties: {
                  Name: { title: [{ text: { content: name } }] },
                  Email: { email: email },
                  Position: { select: { name: fields.position || 'n/a' } },
                  Message: { rich_text: [{ text: { content: message || '' } }] }
                }
              });
            }
            break;

          case 'contact':
            if (NOTION_DB_CONTACTS) {
              await notion.pages.create({
                parent: { database_id: NOTION_DB_CONTACTS },
                properties: {
                  Name: { title: [{ text: { content: name } }] },
                  Email: { email: email },
                  Message: { rich_text: [{ text: { content: message || '' } }] }
                }
              });
            }
            break;

          default:
            break;
        }
      }
    } catch (error) {
      console.error('Failed to store submission', error);

      const notionErrorMessage: string =
        error instanceof Error ? error.message.toString() : 'unknown error, please check the logs';

      sendEmailNotification({
        name,
        email,
        message,
        formType,
        notionErrorMessage
      });

      return fail(500, {
        error: {
          message: 'Failed to store form submission'
        }
      });
    }

    try {
      sendEmailNotification({
        name,
        email,
        message,
        formType,
        notionLink
      });
    } catch {
      return fail(500, {
        error: {
          message: 'Failed to send internal email notification'
        }
      });
    }

    try {
      const subject = t('form.subject');
      await sendTransactionalEmail({
        name,
        email,
        subject,
        template: event.params.type === 'quote' ? 'default' : 'minimal'
      });
    } catch {
      return fail(500, {
        error: {
          message: 'Failed to send email notification to user'
        }
      });
    }

    if (fields['submitted-using-progressive-enhancement']) {
      return { success: true };
    }

    const returnTo: string = fields['return-to'] || '/';

    throw redirect(302, returnTo);
  }
};
