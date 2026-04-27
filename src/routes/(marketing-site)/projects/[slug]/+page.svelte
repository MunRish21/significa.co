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

        <!-- Navjot Kaur PLLC Content -->
        {#if project.slug === 'navjot-kaur-pllc'}
          <h2 class="mx-auto max-w-2xl"><b>The challenge.</b></h2>
          <p class="mx-auto max-w-2xl">
            Navjot Kaur, a dual-licensed attorney in New York and India, was launching an independent law practice in one of the most saturated legal markets in the United States. New York City alone is home to tens of thousands of attorneys, and the estate planning and immigration spaces are dominated by long-established firms with decades of name recognition. To stand out, the practice needed more than a generic law-firm website. It needed a complete brand—one that reflected Navjot's distinct value proposition: a culturally aware, multilingual, cross-jurisdictionally licensed attorney serving multicultural families, blended households, and Non-Resident Indian (NRI) clients with clear, compassionate guidance instead of intimidating legalese.
          </p>

          <p class="mx-auto max-w-2xl">
            The existing options on the market either felt cold and corporate or visually outdated, and none communicated the warmth, accessibility, and dual-system expertise that defined her client relationships. The task was to build a brand and digital presence from zero that would establish trust instantly, simplify complex legal services for a non-specialist audience, and rank for highly competitive New York legal search terms.
          </p>

          <h2 class="mx-auto max-w-2xl"><b>Building a complete brand identity from the ground up.</b></h2>
          <p class="mx-auto max-w-2xl">
            We took a fully design-led approach, treating Navjot Kaur PLLC as a brand-building project rather than a website assignment. We started with discovery: positioning, audience archetypes, tone-of-voice exploration, and competitive analysis of leading estate planning and immigration firms across the New York City and South Asian diaspora markets. From there we designed a custom logo, a refined typography system pairing a serif for authority with a clean sans-serif for accessibility, and a calm, trust-forward color palette that intentionally departs from the heavy navy-and-gold conventions of traditional law firm branding.
          </p>

          <p class="mx-auto max-w-2xl">
            The voice of the brand was equally deliberate. Every line of copy was written to translate technical legal concepts—revocable trusts, special needs planning, humanitarian visas, cross-border inheritance—into language that an immigrant parent, a young professional starting a family, or a survivor seeking protection could read in under a minute and understand. The result is a brand system that feels modern, multicultural, and genuinely human while still signalling the professional credibility expected of a New York attorney.
          </p>

          <h2 class="mx-auto max-w-2xl"><b>Architecting six specialized practice areas with clarity.</b></h2>
          <p class="mx-auto max-w-2xl">
            One of the largest information design challenges was the breadth of services offered. Navjot Kaur PLLC covers six distinct, technically complex practice areas, each with its own audience and search intent. We built a dedicated Practice Areas page anchored by a marble-column hero ("WHAT WE ARE EXPERT AT / Legal Practice Areas") and a clean three-column icon grid that lets visitors find the right service in two clicks or less—whether they arrive looking for a will, a green card, or guardianship for a special needs child.
          </p>

          <p class="mx-auto max-w-2xl">
            Estate Planning helps clients secure their legacy and protect their family's future through personalized plans and legal directives. Wills & Trusts covers revocable and irrevocable trust structures along with tax-efficient strategies for everyday families—not only the ultra-wealthy. Immigration Law guides clients from green cards through naturalization. Guardianship & Special Needs Planning protects minors and individuals with disabilities through legally sound structures. International Estate Planning addresses cross-border inheritance, NRI succession, and dual-jurisdiction asset planning between the U.S. and India. Humanitarian Relief & Survivor Support delivers trauma-informed representation for VAWA self-petitions, Special Immigrant Juvenile Status (SIJS), and T and U visas for survivors of abuse, trafficking, and serious crime. Each practice area is presented in its own dedicated section with plain-language explanations, the categories of clients it serves, and a direct path to consultation booking.
          </p>

          <ImageSection
            src="/assets/projects/navjot-kaur-pllc/practice-areas.png"
            alt="Navjot Kaur PLLC Practice Areas page with marble-column hero, top navigation, and three-column icon grid showing Estate Planning, Immigration Law, and Wills and Trusts"
            width={2880}
            height={1800}
          />

          <h2 class="mx-auto max-w-2xl"><b>Bridging two legal systems and three languages.</b></h2>
          <p class="mx-auto max-w-2xl">
            Navjot's most distinctive credential is her dual licensure in both New York and India—a combination that very few attorneys in the United States hold. We made this the structural backbone of the entire site rather than a footnote on her bio page. The About Us page pairs a warm, professional portrait with a long-form bio that leads with the cross-border story: "licensed to practice law in both New York and India," "experience in both U.S. and Indian legal systems," and a clear statement of why that combination matters for multicultural families navigating immigration, inheritance, and family protection across two jurisdictions.
          </p>

          <p class="mx-auto max-w-2xl">
            We also surfaced multilingual access in English, Hindi, and Punjabi prominently across the homepage, About page, and contact flows, alongside a clear "free initial consultations" promise. For South Asian families navigating sensitive conversations about inheritance, immigration status, or family protection, being able to consult with an attorney in their first language is often the deciding factor in choosing representation. Treating language and dual-system fluency as first-class brand elements—not footnotes—turned credentials into a real competitive advantage.
          </p>

          <ImageSection
            src="/assets/projects/navjot-kaur-pllc/about-attorney.png"
            alt="About Us page featuring a portrait of Navjot Kaur alongside a bio highlighting dual licensing in New York and India, fluency in English, Hindi, and Punjabi, and free initial consultations"
            width={2880}
            height={1398}
          />

          <h2 class="mx-auto max-w-2xl"><b>Reducing the barrier to legal help.</b></h2>
          <p class="mx-auto max-w-2xl">
            Many people who need an estate plan, an immigration filing, or survivor relief never make the call—because legal services feel inaccessible, expensive, or intimidating. We engineered the entire conversion path to lower that barrier. Every page funnels toward a free 30-minute consultation booked directly through an integrated Calendly flow or a simple Get In Touch form ("Law is a complicated matter. It can cause you a big problem if you ignore it. Let us help you!") with only four fields—name, email, subject, message—and a clear orange Submit Now CTA. No phone tag, no gatekeeping, no obligation.
          </p>

          <p class="mx-auto max-w-2xl">
            The site is fully responsive across desktop, tablet, and mobile, with performance-optimized custom HTML and CSS layered on top of a WordPress CMS so that Navjot can update content, blog posts, and practice details without developer involvement. Every contact entry point was tested to ensure that a client landing on a practice area page on their phone is at most one tap away from a real human conversation.
          </p>

          <ImageSection
            src="/assets/projects/navjot-kaur-pllc/contact-form.png"
            alt="Get In Touch contact form with Full Name, Email, Subject, and Message fields and a prominent orange Submit Now button, set against a marble-column background"
            width={2880}
            height={1398}
          />

          <h2 class="mx-auto max-w-2xl"><b>Establishing professional credibility at first glance.</b></h2>
          <p class="mx-auto max-w-2xl">
            For a new independent practice competing with century-old firms, social proof and credentialing are everything. We highlighted Navjot's affiliations with four major bar associations—the NYC Bar Association, the New York State Bar Association, the Sikh National Bar Association, and the South Asian Bar Association—directly on the homepage and attorney bio, signalling both her professional standing and her active engagement in the multicultural legal community she serves. Her dual New York and India licensure, multilingual capabilities, and specialized practice focus are surfaced in the first viewport, so a visitor can validate her expertise within seconds of landing.
          </p>

          <p class="mx-auto max-w-2xl">
            We carried that credibility through to every page closing. The site footer pairs a persistent "Are You Looking For Someone To Help? Let us help you! Call Now: (+1)646-453-4550" CTA banner with a comprehensive footer that lists every practice area, the Midtown Manhattan office address (43 West 43rd Street, Suite 230, New York, NY 10036), all contact channels, and social links—so even a visitor scrolling to the bottom of the page leaves with the firm's full professional footprint visible at a glance.
          </p>

          <ImageSection
            src="/assets/projects/navjot-kaur-pllc/footer-contact.png"
            alt="Site-wide CTA banner and footer listing all practice areas, the Midtown Manhattan office address, phone, email, and social channels"
            width={2880}
            height={1800}
          />

          <h2 class="mx-auto max-w-2xl"><b>Educating clients through thought leadership.</b></h2>
          <p class="mx-auto max-w-2xl">
            The integrated legal blog serves a dual purpose: client education and organic search visibility. Articles cover the questions her ideal clients are actually typing into Google—why trusts make sense for non-wealthy families, why young families should write a will before it feels urgent, and how probate works for blended families in New York. Each post is written in the same plain-language voice as the rest of the site, building topical authority around estate planning, immigration, and NRI legal services while giving Navjot a content asset she can share with prospective clients during consultations.
          </p>

          <h2 class="mx-auto max-w-2xl"><b>Results and impact.</b></h2>
          <p class="mx-auto max-w-2xl">
            The launch established Navjot Kaur PLLC as a modern, client-focused practice in one of the most competitive legal markets in the world. The brand system, content architecture, and SEO foundation have positioned the firm to capture an underserved intersection of estate planning, immigration, and cross-border NRI services that larger generalist firms do not specialize in. Six practice areas are clearly mapped, four bar association affiliations are surfaced for credibility, three languages are supported across client journeys, and a single seamless Calendly flow converts visitors into booked consultations.
          </p>

          <p class="mx-auto max-w-2xl">
            More importantly, the website successfully translates Navjot's real-world value—warmth, cultural fluency, dual-jurisdiction expertise, and a refusal to hide behind legal jargon—into a digital experience that feels exactly like working with her in person. The professional online presence has become the central hub for client inquiries, service discovery, and trust-building, differentiating the practice from traditional law firm websites while remaining unmistakably approachable to the multicultural families and individuals who need her expertise most.
          </p>
        {/if}

        <!-- SimpleTalk AI Content -->
        {#if project.slug === 'simpletalk-ai'}
          <h2 class="mx-auto max-w-2xl"><b>The challenge.</b></h2>
          <p class="mx-auto max-w-2xl">
            Sales teams lose roughly $1,200 every time a call goes unanswered and tens of thousands of dollars a year to slow lead follow-up, yet the off-the-shelf alternatives—generic chatbots, IVR menus, outsourced receptionists—either sound robotic, can't qualify leads, or can't actually close the loop by booking an appointment on the rep's calendar. SimpleTalk needed a true voice AI sales system: human-sounding, available 24/7, capable of handling objections, scaling to thousands of simultaneous conversations, and plugged directly into the CRMs and calendars sales teams already run on. Not another chatbot bolted onto a website—a full replacement for missed calls, slow follow-up, and a $30K-a-year receptionist.
          </p>

          <h2 class="mx-auto max-w-2xl"><b>Engineering the AI voice engine.</b></h2>
          <p class="mx-auto max-w-2xl">
            We built the core voice system on a Python backend, trained on millions of real sales call transcripts so the AI handles qualifying questions, objections, and natural conversational pacing the way a senior closer would. The engine handles both inbound and outbound calling, recovers gracefully from interruptions, switches between 12 languages mid-conversation, and routes hot leads to a live human via round-robin transfer when intent crosses a confidence threshold. Every call is recorded, transcribed, and rolled up into a single command center where operators can see exactly how the platform is performing in real time.
          </p>

          <ImageSection
            src="/assets/projects/simpletalk-ai/overview-dashboard.png"
            alt="SimpleTalk AI overview dashboard with KPI tiles for total calls, minutes used, inbound and outbound volume, and per-minute pricing"
            width={2880}
            height={1398}
          />

          <h2 class="mx-auto max-w-2xl"><b>A multi-agent dashboard for every channel.</b></h2>
          <p class="mx-auto max-w-2xl">
            We designed and built the full React dashboard that lets clients spin up Voice, Text, Email, and Chatbot agents from a single workspace. Agents are organized into folders (Production, Follow-Up, internal test agents) so teams can ship, iterate, and roleplay safely without breaking live traffic. Each agent card surfaces its phone number, type (inbound or outbound), and the most common operator actions—edit, test, training mode, assign number, make a call—so launching a new persona or tuning an existing one takes seconds, not engineering tickets.
          </p>

          <ImageSection
            src="/assets/projects/simpletalk-ai/agent-library.png"
            alt="Saved Agents library showing voice and text agents organized into Production and Follow-Up folders, each with edit, test, training, and call actions"
            width={2880}
            height={1800}
          />

          <h2 class="mx-auto max-w-2xl"><b>Configuring agents without writing code.</b></h2>
          <p class="mx-auto max-w-2xl">
            Each agent type has its own configuration surface designed for non-technical operators. The Text Agent builder lets clients define an initial message, a webhook for downstream automation, an AI Creativity slider for tuning response variability, calendar-booking toggles, advanced behavior options, and a long-form prompt with pre-built templates for common verticals like real estate qualifying. A shared AI Prompt Generator helps users write effective agent instructions in minutes instead of hours, and Training Mode lets them roleplay against the agent before pushing it to production traffic.
          </p>

          <ImageSection
            src="/assets/projects/simpletalk-ai/text-agent-builder.png"
            alt="Text Agent builder showing initial message, webhook URL, AI Creativity slider, calendar booking, advanced options, and a long-form prompt with pre-made templates"
            width={2880}
            height={1800}
          />

          <h2 class="mx-auto max-w-2xl"><b>White-label and multi-tenant architecture.</b></h2>
          <p class="mx-auto max-w-2xl">
            A first-class Sub Clients system lets agencies and resellers run their own branded SimpleTalk instance with isolated phone numbers, agents, billing, and analytics. The architecture supports unlimited tenants beneath a parent client, with per-tenant minute pools, configurable inbound and outbound pricing (currently $0.2/min), and full call recordings and transcripts surfaced at every level of the hierarchy—turning the platform from a single-tenant SaaS into an infrastructure layer that other AI agencies can resell under their own brand.
          </p>

          <h2 class="mx-auto max-w-2xl"><b>CRM, calendar, and telephony integrations.</b></h2>
          <p class="mx-auto max-w-2xl">
            We built native integrations for the CRMs sales teams actually run on—Salesforce, Pipedrive, Zoho, HighLevel, and Close.io—so qualified leads, transcripts, and appointment data sync automatically with no manual export. Calendar booking flows write directly into Google, Outlook, and Apple Calendar without double-booking, and the in-dashboard phone-number provisioning module lets clients buy, port, and assign numbers to specific agents and campaigns without leaving the platform.
          </p>

          <h2 class="mx-auto max-w-2xl"><b>Campaigns, analytics, and live operations.</b></h2>
          <p class="mx-auto max-w-2xl">
            The Campaigns module powers outbound dialing with pacing controls and retry logic, alongside a daily analytics view that tracks spend, minutes used, total calls, answers, no-answers, did-not-connect, transfers, and appointments booked—everything sales ops teams need to evaluate ROI without piping data into a separate BI tool. Operators can switch between Total, Percentage, and Cost views, drill into individual days, and toggle between CRM and Dashboard tabs to compare campaign performance side by side.
          </p>

          <ImageSection
            src="/assets/projects/simpletalk-ai/campaigns-analytics.png"
            alt="Campaigns analytics view with daily breakdown of spend, minutes used, calls, answers, no-answers, transfers, and appointments booked across multiple campaigns"
            width={2880}
            height={1800}
          />

          <p class="mx-auto max-w-2xl">
            For individual call review, the Call Logs &amp; Recordings view exposes every interaction the platform has ever placed: filterable by client ID, contact name, agent, outcome, direction, duration, and campaign, with playback for the audio recording, a one-click transcript, and copy-to-clipboard for the agent ID and the exact prompt that was running when the call happened. That last detail matters—it lets operators tune prompts based on real outcomes instead of guessing.
          </p>

          <ImageSection
            src="/assets/projects/simpletalk-ai/call-logs.png"
            alt="Call Logs and Recordings view with filterable table of inbound and outbound calls, outcome, duration, recording playback, and transcript access for every conversation"
            width={2880}
            height={1800}
          />

          <h2 class="mx-auto max-w-2xl"><b>Pulse Demo: experience the AI before signing up.</b></h2>
          <p class="mx-auto max-w-2xl">
            The biggest objection to AI voice is "it can't possibly sound human." We solved that with Pulse Demo—a built-in, customer-facing experience prospects can launch directly from the platform. They pick a voice (Zuri or Chris), choose a language from a list of 12 including English, Spanish, and French, and start a real, live conversation with the AI in seconds. Pulse Demo became the single most effective conversion tool in the funnel: instead of explaining what the platform does, prospects experience it firsthand.
          </p>

          <ImageSection
            src="/assets/projects/simpletalk-ai/pulse-demo.png"
            alt="Pulse Demo customer-facing experience with voice picker, language selector, and Start Conversation button to talk live with the AI"
            width={2880}
            height={1800}
          />

          <h2 class="mx-auto max-w-2xl"><b>Built for scale across industries.</b></h2>
          <p class="mx-auto max-w-2xl">
            The platform is tuned for vertical-specific use cases—Real Estate, Solar, Health Insurance, Tech Support, Credit Repair, and AI agencies—with industry-tailored audio demos and prompt templates clients can spin up before launching their first agent. Under the hood, the system scales to up to 1,800 simultaneous conversations, handling spikes in inbound volume and concurrent outbound campaigns without degradation, and supports 12 languages for businesses serving multilingual markets.
          </p>

          <h2 class="mx-auto max-w-2xl"><b>Results and impact.</b></h2>
          <p class="mx-auto max-w-2xl">
            Since launch, the platform has handled over 147,000 total calls and 127,000 minutes of live conversation, split across 133K+ outbound and 13K+ inbound calls, with hundreds of thousands of minutes still active in client minute pools. The combination of a human-sounding voice engine, four agent channels, a no-code agent builder, white-label tenancy, deep CRM and calendar integration, full call analytics, and a Pulse Demo that converts skeptics into paying customers has positioned SimpleTalk AI as a complete sales-system replacement—not a chatbot—for businesses tired of losing $1,200 every time a call goes unanswered and $90,000 a year to slow follow-up.
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
