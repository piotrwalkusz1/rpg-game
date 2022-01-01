<script lang="ts">
  import ActionPanelDialog from './action/component/action-panel-dialog.svelte';
  import ActionPanel from './action/component/action-panel.svelte';
  import type { ActionContext } from './action/model/action-context';
  import { ActionExecutionContext } from './action/model/action-execution-context';
  import { FieldSelectedActionTrigger } from './action/model/map-field-action-trigger';
  import { getActionContextByActionTrigger } from './action/service/action-service';
  import CharacterProfileView from './character/component/character-profile-view.svelte';
  import Toolbox from './game/component/toolbox.svelte';
  import * as MockedGame from './game/mock/mocked-game';
  import type { GameState } from './game/model/game-state';
  import { initLocalizationContext } from './i18n/translation-service';
  import LocationNameView from './map/component/location-name-view.svelte';
  import LocationView from './map/component/location-view.svelte';
  import type { MapField } from './map/model/map-field';

  const { i18n } = initLocalizationContext();
  i18n.addResourceBundle('en', 'common', {});
  i18n.addResourceBundle('pl', 'common', {});

  let actionContext: ActionContext | undefined = undefined;
  let gameState: GameState = MockedGame.gameState;

  const actionExecutionContext = new ActionExecutionContext({
    go: (newPosition) => (gameState.player.character.position = newPosition),
    changeCurrentLocationView: (newLocation) => {
      gameState.locationView = newLocation;
      gameState.selectedField = undefined;
    }
  });

  function onFieldClick(field: MapField) {
    gameState.selectedField = field;
    actionContext = prepareActionContextForSelectedField();
  }

  function onActionContextChange(newActionContext?: ActionContext) {
    actionContext = newActionContext || prepareActionContextForSelectedField();
  }

  function prepareActionContextForSelectedField(): ActionContext | undefined {
    if (!gameState.selectedField) {
      return;
    }
    const actionTrigger = new FieldSelectedActionTrigger(gameState.selectedField);
    return getActionContextByActionTrigger(actionTrigger, gameState);
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
        {#if actionContext && !actionContext.isActionRequired}
          <ActionPanel {actionContext} {onActionContextChange} {actionExecutionContext} />
        {/if}
      </div>
    </div>
  </div>
</div>

{#if actionContext && actionContext.isActionRequired}
  <ActionPanelDialog {actionContext} {onActionContextChange} {actionExecutionContext} />
{/if}

<style lang="postcss" global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
