<script lang="ts">
  import type { Actor } from '../../engine/core/actor/model/actor';
  import TranslatableTextView from '../../i18n/translatable-text-view.svelte';

  export let character: Actor;
</script>

<span class="font-bold"><TranslatableTextView text={character.displayName} /></span>
