export const commonFaqsBlock = {
  _uid: 'faqs-common-1',
  component: 'faqs' as const,
  title: 'Questions?',
  questions: [
    {
      _uid: 'faq-1',
      component: 'faq' as const,
      question: 'How much does a typical project cost?',
      body: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'A 5-page website starts around $200. Everything else depends on what you need—more pages, custom features, integrations. We quote before we build, no surprises.' }] }] }
    },
    {
      _uid: 'faq-2',
      component: 'faq' as const,
      question: 'How long does a project take?',
      body: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'A simple website: 2 weeks. Bigger projects are 4-12 weeks depending on scope. We lock in a timeline before we start.' }] }] }
    },
    {
      _uid: 'faq-3',
      component: 'faq' as const,
      question: 'What do you need from us to start?',
      body: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: "A conversation. Tell us about your business, what you want to build, and what success looks like. We'll handle the rest." }] }] }
    },
    {
      _uid: 'faq-4',
      component: 'faq' as const,
      question: 'Can you work from just an idea?',
      body: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Yes. We've built 80+ products from scratch. Bring us the idea and we'll map out strategy, roadmap, and how to launch it." }] }] }
    },
    {
      _uid: 'faq-5',
      component: 'faq' as const,
      question: 'Do you work internationally?',
      body: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Almost entirely. 95% of our clients are outside India. UK, Australia, Europe, US. Time zones are just time zones." }] }] }
    },
    {
      _uid: 'faq-6',
      component: 'faq' as const,
      question: 'How do we communicate?',
      body: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Whatever you prefer. Slack, WhatsApp, email, calls. We match your rhythm and send daily progress updates once we start.' }] }] }
    },
    {
      _uid: 'faq-7',
      component: 'faq' as const,
      question: 'How often do we get updates?',
      body: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Every day. Once the project kicks off, you get a daily report. No guessing where things stand.' }] }] }
    },
    {
      _uid: 'faq-8',
      component: 'faq' as const,
      question: 'Is there support after launch?',
      body: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Yes. 30 days of free support after launch for bugs and fixes. After that, we're available for whatever you need." }] }] }
    },
    {
      _uid: 'faq-9',
      component: 'faq' as const,
      question: 'Who owns the code and designs?',
      body: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: "You do. Everything. Code, designs, assets—all yours. We sign NDAs. We don't reuse or resell anything we build for you." }] }] }
    },
    {
      _uid: 'faq-10',
      component: 'faq' as const,
      question: 'Is our data confidential?',
      body: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Yes. Credentials, business details, project info—stays between us. Never shared outside the team.' }] }] }
    }
  ]
};

/** Walk a Storyblok rich-text doc and return concatenated plain text. */
function richTextToPlain(node: unknown): string {
  if (!node || typeof node !== 'object') return '';
  const n = node as { type?: string; text?: string; content?: unknown[] };
  if (n.type === 'text' && typeof n.text === 'string') return n.text;
  if (Array.isArray(n.content)) {
    return n.content.map(richTextToPlain).join(n.type === 'paragraph' ? '\n\n' : '');
  }
  return '';
}

/**
 * Returns commonFaqs as {question, answer} pairs ready for generateFAQSchema.
 * Use this on pages that ship FAQPage JSON-LD.
 */
export function getCommonFaqsForSchema(): { question: string; answer: string }[] {
  return commonFaqsBlock.questions.map((q) => ({
    question: q.question,
    answer: richTextToPlain(q.body).trim()
  }));
}
