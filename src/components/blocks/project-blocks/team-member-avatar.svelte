<script lang="ts">
  export let name: string;
  export let image: string;
  export let href: string = '#';
</script>

<a {href}>
  <div
    class="bg-foreground/10 bg-cover bg-center bg-no-repeat sm h-12 w-12 rounded-full"
    style="background-image: url('{image}');"
  ></div>
  <span class="sr-only">{name}</span>
</a>
