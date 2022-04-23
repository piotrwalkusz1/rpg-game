<script lang="ts">
  import type { Entity } from 'engine/core/ecs';

  export let character: Entity;

  $: avatarUrl = character ? undefined : undefined;
</script>

<div class="w-[64px] h-[64px] relative">
  {#if avatarUrl}
    <img class="w-[64px] h-[64px]" src={avatarUrl} alt="Character avatar" width={64} height={64} />
  {:else}
    <div class="w-[64px] h-[64px]" />
  {/if}
  <slot name="overlay" />
</div>
