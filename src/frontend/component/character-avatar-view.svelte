<script lang="ts">
  import type { Actor } from '../../engine/core/actor/model/actor';

  export let character: Actor;
</script>

<div class="w-[64px] h-[64px] relative">
  {#if character.avatarUrl}
    <img class="w-[64px] h-[64px]" src={character.avatarUrl} alt="Character avatar" width={64} height={64} />
  {:else}
    <div class="w-[64px] h-[64px]" />
  {/if}
  <slot name="overlay" />
</div>
