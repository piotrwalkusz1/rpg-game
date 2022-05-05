<script lang="ts">
  import type { NarrationOption } from 'frontend/narration';
  import { engine } from 'frontend/store';
  import TranslatableTextView from 'i18n/translatable-text-view.svelte';

  export let narrationOption: NarrationOption;
</script>

<div on:click={() => narrationOption.onClick($engine)} class="flex items-center bg-[#FAFFC3] border-[2px] border-[#A19B00] p-[3px]">
  <div class="w-[32px] h-[32px]" style="background-image: url({narrationOption.image});" />
  <div class="pl-[10px] font-default"><TranslatableTextView text={narrationOption.name} /></div>
</div>
