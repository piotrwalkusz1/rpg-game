<script lang="ts">
  import TranslatableTextView from '../../i18n/translatable-text-view.svelte';
  import type { Character } from '../model/character';

  export let character: Character;
</script>

<span class="font-bold"><TranslatableTextView text={character.displayName} /></span>
