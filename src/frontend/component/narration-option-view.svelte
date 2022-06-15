<script lang="ts">
  import { NarrationOption, NarrationService } from 'frontend/narration';
  import { cdiContainer, gameStore } from 'frontend/store';
  import TranslatableTextView from 'i18n/translatable-text-view.svelte';

  export let narrationOption: NarrationOption;

  $: largeImage = narrationOption.imageSize === 'LARGE';
</script>

<div
  on:click={() => cdiContainer.get(NarrationService).executeOnNarrationOptionClick(narrationOption, gameStore)}
  class="flex items-center bg-[#FAFFC3] border-[2px] border-[#A19B00] p-[3px] cursor-pointer"
>
  <div class="image" class:large-image={largeImage} style="background-image: url({narrationOption.image});" />
  <div class="pl-[10px] font-default"><TranslatableTextView text={narrationOption.name} /></div>
</div>

<style>
  .image {
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    width: 32px;
    height: 32px;
  }

  .large-image {
    width: 38px;
    height: 38px;
    margin: -3px;
  }
</style>
