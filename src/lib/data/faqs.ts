export const commonFaqsBlock = {
  _uid: 'faqs-common-1',
  component: 'faqs' as const,
  title: 'Frequently Asked Questions',
  questions: [
    {
      _uid: 'faq-1',
      component: 'faq' as const,
      question: 'How much does a typical project cost?',
      body: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'A standard 5-page website starts from as low as $200. Pricing scales with complexity, features, and scope, but we always work to find the best fit for your budget. No hidden costs, ever.' }] }] }
    },
    {
      _uid: 'faq-2',
      component: 'faq' as const,
      question: 'How long does a project take to complete?',
      body: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'It depends on the project. A simple website is delivered within 2 weeks from the day development starts—ready to launch almost immediately. Larger, more complex projects have timelines we agree on upfront before we begin.' }] }] }
    },
    {
      _uid: 'faq-3',
      component: 'faq' as const,
      question: 'What do you need from us to get started?',
      body: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Just a conversation. Our team is sharp enough to work from the basics—share some information about your business, your goals, and what you have in mind. We'll take it from there without overcomplicating things." }] }] }
    },
    {
      _uid: 'faq-4',
      component: 'faq' as const,
      question: 'Can you help if we only have an idea?',
      body: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Absolutely. We've built hundreds of projects from scratch. Share your idea and we'll put together a clear plan—including a roadmap and a strategy on how to take it to market successfully." }] }] }
    },
    {
      _uid: 'faq-5',
      component: 'faq' as const,
      question: 'Do you work with international clients?',
      body: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Yes—and that's actually our primary market. Over 95% of our clients are international, working with us from the UK, Australia, Spain, and across Europe. Time zones are never a barrier." }] }] }
    },
    {
      _uid: 'faq-6',
      component: 'faq' as const,
      question: 'How do we communicate during the project?',
      body: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'However works best for you—Slack, WhatsApp, email, or regular video calls. We adapt to your preferred tools and keep you updated every step of the way with daily progress updates once the project kicks off.' }] }] }
    },
    {
      _uid: 'faq-7',
      component: 'faq' as const,
      question: 'How often will we get project updates?',
      body: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Every single day. Once the project starts, you receive daily updates so you always know exactly where things stand. No radio silence, no surprises.' }] }] }
    },
    {
      _uid: 'faq-8',
      component: 'faq' as const,
      question: 'Do you offer post-launch support?',
      body: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Yes. Every project comes with a 30-day support policy after launch—covering any issues, fixes, or questions. For additional changes or ongoing support beyond that, we've got you covered too." }] }] }
    },
    {
      _uid: 'faq-9',
      component: 'faq' as const,
      question: 'Who owns the code and designs after delivery?',
      body: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: "You do—completely. We're happy to sign an NDA, and everything we build for you belongs to you. We do not reuse, repurpose, or retain any of your code, designs, or assets after delivery." }] }] }
    },
    {
      _uid: 'faq-10',
      component: 'faq' as const,
      question: 'Is our business information kept confidential?',
      body: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: '100%. We never share any credentials, business details, or project information outside our organisation. Everything is handled internally by our team with full confidentiality.' }] }] }
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
