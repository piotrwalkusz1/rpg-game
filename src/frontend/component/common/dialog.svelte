<script lang="ts">
  import BlockedBackground from './blocked-background.svelte';
</script>

<BlockedBackground z={1000} />

<div
  class="flex fixed bg-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] border-[2px] border-black w-[800px] h-[600px] z-[2000]"
>
  <slot />
</div>
