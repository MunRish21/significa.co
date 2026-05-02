<script lang="ts">
  import '$styles/index.css';

  import { page } from '$app/stores';
  import TopNavigation from '$components/top-navigation.svelte';
  import Footer from '$components/footer.svelte';
  import HandbookModal from '$components/blocks/handbook-modal.svelte';
  import { BASE_URL, generateWebsiteSchema } from '$lib/utils/schema';

  export let data;

  let showMissionModal = false;

  function openMissionModal() {
    showMissionModal = true;
  }

  $: canonical = `${BASE_URL}${$page.url.pathname}`;
</script>

<svelte:head>
  <link rel="canonical" href={canonical} />
  <meta
    name="robots"
    content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  />
  <meta property="og:site_name" content="Techyor" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:url" content={canonical} />
  <script type="application/ld+json">
{generateWebsiteSchema()}
  </script>
</svelte:head>

<TopNavigation configuration={data.configuration.content} />
<slot context={{ openMissionModal }} />
{#if !$page.error}
  <Footer configuration={data.configuration.content} />
{/if}

<HandbookModal
  isOpen={showMissionModal}
  title="Mission and values"
  lastUpdated="6 September 2024"
  image="/assets/storyblok/mission-and-values.webp"
  expandUrl="/handbook/mission-and-values"
>
  <h3>We're on a mission to deliver <b>the best digital products. Period.</b></h3>
  <hr />

  <h2>Our core values</h2>

  <h3>Empathy and compassion</h3>
  <p>
    We put ourselves in the other person's shoes. We recognise we are all human and that, as such,
    we are all different. We embrace difference.
  </p>
  <p>
    But beyond acknowledging other person's struggles, we go the extra mile to help them with their
    challenges. We are compassionate. We are a team.
  </p>

  <h3>Teamwork</h3>
  <p>
    We're not tennis players smacking balls across the net by ourselves. Instead, like rowing, we
    all pull in the same direction. If one <i>decides</i> to stop, the canoe isn't getting anywhere.
    But if one has to stop, we all cheer them back up again.
  </p>
  <p>
    We take everyone into account, and we see ourselves as part of a team. When we fail, we fail
    together. When we succeed, party times, we succeed together.
  </p>

  <h3>Playfulness</h3>
  <p>
    We are witty by nature. We have fun at work while being extremely professional in what we do.
  </p>
  <p>
    We believe a playful environment contributes to openness, which, on its side, fosters a
    willingness to spit out the most nonsensical ideas that often result in amazing things.
  </p>

  <h3>Integrity</h3>
  <p>
    Integrity and trust go hand in hand. They form the bedrock of our genuine connections and our
    character. They guide us to act with honesty and moral clarity, ensuring our actions align with
    our Code of ethics. We foster an environment where reliability and ethical principles are not
    just appreciated. They are expected.
  </p>
  <p>Maximum freedom, maximum responsibility, that's it!</p>

  <h3>Ambition</h3>
  <p>
    We are ever-unsatisfied. We know there's always a better way to accomplish things, there's
    always a more efficient way to get there, and there's always a step closer to perfection.
  </p>
  <p>
    We aspire higher. We push ourselves to be better. We push others to be better. Oh, and we don't
    mean at work alone, we mean in life in general.
  </p>
</HandbookModal>
