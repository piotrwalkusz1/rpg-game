<script lang="ts">
  import ActionPanel from './action/component/action-panel.svelte';
  import type { ActionContext } from './action/model/action-context';
  import { ActionExecutionContext } from './action/model/action-execution-context';
  import { MapFieldActionTrigger } from './action/model/map-field-action-trigger';
  import { getActionContextByActionTrigger } from './action/service/action-service';
  import CharacterProfileView from './character/component/character-profile-view.svelte';
  import { CharacterPosition } from './character/model/character-position';
  import * as MockedGame from './game/mock/mocked-game';
  import type { GameState } from './game/model/game-state';
  import { initLocalizationContext } from './i18n/translation-service';
  import LocationView from './map/component/location-view.svelte';
  import type { MapField } from './map/model/map-field';

  const { i18n } = initLocalizationContext();
  i18n.addResourceBundle('en', 'common', {
    'MAP.TERRAIN_OBJECT.HOUSE': 'House',
    'MAP.TERRAIN_OBJECT.HOUSE.DESCRIPTION': 'The house seems normal.'
  });
  i18n.addResourceBundle('pl', 'common', {
    'MAP.TERRAIN_OBJECT.HOUSE': 'Dom',
    'MAP.TERRAIN_OBJECT.HOUSE.DESCRIPTION': 'Dom wygląda normalnie.'
  });

  let actionContext: ActionContext | undefined = undefined;
  let gameState: GameState = MockedGame.gameState;

  const actionExecutionContext = new ActionExecutionContext({
    changeActionContext: (newActionContext) => (actionContext = newActionContext),
    go: (field) =>
      (gameState.player.character.position = new CharacterPosition({
        field: field
      })),
    changeCurrentLocationView: (newLocation) => (gameState.currentLocationView = newLocation)
  });

  function displayActionPanelForField(field: MapField) {
    const actionTrigger = new MapFieldActionTrigger(field);
    actionContext = getActionContextByActionTrigger(actionTrigger, gameState);
  }
</script>

<div class="border-2 border-black divide-y-[2px] divide-black h-full flex flex-col">
  <CharacterProfileView character={gameState.player.character} />
  <div class="grow overflow-hidden">
    <LocationView {gameState} onFieldClick={displayActionPanelForField} />
  </div>
</div>

{#if actionContext}
  <ActionPanel {actionContext} {actionExecutionContext} />
{/if}

<style lang="postcss" global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
