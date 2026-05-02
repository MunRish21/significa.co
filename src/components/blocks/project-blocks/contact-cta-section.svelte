<script lang="ts">
  export let returnTo: string = '/';
</script>

<div class="mb-12 mt-40">
  <section class="container mx-auto @container">
    <div class="grid grid-cols-3 overflow-hidden rounded-lg border">
      <!-- Left Panel -->
      <div class="col-span-1 hidden flex-col bg-background-panel @5xl:flex">
        <div class="p-8">
          <h3 class="text-4xl">How can we help?<br /> Let's work together.</h3>
          <p class="mt-4 text-xl text-foreground-secondary">
            Working together takes some practice to get in sync, but once we find our rhythm, the result can be magical!
          </p>
        </div>
      </div>

      <!-- Right Panel - Form -->
      <div class="col-span-3 bg-background-panel p-4 pt-8 @5xl:col-span-2 @5xl:border-l @5xl:p-8">
        <!-- Option Selection -->
        <div class="mb-8 border-b pb-8 @container">
          <p class="font-medium leading-none">What are you looking for?</p>
          <p class="mt-1 leading-none text-foreground-secondary">Please choose an option below</p>

          <div class="mt-8 flex flex-col @2xl:flex-row @2xl:gap-4">
            <!-- Get a Quote -->
            <label for="quote" class="flex w-full items-center gap-3 p-4 transition-all hover:bg-foreground/2 border first:rounded-t-md last:rounded-b-md [&+&]:border-t-0 @2xl:rounded-md @2xl:border @2xl:border-b-border @2xl:[&+&]:border-t">
              <input
                class="appearance-none outline-none bg-foreground/2 border border-foreground/10 hover:border-border-active hover:ring-2 focus:border-border-active focus:ring-4 focus:ring-outline focus:outline-none peer-focus:border-border-active peer-focus:ring-4 peer-focus:ring-outline peer-focus:outline-none checked:bg-outline disabled:opacity-60 disabled:pointer-events-none transition-all h-4 w-4 rounded-full"
                type="radio"
                value="quote"
                id="quote"
              />
              <div>
                <p class="font-medium leading-none">Get a quote</p>
                <p class="mt-1 leading-none text-foreground-secondary">For new projects</p>
              </div>
            </label>

            <!-- Apply to Position -->
            <label for="career" class="flex w-full items-center gap-3 p-4 transition-all hover:bg-foreground/2 border first:rounded-t-md last:rounded-b-md [&+&]:border-t-0 @2xl:rounded-md @2xl:border @2xl:border-b-border @2xl:[&+&]:border-t">
              <input
                class="appearance-none outline-none bg-foreground/2 border border-foreground/10 hover:border-border-active hover:ring-2 focus:border-border-active focus:ring-4 focus:ring-outline focus:outline-none peer-focus:border-border-active peer-focus:ring-4 peer-focus:ring-outline peer-focus:outline-none checked:bg-outline disabled:opacity-60 disabled:pointer-events-none transition-all h-4 w-4 rounded-full"
                type="radio"
                value="career"
                id="career"
              />
              <div>
                <p class="font-medium leading-none">Apply to position</p>
                <p class="mt-1 leading-none text-foreground-secondary">Be part of the team</p>
              </div>
            </label>

            <!-- Talk to us -->
            <label for="contact" class="flex w-full items-center gap-3 p-4 transition-all hover:bg-foreground/2 border first:rounded-t-md last:rounded-b-md [&+&]:border-t-0 @2xl:rounded-md @2xl:border @2xl:border-b-border @2xl:[&+&]:border-t">
              <input
                class="appearance-none outline-none bg-foreground/2 border border-foreground/10 hover:border-border-active hover:ring-2 focus:border-border-active focus:ring-4 focus:ring-outline focus:outline-none peer-focus:border-border-active peer-focus:ring-4 peer-focus:ring-outline peer-focus:outline-none checked:bg-outline disabled:opacity-60 disabled:pointer-events-none transition-all h-4 w-4 rounded-full"
                type="radio"
                value="contact"
                id="contact"
              />
              <div>
                <p class="font-medium leading-none">Talk to us</p>
                <p class="mt-1 leading-none text-foreground-secondary">General enquiries</p>
              </div>
            </label>
          </div>
        </div>

        <!-- Contact Form -->
        <form id="contact-form" method="POST" action="/form/quote">
          <input type="hidden" name="return-to" value={returnTo} />

          <div class="flex flex-col gap-4">
            <!-- Name & Email -->
            <div class="flex w-full flex-col gap-4 md:flex-row">
              <div class="relative w-full">
                <input
                  id="name-input"
                  class="appearance-none outline-none bg-foreground/2 border border-foreground/10 hover:border-border-active hover:ring-2 focus:border-border-active focus:ring-4 focus:ring-outline focus:outline-none peer-focus:border-border-active peer-focus:ring-4 peer-focus:ring-outline peer-focus:outline-none checked:bg-outline disabled:opacity-60 disabled:pointer-events-none transition-all w-full placeholder:text-base placeholder:antialiased text-foreground leading-snug py-4 rounded-lg px-5 peer placeholder:text-transparent [&:not(:placeholder-shown)]:pb-2 [&:not(:placeholder-shown)]:pt-6"
                  placeholder="Name"
                  required
                  name="name"
                />
                <label for="name-input" class="absolute pointer-events-none transition-all ease-motion left-5 text-foreground-secondary top-2.5 text-xs peer-placeholder-shown:top-4 peer-placeholder-shown:text-base">
                  Name
                </label>
              </div>

              <div class="relative w-full">
                <input
                  id="email-input"
                  class="appearance-none outline-none bg-foreground/2 border border-foreground/10 hover:border-border-active hover:ring-2 focus:border-border-active focus:ring-4 focus:ring-outline focus:outline-none peer-focus:border-border-active peer-focus:ring-4 peer-focus:ring-outline peer-focus:outline-none checked:bg-outline disabled:opacity-60 disabled:pointer-events-none transition-all w-full placeholder:text-base placeholder:antialiased text-foreground leading-snug py-4 rounded-lg px-5 peer placeholder:text-transparent [&:not(:placeholder-shown)]:pb-2 [&:not(:placeholder-shown)]:pt-6"
                  placeholder="Email address"
                  required
                  name="email"
                  type="email"
                />
                <label for="email-input" class="absolute pointer-events-none transition-all ease-motion left-5 text-foreground-secondary top-2.5 text-xs peer-placeholder-shown:top-4 peer-placeholder-shown:text-base">
                  Email address
                </label>
              </div>
            </div>

            <!-- Message -->
            <div>
              <div class="relative flex w-full">
                <textarea
                  id="message-input"
                  class="appearance-none outline-none bg-foreground/2 border border-foreground/10 hover:border-border-active hover:ring-2 focus:border-border-active focus:ring-4 focus:ring-outline focus:outline-none peer-focus:border-border-active peer-focus:ring-4 peer-focus:ring-outline peer-focus:outline-none checked:bg-outline disabled:opacity-60 disabled:pointer-events-none transition-all w-full placeholder:text-base placeholder:antialiased text-foreground leading-snug py-4 rounded-lg px-5 peer resize-none placeholder:text-transparent [&:not(:placeholder-shown)]:pb-2 [&:not(:placeholder-shown)]:pt-6"
                  placeholder="Message"
                  required
                  name="message"
                  rows="5"
                  maxlength="2000"
                ></textarea>
                <label for="message-input" class="absolute pointer-events-none transition-all ease-motion left-5 text-foreground-secondary top-2.5 text-xs peer-placeholder-shown:top-4 peer-placeholder-shown:text-base">
                  Message
                </label>
              </div>
              <p class="mt-2 text-right text-sm text-foreground-secondary">0/2000</p>
            </div>

          </div>

          <!-- Submit Section -->
          <div class="mt-8 flex flex-col justify-between gap-6 pb-1 sm:flex-row-reverse sm:items-center">
            <button
              class="group relative inline-flex items-center justify-center gap-1.5 overflow-hidden whitespace-nowrap text-md font-medium leading-none outline-none transition-all hover:ring-4 focus-visible:ring-4 active:scale-[0.98] active:ring-2 disabled:pointer-events-none disabled:opacity-60 bg-foreground text-background h-14 rounded-lg px-6"
              type="submit"
            >
              <span>Send message</span>
              <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 8.5h9M8.5 4.5l3.5 4-3.5 4" stroke="currentColor" stroke-width="1.2"></path>
                <path d="m2.8 8.1 1.9.1 2 .2h5.2M12 8.4c0-.6-.6-.9-1-1.2l-.6-.3-.3-.3-.4-.2-.6-.6-.4-.6-.3-.8M12 8.4c0 .7-.6 1.2-1 1.7l-1.2 1.4-.9.6-.5.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"></path>
              </svg>
            </button>

            <div class="text-sm">
              <p class="leading-none text-foreground-secondary">Hate contact forms?</p>
              <a class="underline hover:no-underline mt-0.5 inline-flex" href="mailto:info@techyor.com">
                info@techyor.com
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</div>
