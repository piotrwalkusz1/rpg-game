<script lang="ts">
  import { convertTranslatableTextToString, TranslatableText } from './translatable-text';
  import { getLocalization } from './translation-service';

  export let text: TranslatableText;

  const { t } = getLocalization();
</script>

{convertTranslatableTextToString($t, text)}
