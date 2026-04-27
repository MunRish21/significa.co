export const load = async ({ url }) => {
  const pathname = url.pathname;
  const isMissionPage = pathname.includes('mission');

  if (isMissionPage) {
    return {
      story: {
        name: 'Mission and values',
        full_slug: pathname,
        content: {
          component: 'handbook',
          html: `<div class="container mx-auto px-container"><div class="rich-text mx-auto mb-20 mt-10 max-w-2xl lg:mt-20"><img src="/assets/storyblok/mission-and-values.webp" alt="" class="mb-10 w-full rounded-lg"> <p class="pt-0.5 text-sm text-foreground-secondary"><span>Last updated</span> <span class="text-foreground-tertiary">·</span> <span class="text-foreground">6 September 2024</span></p> <h1 class="[&:first-of-type]:mt-0">Mission and values</h1></div> <div class="group rich-text @container my-10 md:my-14 lg:my-20"><h3 class="mx-auto max-w-2xl">We're on a mission to deliver<b> the best digital products. Period.</b> </h3><hr class="mx-auto max-w-2xl"><h2 class="mx-auto max-w-2xl">Our core values </h2><h3 class="mx-auto max-w-2xl">Empathy and compassion </h3><p class="mx-auto max-w-2xl">We put ourselves in the other person's shoes. We recognise we are all human and that, as such, we are all different. We embrace difference.</p><p class="mx-auto max-w-2xl">But beyond acknowledging other person's struggles, we go the extra mile to help them with their challenges. We are compassionate. We are a team.</p><h3 class="mx-auto max-w-2xl">Teamwork </h3><p class="mx-auto max-w-2xl">We're not tennis players smacking balls across the net by ourselves. Instead, like rowing, we all pull in the same direction. If one <i>decides</i> to stop, the canoe isn't getting anywhere. But if one has to stop, we all cheer them back up again.</p><p class="mx-auto max-w-2xl">We take everyone into account, and we see ourselves as part of a team. When we fail, we fail together. When we succeed, party times, we succeed together.</p><h3 class="mx-auto max-w-2xl">Playfulness </h3><p class="mx-auto max-w-2xl">We are witty by nature. We have fun at work while being extremely professional in what we do.</p><p class="mx-auto max-w-2xl">We believe a playful environment contributes to openness, which, on its side, fosters a willingness to spit out the most nonsensical ideas that often result in amazing things.</p><h3 class="mx-auto max-w-2xl">Integrity </h3><p class="mx-auto max-w-2xl">Integrity and trust go hand in hand. They form the bedrock of our genuine connections and our character. They guide us to act with honesty and moral clarity, ensuring our actions align with our Code of ethics. We foster an environment where reliability and ethical principles are not just appreciated. They are expected.</p><p class="mx-auto max-w-2xl">Maximum freedom, maximum responsibility, that's it!</p><h3 class="mx-auto max-w-2xl">Ambition </h3><p class="mx-auto max-w-2xl">We are ever-unsatisfied. We know there's always a better way to accomplish things, there's always a more efficient way to get there, and there's always a step closer to perfection.</p><p class="mx-auto max-w-2xl">We aspire higher. We push ourselves to be better. We push others to be better. Oh, and we don't mean at work alone, we mean in life in general.</p></div></div>`
        }
      }
    };
  }

  const pageName = pathname.split('/').pop() || 'Handbook';
  return {
    story: {
      name: pageName,
      full_slug: pathname,
      content: {
        component: 'handbook',
        body: [
          {
            type: 'heading',
            content: pageName.replace(/-/g, ' ').toUpperCase()
          },
          {
            type: 'paragraph',
            content: 'This is a handbook page with mock content.'
          }
        ]
      }
    }
  };
};
