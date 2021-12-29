import { Action } from './Action';
import { ActionTrigger } from './ActionTrigger';
import { TranslatableRichText } from '../../common/model/TranslatableRichText';
import { GameState } from '../../game/model/GameState';

export abstract class ActionContextProvider {
  abstract isActionTriggerSupported(actionTrigger: ActionTrigger): boolean;

  abstract getTitle(actionTrigger: ActionTrigger): { title: TranslatableRichText; order: number };

  abstract getDescription(actionTrigger: ActionTrigger): { description: TranslatableRichText; order: number };

  abstract getActions(actionTrigger: ActionTrigger, gameState: GameState): Array<Action>;
}
