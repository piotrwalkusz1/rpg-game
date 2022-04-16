<script lang="ts">
  import type { Character } from '../../engine/core/character/model/character';
  import TranslatableTextView from '../../i18n/translatable-text-view.svelte';

  export let character: Character;
</script>

<span class="font-bold"><TranslatableTextView text={character.displayName} /></span>
