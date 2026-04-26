<script lang="ts">
  import DynamicPage from '$components/pages/dynamic-page.svelte';

  export let data;
</script>

{#key data.page.story?.uuid}
  <DynamicPage page={data.page} />
{/key}
