<script lang="ts">
  import { page } from '$app/stores';
  import { projectsData, getProjectBySlug } from '$lib/data/projects';
  import ComparisonSlider from '$components/blocks/project-blocks/comparison-slider.svelte';
  import Testimonial from '$components/blocks/project-blocks/testimonial.svelte';
  import VideoSection from '$components/blocks/project-blocks/video-section.svelte';
  import ImageSection from '$components/blocks/project-blocks/image-section.svelte';
  import TeamSection from '$components/blocks/project-blocks/team-section.svelte';
  import MetricsSection from '$components/blocks/project-blocks/metrics-section.svelte';
  import ContactCtaSection from '$components/blocks/project-blocks/contact-cta-section.svelte';

  const projectsMap: Record<string, any> = {
    'monster-fairings': {
      id: 11,
      slug: 'monster-fairings',
      name: 'Monster Fairings.',
      tagline: 'A comprehensive e-commerce platform for custom motorcycle fairings with advanced AI integration and complex payment structures.',
      coverImage: '/assets/projects/monster-fairings/cover.jpg',
      publishedYear: 2021,
      services: [
        'Web Design',
        'User Experience Design',
        'User Interface Design',
        'Front-end Development',
        'Back-end Development',
        'E-commerce Strategy',
        'Project Management',
        'AI Integration',
        'Payment Systems'
      ],
      deliverables: ['Website', 'E-commerce Platform', 'AI Visualization System', 'Payment Gateway'],
      links: [
        { label: 'Website', url: 'https://monsterfairings.com/' }
      ],
      team: [],
      metrics: [
        { label: 'Products', value: '5000+', tooltip: 'Product Catalog', isPositive: true },
        { label: 'Countries', value: '7+', tooltip: 'Shipping Destinations', isPositive: true }
      ],
      intro: 'Monster Fairings is a premier e-commerce platform specializing in custom motorcycle fairings for riders worldwide. We engineered a sophisticated platform managing 5000+ products with a complex payment structure supporting multiple business models. The system features an advanced filtering architecture, AI-powered fairings visualization kit allowing riders to see products on their bikes, comprehensive email management capabilities, and robust speed and security infrastructure. The platform seamlessly handles inventory management, customization options, international shipping, and delivers a superior shopping experience across multiple markets.'
    }
  };

  $: project = getProjectBySlug($page.params.slug) || projectsMap[$page.params.slug];
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
      {#if project.team.length > 0}
        <TeamSection team={project.team} />
      {/if}

      <!-- Metrics Section -->
      <MetricsSection metrics={project.metrics} />

      <!-- Intro -->
      <p class="mx-auto my-10 max-w-2xl text-3xl font-medium md:my-14 lg:my-20">
        {project.intro}
      </p>

      <!-- Rich Content Sections -->
      <div class="group rich-text @container my-20">
        {#if project.slug === 'monster-fairings'}
          <!-- Monster Fairings Content -->
          <h2 class="mx-auto max-w-2xl"><b>The challenge.</b></h2>
          <p class="mx-auto max-w-2xl">
            Monster Fairings entered the e-commerce space with an ambitious vision: to become the go-to destination for custom motorcycle fairings globally. However, they faced significant challenges. Their initial platform lacked the sophistication needed to handle a rapidly growing catalog, manage complex product customization options, and support international operations across multiple currencies and shipping destinations. The user experience was cumbersome, search functionality was limited, and the platform couldn't scale with their growth.
          </p>

          <!-- Building the Solution -->
          <h2 class="mx-auto max-w-2xl"><b>Building a scalable e-commerce platform.</b></h2>
          <p class="mx-auto max-w-2xl">
            We designed and developed a comprehensive e-commerce platform purpose-built for the motorcycle aftermarket industry. The platform features an intuitive catalog organization system that allows customers to browse fairings by motorcycle brand, model, and year. We implemented advanced filtering capabilities, real-time inventory management, and a sophisticated search engine that understands motorcycle specifications and user intent.
          </p>

          <p class="mx-auto max-w-2xl">
            The product detail pages showcase extensive customization options, allowing riders to preview their bikes with different fairing designs, colors, and finishes. High-quality product imagery, detailed specifications, and user reviews build confidence in the purchasing decision.
          </p>

          <ImageSection
            src="/assets/projects/monster-fairings/product-listings.png"
            alt="Product listing and catalog browsing"
            width="3200"
            height="2400"
          />

          <!-- AI-Powered Customization -->
          <h2 class="mx-auto max-w-2xl"><b>AI-powered customization experience.</b></h2>
          <p class="mx-auto max-w-2xl">
            One of the platform's standout features is the AI-driven customization kit that lets riders visualize fairings on their specific motorcycle models. Customers can select from an extensive color palette and finish options—matte, glossy, metallic, pearl—and see real-time previews of how the fairing will look on their bike. This visualization engine dramatically increases customer confidence and reduces return rates, as riders know exactly what they're purchasing before checkout.
          </p>

          <p class="mx-auto max-w-2xl">
            The AI system understands motorcycle model variations and applies accurate proportions and lighting to every visualization, creating a photorealistic preview that matches the actual product when it arrives.
          </p>

          <ImageSection
            src="/assets/projects/monster-fairings/ai-customization.png"
            alt="AI customization interface with color and finish picker"
            width="3200"
            height="2400"
          />

          <!-- International Commerce -->
          <h2 class="mx-auto max-w-2xl"><b>Global commerce at scale.</b></h2>
          <p class="mx-auto max-w-2xl">
            Monster Fairings operates in multiple countries, requiring a platform that handles currency conversion, localized content, and international shipping seamlessly. We implemented multi-currency support, international payment processing, and region-specific shipping calculators that provide accurate delivery estimates and costs in real time.
          </p>

          <p class="mx-auto max-w-2xl">
            The platform supports content localization, allowing Monster Fairings to tailor product descriptions, categories, and messaging for different markets while maintaining a cohesive global brand identity.
          </p>

          <ImageSection
            src="/assets/projects/monster-fairings/product-detail.png"
            alt="Product detail page with pricing and specifications"
            width="3200"
            height="2400"
          />

          <!-- Customer Experience -->
          <h2 class="mx-auto max-w-2xl"><b>Streamlined customer experience.</b></h2>
          <p class="mx-auto max-w-2xl">
            From discovery to purchase, every touchpoint was designed with the motorcycle enthusiast in mind. The search and filtering system helps users quickly find fairings for their specific bike. Product recommendations suggest complementary items and accessories. The checkout process is optimized for speed and clarity, with transparent pricing, shipping costs, and multiple payment options.
          </p>

          <p class="mx-auto max-w-2xl">
            Customer accounts store order history, saved favorites, and preferences, creating a personalized experience for repeat visitors. Live chat support and detailed FAQs provide immediate assistance, critical for an e-commerce business serving a passionate but demanding customer base.
          </p>

          <!-- Social Proof and Community -->
          <h2 class="mx-auto max-w-2xl"><b>Building community through social proof.</b></h2>
          <p class="mx-auto max-w-2xl">
            The platform prominently features customer photos and reviews from real riders who've purchased Monster Fairings. This user-generated content showcases the products in action, on actual motorcycles from around the world. These authentic testimonials build trust with potential customers and create a sense of community among Monster Fairings enthusiasts.
          </p>

          <p class="mx-auto max-w-2xl">
            The customer showcase section displays high-quality photos submitted by the community, complete with reviews and ratings. This not only provides valuable social proof but also celebrates the riders who trust Monster Fairings with their prized possessions.
          </p>

          <ImageSection
            src="/assets/projects/monster-fairings/customer-testimonials.png"
            alt="Customer reviews and community showcase"
            width="3200"
            height="2400"
          />

          <!-- Ongoing Excellence -->
          <h2 class="mx-auto max-w-2xl"><b>Five years of partnership and growth.</b></h2>
          <p class="mx-auto max-w-2xl">
            Since launch in 2021, Monster Fairings has grown to become a leading player in the global motorcycle fairings market. The relationship didn't end at launch. We've provided ongoing maintenance, feature development, and optimizations as the business evolved. New product categories were added, international markets were entered, and the platform was continuously refined based on customer feedback and performance data.
          </p>

          <p class="mx-auto max-w-2xl">
            The platform now serves thousands of motorcycle enthusiasts across multiple continents, with over 500 SKUs representing fairings for dozens of motorcycle brands and models. The long-term partnership demonstrates the value of building systems designed for growth and maintaining them with care and expertise.
          </p>

          <!-- Testimonial -->
          <Testimonial
            quote="From the initial vision to five years of continuous support, the team understood what we were trying to build and helped us scale without compromising on quality or performance."
            author="Henry"
            title="Owner at Monster Fairings"
            image="/assets/storyblok/placeholder.jpeg"
          />

          <!-- Results -->
          <h2 class="mx-auto max-w-2xl"><b>Results and impact.</b></h2>
          <p class="mx-auto max-w-2xl">
            The platform now manages over 5000 SKUs across its catalog, handles thousands of monthly transactions, and manages dynamic inventory across international warehouses. The AI visualization system has become a key differentiator, reducing product return rates significantly as customers have full confidence in their purchase before checkout. The platform delivers a seamless experience to customers in over seven countries with multi-currency support and localized content.
          </p>

          <p class="mx-auto max-w-2xl">
            Behind the scenes, the architecture supports complex payment structures, advanced filtering and search capabilities, integrated email management systems, and comprehensive speed and security optimizations. The combination of thoughtful design, robust technology, sophisticated AI integration, and dedicated ongoing support has made Monster Fairings the destination for motorcycle enthusiasts worldwide seeking quality fairings and a superior shopping experience.
          </p>

        {/if}
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
