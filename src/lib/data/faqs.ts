export const commonFaqsBlock = {
  _uid: 'faqs-common-1',
  component: 'faqs' as const,
  title: 'Frequently Asked Questions',
  questions: [
    {
      _uid: 'faq-1',
      component: 'faq' as const,
      question: "What if I'm not sure exactly what I need?",
      body: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: "That's okay! We work with you to clarify your needs. Our initial conversation is designed to help you figure out what you're trying to achieve." }] }] }
    },
    {
      _uid: 'faq-2',
      component: 'faq' as const,
      question: 'What is your pricing model?',
      body: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'We offer flexible pricing models tailored to your project. We can work with fixed budgets, time & materials, or outcome-based models depending on what works best for you.' }] }] }
    },
    {
      _uid: 'faq-3',
      component: 'faq' as const,
      question: 'How do you approach new projects?',
      body: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: "We start with a deep understanding of your goals and challenges. We combine strategic thinking with creative excellence to deliver solutions that truly matter." }] }] }
    },
    {
      _uid: 'faq-4',
      component: 'faq' as const,
      question: 'What happens after I contact you?',
      body: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: "We'll review your message and get back to you within 2 business days with next steps. This usually involves a call to discuss your project in more detail." }] }] }
    }
  ]
};
