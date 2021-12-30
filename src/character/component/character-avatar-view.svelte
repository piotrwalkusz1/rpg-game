<script lang="ts">
  import type { Character } from '../model/character';

  export let character: Character;
</script>

{#if character.avatarUrl}
  <img src={character.avatarUrl} alt="Character avatar" width={64} height={64} />
{:else}
  <div class="w-[64px] h-[64px]" />
{/if}
