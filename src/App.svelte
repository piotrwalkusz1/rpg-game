<script lang="ts">
  import type { ActionExecutionContext } from './action/model/action-execution-context';
  import CharacterProfileView from './character/component/character-profile-view.svelte';
  import Toolbox from './game/component/toolbox.svelte';
  import * as MockedGame from './game/mock/mocked-game';
  import type { GameState } from './game/model/game-state';
  import { initLocalizationContext } from './i18n/translation-service';
  import LocationNameView from './map/component/location-name-view.svelte';
  import LocationView from './map/component/location-view.svelte';
  import type { MapField } from './map/model/map-field';
  import type { MapLocation } from './map/model/map-location';
  import type { Position } from './map/model/position';
  import NarrationPanelDialog from './narration/component/narration-panel-dialog.svelte';
  import NarrationPanel from './narration/component/narration-panel.svelte';
  import type { Narration } from './narration/model/narration';
  import type { NarrationActionExecutionContext } from './narration/model/narration-action-execution-context';
  import { NarrationService } from './narration/service/narration-service';

  const { i18n } = initLocalizationContext();
  i18n.addResourceBundle('en', 'common', {});
  i18n.addResourceBundle('pl', 'common', {});

  let narration: Narration | undefined = undefined;
  let gameState: GameState = MockedGame.gameState;

  const actionExecutionContext: ActionExecutionContext = {
    changePlayerPosition: (newPosition: Position) => (gameState.player.character.position = newPosition),
    getGameState: () => gameState
  };
  const narrationActionExecutionContext: NarrationActionExecutionContext = {
    changeLocationView: (newLocationView: MapLocation) => (gameState.locationView = newLocationView),
    getNarration: () => narration,
    ...actionExecutionContext
  };

  function onFieldClick(field: MapField) {
    gameState.selectedField = field;
    narration = getNarrationSelectedField();
  }

  function onNarrationChange(newNarration?: Narration) {
    narration = newNarration || getNarrationSelectedField();
  }

  function getNarrationSelectedField(): Narration | undefined {
    return gameState.selectedField && NarrationService.getNarrationForField(gameState.selectedField, gameState);
  }
</script>

<div class="border-2 border-black divide-y-[2px] divide-black h-full flex flex-col">
  <CharacterProfileView character={gameState.player.character} />
  <div class="flex flex-col grow overflow-hidden divide-y-[2px] divide-black">
    <LocationNameView {gameState} />
    <div class="flex grow divide-x-[2px] divide-black overflow-hidden">
      <Toolbox bind:gameState />
      <LocationView {gameState} {onFieldClick} />
      <div class="w-[300px] flex">
        {#if narration && !narration.isActionRequired}
          <NarrationPanel {narration} {onNarrationChange} {narrationActionExecutionContext} />
        {/if}
      </div>
    </div>
  </div>
</div>

{#if narration && narration.isActionRequired}
  <NarrationPanelDialog {narration} {onNarrationChange} {narrationActionExecutionContext} />
{/if}

<style lang="postcss" global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
