<script lang="ts">
  import CharacterAvatarView from '../../character/component/character-avatar-view.svelte';
  import { gameState } from '../../common/store';

  $: battleQueue = $gameState.battle?.queue;
</script>

{#if battleQueue}
  <div class="flex overflow-auto">
    {#each battleQueue.queue as participant}
      <div class="p-[5px]">
        <div class="border-[2px] border-black">
          <CharacterAvatarView character={participant.character} />
        </div>
      </div>
    {/each}
  </div>
{/if}
