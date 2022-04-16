<script lang="ts">
  import type { Character } from '../../engine/core/character/model/character';

  export let character: Character;
</script>

<div class="w-[64px] h-[64px] relative">
  {#if character.avatarUrl}
    <img class="w-[64px] h-[64px]" src={character.avatarUrl} alt="Character avatar" width={64} height={64} />
  {:else}
    <div class="w-[64px] h-[64px]" />
  {/if}
  <slot name="overlay" />
</div>
