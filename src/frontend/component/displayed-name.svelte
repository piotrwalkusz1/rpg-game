<script lang="ts">
  import type { TranslatableText } from 'i18n/translatable-text';
  import TranslatableTextView from 'i18n/translatable-text-view.svelte';

  export let value: TranslatableText;
</script>

<div class="font-default text-[25px]"><TranslatableTextView text={value} /></div>
