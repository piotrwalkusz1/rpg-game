import { TranslatableRichText } from '../../common/model/TranslatableRichText';
import { GameState } from '../../game/model/GameState';
import { ActionContextDescription } from '../model/ActionConctextDescription';
import { ActionContext } from '../model/ActionContext';
import { ActionTrigger } from '../model/ActionTrigger';
import { ActionContextProvider, ActionContextProviderWithData } from './action-context-providers/ActionContextProvider';
import { MapBuildingActionContextProvider } from './action-context-providers/MapBuildingActionContextProvider';
import { MapFieldActionContextProvider } from './action-context-providers/MapFieldActionContextProvider';

const actionContextProviders: Array<ActionContextProvider<any>> = [
  new MapFieldActionContextProvider(),
  new MapBuildingActionContextProvider()
];

export const getActionContextByActionTrigger = (actionTrigger: ActionTrigger, gameState: GameState): ActionContext => {
  const actionContextProvidersWithData: Array<ActionContextProviderWithData<any>> = actionContextProviders.flatMap(
    (actionContextProvider) => {
      const actionContextProviderWithData =
        actionContextProvider.getActionContextProviderWithDataFromActionTriggerIfSupported(actionTrigger);
      return actionContextProviderWithData ? [actionContextProviderWithData] : [];
    }
  );
  const title = actionContextProvidersWithData
    .map((actionContextProviderWithData) => actionContextProviderWithData.getTitle())
    .sort((a, b) => a.order - b.order)[0].title;
  const descriptions = actionContextProvidersWithData
    .map((actionContextProviderWithData) => actionContextProviderWithData.getDescription())
    .sort((a, b) => a.order - b.order)
    .map((actionContextDecriptionWithData) => actionContextDecriptionWithData.description);
  const description = TranslatableRichText.fromArray(descriptions);
  const actions = actionContextProvidersWithData.flatMap((actionContextProviderWithData) =>
    actionContextProviderWithData.getActions(gameState)
  );

  return new ActionContext(title, new ActionContextDescription(description), false, actions);
};
