<script lang="ts">
  import { page } from '$app/stores';
  import ComparisonSlider from '$components/blocks/project-blocks/comparison-slider.svelte';
  import Testimonial from '$components/blocks/project-blocks/testimonial.svelte';
  import VideoSection from '$components/blocks/project-blocks/video-section.svelte';
  import ImageSection from '$components/blocks/project-blocks/image-section.svelte';
  import TeamSection from '$components/blocks/project-blocks/team-section.svelte';
  import MetricsSection from '$components/blocks/project-blocks/metrics-section.svelte';
  import ContactCtaSection from '$components/blocks/project-blocks/contact-cta-section.svelte';

  const projects: Record<string, any> = {
    'coffee-king': {
      id: 1,
      slug: 'coffee-king',
      name: 'Coffee King.',
      tagline: 'A unified e-commerce platform selling to consumers and businesses alike.',
      coverImage: 'https://a.storyblok.com/f/198185/3200x1800/409dac6deb/new-cover-coffee-king-website.png/m/1440x0/',
      publishedYear: 2023,
      services: [
        'Front-end Development',
        'Interaction Design',
        'Interface Design',
        'Project Management',
        'Strategy',
        'User Experience Design',
        'User Interface Design'
      ],
      deliverables: ['Website', 'E-commerce'],
      links: [
        { label: 'Website', url: 'https://www.coffeekingdirect.eu/' }
      ],
      team: [
        { name: 'Rishab', image: 'https://a.storyblok.com/f/198185/200x200/placeholder.jpeg/m/100x100/', href: '/about/rishab' },
        { name: 'Helder', image: 'https://a.storyblok.com/f/198185/2826x2827/2cf44cf03a/helder.jpg/m/100x100/', href: '/about/helder' },
        { name: 'Inês Gomes', image: 'https://a.storyblok.com/f/198185/2705x2705/5b975c15da/ines_gomes.jpg/m/100x100/', href: '/about/ines-gomes' },
        { name: 'Manuel Melo', image: 'https://a.storyblok.com/f/198185/2705x2705/1e0b8666aa/manuel_1.jpg/m/100x100/', href: '/about/manuel-melo' }
      ],
      metrics: [
        { label: 'CVR', value: '29%', tooltip: 'Conversion Rate', isPositive: true },
        { label: 'AOV', value: '38%', tooltip: 'Average Order Value', isPositive: true }
      ],
      intro: 'Coffee King is a coffee retailer with a growing product range and ambitions to match. They came to us with a fragmented Shopify setup and no clear separation between their consumer and wholesale audiences. We built them a single, cohesive platform that serves both and scales across the UK and Europe.'
    }
  };

  $: project = projects[$page.params.slug];
</script>

<svelte:head>
  {#if project}
    <title>{project.name} - Techyor</title>
    <meta name="description" content={project.tagline} />
  {:else}
    <title>Project Not Found - Techyor</title>
  {/if}
</svelte:head>

{#if project}
  <main>
    <!-- Cover Image -->
    <section class="relative overflow-hidden">
      <div class="container mx-auto px-container">
        <img
          src={project.coverImage}
          alt={project.name}
          class="h-auto w-full rounded-md bg-background-offset"
          width="3200"
          height="1800"
        />
      </div>
    </section>

    <div class="container mx-auto px-container">
      <!-- Header -->
      <header>
        <div class="mx-auto mt-8 max-w-2xl border-b pb-12 md:mt-14 lg:mt-20">
          <h1 class="text-5xl text-foreground-secondary">{project.name}</h1>
          <h2 class="text-5xl">{project.tagline}</h2>
          <p class="mt-4 text-base font-medium text-foreground-secondary">Published in {project.publishedYear}</p>
        </div>
      </header>

      <!-- Project Metadata -->
      <div class="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-6 border-b pb-6 xs:grid-cols-2 md:grid-cols-3">
        <!-- Services -->
        {#if project.services.length}
          <ul class="col-span-1">
            <h4 class="mb-2 text-xs uppercase tracking-wider text-foreground-secondary">Services</h4>
            {#each project.services as service}
              <li>
                <p class="mb-2 text-base">{service}</p>
              </li>
            {/each}
          </ul>
        {/if}

        <!-- Deliverables -->
        {#if project.deliverables.length}
          <ul class="col-span-1">
            <h4 class="mb-2 text-xs uppercase tracking-wider text-foreground-secondary">Deliverables</h4>
            {#each project.deliverables as deliverable}
              <li>
                <p class="mb-2 text-base">{deliverable}</p>
              </li>
            {/each}
          </ul>
        {/if}

        <!-- Links -->
        {#if project.links.length}
          <ul class="col-span-1">
            <h4 class="mb-2 text-xs uppercase tracking-wider text-foreground-secondary">Links</h4>
            {#each project.links as link}
              <li class="mb-2 flex items-center gap-1">
                <a href={link.url} target="_blank" rel="noopener noreferrer" class="underline hover:no-underline">
                  {link.label}
                </a>
                <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="m4 12 7-7M5 5h6v6" stroke="currentColor" stroke-width="1.2"></path>
                </svg>
              </li>
            {/each}
          </ul>
        {/if}
      </div>

      <!-- Team Section -->
      <TeamSection team={project.team} />

      <!-- Metrics Section -->
      <MetricsSection metrics={project.metrics} />

      <!-- Intro -->
      <p class="mx-auto my-10 max-w-2xl text-3xl font-medium md:my-14 lg:my-20">
        {project.intro}
      </p>

      <!-- Rich Content Sections -->
      <div class="group rich-text @container my-20">
        <!-- The starting point -->
        <ImageSection
          src="https://a.storyblok.com/f/198185/3200x2400/18f2f547b2/ck_1.webp/m/0x0/"
          alt="Coffee King old vs new"
          width="3200"
          height="2400"
        />

        <h2 class="mx-auto max-w-2xl"><b>The starting point.</b></h2>
        <p class="mx-auto max-w-2xl">
          Coffee King had outgrown their setup. Multiple stores spread across different markets, a wide catalogue with unclear navigation, and a platform where business buyers and consumers shared the same undifferentiated experience. They wanted to consolidate, differentiate their two audiences, and elevate how the brand showed up digitally.
        </p>

        <!-- Before/After Comparison -->
        <ComparisonSlider
          beforeImage="https://a.storyblok.com/f/198185/1440x833/35eab37fbf/old-coffee-king.png/m/0x0/"
          afterImage="https://a.storyblok.com/f/198185/1440x833/003d750bf6/new-coffee-king.png/m/0x0/"
          beforeLabel="Old"
          afterLabel="New"
        />

        <!-- Testimonial -->
        <Testimonial
          quote="We weren't building for where the business is today, we were building for where it's heading. Not every agency is comfortable with that kind of ambiguity. Significa was."
          author="Frantisek Svoboda"
          title="Head of E-commerce at Coffee King"
          image="https://a.storyblok.com/f/198185/200x200/d32761bf8e/fran_coffee_king.jpeg/m/100x100/"
        />

        <!-- Elevating Coffee King -->
        <h2 class="mx-auto max-w-2xl"><b>Elevating Coffee King.</b></h2>
        <p class="mx-auto max-w-2xl">
          The brief came with a constraint: the existing identity couldn't change. So rather than starting from scratch, we worked with what was there, the crown, the warm browns and oranges, the spirit of the brand, and built a visual system around it. We introduced a complementary colour palette, refined the typography, and created a set of custom icons and illustrations that gave Coffee King a personality it could carry across every page. The result feels warmer, more confident, and unmistakably theirs.
        </p>

        <p class="mx-auto max-w-2xl">
          Two months after launch, conversion rate was up 29% and average order value had increased 38%, with several features still waiting to go live.
        </p>

        <!-- Video -->
        <VideoSection src="https://a.storyblok.com/f/198185/x/ea263fdb7b/ck_2.mp4" />

        <!-- Two audiences -->
        <h2 class="mx-auto max-w-2xl"><b>Two audiences, one system.</b></h2>
        <p class="mx-auto max-w-2xl">
          To differentiate B2B from B2C within the same platform, we used colour as a quiet signal. The consumer store lives in Coffee King's warm browns and oranges. The wholesale experience shifts to purple, enough to feel distinct without breaking the overall coherence. Users moving between the two understand they're in the same world but with a different purpose.
        </p>

        <!-- B2B vs B2C Comparison -->
        <ComparisonSlider
          beforeImage="https://a.storyblok.com/f/198185/1600x1200/5e37334120/b2b-ck.png/m/0x0/"
          afterImage="https://a.storyblok.com/f/198185/1600x1200/106c6d01b4/b2c-ck.png/m/0x0/"
          beforeLabel="B2B"
          afterLabel="B2C"
        />

        <!-- Navigation -->
        <h2 class="mx-auto max-w-2xl">Making a wide catalogue navigable.</h2>
        <p class="mx-auto max-w-2xl">
          Coffee King's product range spans everything from beans to brewing equipment. Before, categories were unclear and products were mixed together with no obvious logic. We restructured the information architecture, simplified the menu, and made sure users could get to what they needed in fewer clicks.
        </p>

        <ImageSection
          src="https://a.storyblok.com/f/198185/3200x2400/5e415e8ae5/ck_3.webp/m/0x0/"
          alt="Product navigation"
          width="3200"
          height="2400"
        />

        <p class="mx-auto max-w-2xl">
          The product detail pages were redesigned to surface all key information above the fold: variants, pricing, reviews, and add-to-cart. For coffee, users can select roast level, brew method, and grind size without opening a single dropdown. Everything is visible and accessible.
        </p>

        <VideoSection src="https://a.storyblok.com/f/198185/x/4295f5e95d/ck_4.mp4" />

        <!-- Add-ons -->
        <h2 class="mx-auto max-w-2xl"><b>Add-ons to increase order value.</b></h2>
        <p class="mx-auto max-w-2xl">
          For higher-value products like espresso machines, we designed an add-on system directly within the product page. Users can extend their warranty or add professional installation before adding to cart, with the total updating in real time. A simple interaction that increases average order value without feeling pushy.
        </p>

        <ImageSection
          src="https://a.storyblok.com/f/198185/3200x2400/eff2712c43/ck_5.webp/m/0x0/"
          alt="Add-ons system"
          width="3200"
          height="2400"
        />

        <!-- Consolidation -->
        <h2 class="mx-auto max-w-2xl"><b>One store replacing too many.</b></h2>
        <p class="mx-auto max-w-2xl">
          Coffee King's previous setup fragmented their data, analytics, and management across multiple Shopify stores. We consolidated everything into a single store using Shopify Markets, with dedicated configurations for the UK and EU including currency conversion, language variants, and the ability to customise content per region.
        </p>

        <VideoSection src="https://a.storyblok.com/f/198185/x/2779359035/ck_6.mp4" />

        <p class="mx-auto max-w-2xl">
          The most technically complex part of the project was making B2B and B2C coexist on one Shopify store without upgrading to Shopify Plus. We integrated SparkLayer to handle the wholesale layer: custom pricing tiers, business-specific accounts, and volume-based logic, all running on top of the standard Shopify setup. It was a configuration that hadn't been attempted before, and it required close work with SparkLayer's own team to solve problems neither side had encountered.
        </p>

        <!-- Second Testimonial -->
        <Testimonial
          quote="Combining B2B and B2C on a single store without Shopify Plus was something no one had tried in this way before. Not because it's too difficult, but because it's a setup most people wouldn't attempt. We made it work."
          author="Rishab"
          title="Developer at Techyor"
          image="https://a.storyblok.com/f/198185/200x200/placeholder.jpeg/m/100x100/"
        />

        <!-- Closing -->
        <h2 class="mx-auto max-w-2xl"><b>Built to be managed independently.</b></h2>
        <p class="mx-auto max-w-2xl">
          From the beginning, Coffee King needed more than a new store. We documented every integration, every configuration, and every third-party app in a comprehensive guide covering everything from menu customisation to market-specific pricing to SparkLayer setup. By the end of the project, Coffee King's team was managing the platform on their own, using our documentation as their day-to-day reference.
        </p>

        <!-- Final Testimonial -->
        <Testimonial
          quote="From the first conversations it was clear this wasn't going to be a transactional relationship. The team listened carefully, asked the right questions, and were direct when something needed reconsidering."
          author="Frantisek Svoboda"
          title="Head of E-commerce at Coffee King"
          image="https://a.storyblok.com/f/198185/200x200/d32761bf8e/fran_coffee_king.jpeg/m/100x100/"
        />
      </div>

      <!-- Contact CTA Section -->
      <ContactCtaSection returnTo={`/projects/${project.slug}`} />
    </div>
  </main>
{:else}
  <main class="container mx-auto px-container py-20">
    <h1 class="text-5xl">Project not found</h1>
    <p class="mt-4 text-xl text-foreground-secondary">
      <a href="/projects" class="underline hover:no-underline">Back to projects</a>
    </p>
  </main>
{/if}
