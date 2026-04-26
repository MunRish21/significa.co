<script lang="ts">
  export let title = 'What defines us.';
  export let mainText = 'Be who you are, while making the most out of your career.';
  export let description = `If you're looking for a company with a strict hierarchical ladder and where everything is made by the book, you've come to the wrong place. We're not your average, run-of-the-mill corporation. We do have a ladder at the office, but we only use it to change light bulbs and fix things around.`;
</script>

<section class="border-t">
  <div class="container mx-auto flex flex-col justify-between gap-6 px-container py-8 lg:flex-row lg:gap-4 lg:py-12">
    <div class="lg:max-w-xl">
      <h2 class="text-5xl text-foreground-secondary">{title}</h2>
      <p class="text-5xl">{mainText}</p>
    </div>
    <p class="whitespace-pre-line text-2xl text-foreground-secondary lg:max-w-xl">{description}</p>
  </div>
</section>
