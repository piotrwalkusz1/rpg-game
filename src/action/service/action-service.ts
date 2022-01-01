import type { GameState } from '../../game/model/game-state';
import { createTranslatableTextFromArray } from '../../i18n/translatable-text';
import { ActionContextDescription } from '../model/action-conctext-description';
import { ActionContext } from '../model/action-context';
import type { ActionTrigger } from '../model/action-trigger';
import type { ActionContextProvider, ActionContextProviderWithData } from './action-context-providers/action-context-provider';
import { MapFieldActionContextProvider } from './action-context-providers/map-field-action-context-provider';
import { TerrainObjectActionContextProvider } from './action-context-providers/terrain-object-action-context-provider copy';

const actionContextProviders: ActionContextProvider<any>[] = [
  new MapFieldActionContextProvider(),
  new TerrainObjectActionContextProvider()
];

export const getActionContextByActionTrigger = (actionTrigger: ActionTrigger, gameState: GameState): ActionContext => {
  const actionContextProvidersWithData: Array<ActionContextProviderWithData<any>> = actionContextProviders.flatMap(
    (actionContextProvider) => {
      const actionContextProviderWithData =
        actionContextProvider.getActionContextProviderWithDataFromActionTriggerIfSupported(actionTrigger);
      return actionContextProviderWithData ? [actionContextProviderWithData] : [];
    }
  );
  const titles = actionContextProvidersWithData
    .map((actionContextProviderWithData) => actionContextProviderWithData.getTitle())
    .flatMap((title) => (title ? [title] : []))
    .sort((a, b) => a.order - b.order);
  const title = titles.length > 0 ? titles[0].title : '';
  const descriptions = actionContextProvidersWithData
    .flatMap((actionContextProviderWithData) => actionContextProviderWithData.getDescription(gameState))
    .sort((a, b) => a.order - b.order)
    .map((actionContextDecriptionWithData) => actionContextDecriptionWithData.description);
  const description = createTranslatableTextFromArray(descriptions, ' ');
  const actions = actionContextProvidersWithData.flatMap((actionContextProviderWithData) =>
    actionContextProviderWithData.getActions(gameState)
  );

  return new ActionContext({ title: title, description: new ActionContextDescription(description), actions: actions });
};
