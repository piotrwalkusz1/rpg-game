<script lang="ts">
  import type { NarrationOption } from 'frontend/narration';
  import { engine, narrationContext, refreshEngine } from 'frontend/store';
  import TranslatableTextView from 'i18n/translatable-text-view.svelte';

  export let narrationOption: NarrationOption;

  $: largeImage = narrationOption.imageSize === 'LARGE';
</script>

<div
  on:click={() =>
    narrationOption.onClick({
      engine: $engine,
      refreshEngine,
      setNarrationContext: narrationContext.set
    })}
  class="flex items-center bg-[#FAFFC3] border-[2px] border-[#A19B00] p-[3px] cursor-pointer"
>
  <div class="image" class:large-image={largeImage} style="background-image: url({narrationOption.image});" />
  <div class="pl-[10px] font-default"><TranslatableTextView text={narrationOption.name} /></div>
</div>

<style>
  .image {
    background-size: contain;
    width: 32px;
    height: 32px;
  }

  .large-image {
    width: 38px;
    height: 38px;
    margin: -3px;
  }
</style>
