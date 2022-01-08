<script lang="ts">
  import type { ActionExecutionContext } from '../../action/model/action-execution-context';
  import type { Battle } from '../../battle/model/battle';
  import { gameState } from '../../common/store';
  import TranslatableTextView from '../../i18n/translatable-text-view.svelte';
  import type { MapLocation } from '../../map/model/map-location';
  import type { Position } from '../../map/model/position';
  import type { NarrationActionExecutionContext } from '../model/narration-action-execution-context';
  import type { NarrationAction } from '../model/narration-actions/narration-action';
  import { NarrationService } from '../service/narration-service';

  $: narration = $gameState.narration;

  const actionExecutionContext: ActionExecutionContext = {
    changePlayerPosition: (newPosition: Position) => ($gameState.player.character.position = newPosition),
    getGameState: () => $gameState,
    startBattle: (battle: Battle) => ($gameState.battle = battle)
  };
  const narrationActionExecutionContext: NarrationActionExecutionContext = {
    changeLocationView: (newLocationView: MapLocation) => ($gameState.locationView = newLocationView),
    getNarration: () => $gameState.narration,
    ...actionExecutionContext
  };

  function executeNarrationAction(narrationAction: NarrationAction) {
    const newNarration = narrationAction.execute(narrationActionExecutionContext);
    $gameState.narration = newNarration || NarrationService.getNarrationSelectedField($gameState);
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
            <TranslatableTextView text={action.getName()} />
          </div>
        {/each}
      </div>
    </div>
  </div>
{/if}
