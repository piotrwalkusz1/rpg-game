<script lang="ts">
  import type { TranslatableText } from 'i18n/translatable-text';
  import TranslatableTextView from 'i18n/translatable-text-view.svelte';

  export let name: TranslatableText;
  export let imageUrl: string;
</script>

<div on:click class="flex items-center bg-[#FAFFC3] border-[2px] border-[#A19B00] p-[3px]">
  <div class="w-[32px] h-[32px]" style="background-image: url({imageUrl});" />
  <div class="pl-[10px] font-default"><TranslatableTextView text={name} /></div>
</div>
