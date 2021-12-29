import { TranslatableRichText } from '../../common/model/TranslatableRichText';
import { GameState } from '../../game/model/GameState';
import { ActionContextDescription } from '../model/ActionConctextDescription';
import { ActionContext } from '../model/ActionContext';
import { ActionContextProvider } from '../model/ActionContextProvider';
import { ActionTrigger } from '../model/ActionTrigger';
import { MapBuildingActionContextProvider } from './MapBuildingActionContextProvider';
import { MapFieldActionContextProvider } from './MapFieldActionContextProvider';

const actionContextProviders: Array<ActionContextProvider> = [new MapFieldActionContextProvider(), new MapBuildingActionContextProvider()];

export const getActionContextByActionTrigger = (actionTrigger: ActionTrigger, gameState: GameState): ActionContext => {
  const supportedActionContextProviders = actionContextProviders.filter((actionContextProvider) =>
    actionContextProvider.isActionTriggerSupported(actionTrigger)
  );
  const title = supportedActionContextProviders
    .map((actionContextProvider) => actionContextProvider.getTitle(actionTrigger))
    .sort((a, b) => a.order - b.order)[0].title;
  const descriptions = supportedActionContextProviders
    .map((actionContextProvider) => actionContextProvider.getDescription(actionTrigger))
    .sort((a, b) => a.order - b.order)
    .map((actionContextDecription) => actionContextDecription.description);
  const description = TranslatableRichText.fromArray(descriptions);
  const actions = supportedActionContextProviders.flatMap((actionContextProvider) =>
    actionContextProvider.getActions(actionTrigger, gameState)
  );

  return new ActionContext(title, new ActionContextDescription(description), false, actions);
};
