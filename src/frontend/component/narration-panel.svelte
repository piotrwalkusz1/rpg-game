<script lang="ts">
  import { getContext } from 'svelte';
  import { GameContext } from '../../engine/core/game/model/game-context';
  import { GameLoopService } from '../../engine/core/game/service/game-loop-service';
  import type { NarrationAction } from '../../engine/core/narration/model/narration-actions/narration-action';
  import TranslatableTextView from '../../i18n/translatable-text-view.svelte';
  import { gameState } from '../store';

  const gameContext: GameContext = getContext(GameContext.KEY);

  $: narration = $gameState.narration;

  function executeNarrationAction(narrationAction: NarrationAction) {
    GameLoopService.executeNarrationAction(narrationAction, gameContext);
  }
</script>

{#if narration}
  <div class="flex flex-col divide-y-[2px] divide-black w-full">
    {#if narration.title}
      <div class="p-[10px]">
        <TranslatableTextView text={narration.title} />
      </div>
    {/if}
    <div class="overflow-auto">
      <div class="p-[10px] overflow-auto">
        {#if narration.description.character && narration.description.character.avatarUrl}
          <img
            src={narration.description.character.avatarUrl}
            alt="Character avatar"
            width={64}
            height={64}
            class="float-left border-[2px] border-black mr-[10px]"
          />
        {/if}
        <TranslatableTextView text={narration.description.text} />
      </div>
      <div class="p-[10px]">
        {#each narration.actions as action}
          <div on:click={() => executeNarrationAction(action)} class="cursor-pointer text-blue-700 hover:text-blue-400">
            <TranslatableTextView text={action.name} />
          </div>
        {/each}
      </div>
    </div>
  </div>
{/if}
