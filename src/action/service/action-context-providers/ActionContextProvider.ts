import { TranslatableRichText } from '../../../common/model/TranslatableRichText';
import { GameState } from '../../../game/model/GameState';
import { Action } from '../../model/Action';
import { ActionTrigger } from '../../model/ActionTrigger';

export abstract class ActionContextProvider<T extends {}> {
  getActionContextProviderWithDataFromActionTriggerIfSupported(actionTrigger: ActionTrigger): ActionContextProviderWithData<T> | undefined {
    const data = this.getDataFromActionTriggerIfSupported(actionTrigger);
    return data && new ActionContextProviderWithData(this, data);
  }

  abstract getDataFromActionTriggerIfSupported(actionTrigger: ActionTrigger): T | undefined;

  abstract getTitle(data: T): { title: TranslatableRichText; order: number };

  abstract getDescription(data: T, gameState: GameState): Array<{ description: TranslatableRichText; order: number }>;

  abstract getActions(data: T, gameState: GameState): Array<Action>;
}

export class ActionContextProviderWithData<T> {
  constructor(readonly actionContextProvider: ActionContextProvider<T>, readonly data: T) {}

  getTitle(): { title: TranslatableRichText; order: number } {
    return this.actionContextProvider.getTitle(this.data);
  }

  getDescription(gameState: GameState): Array<{ description: TranslatableRichText; order: number }> {
    return this.actionContextProvider.getDescription(this.data, gameState);
  }

  getActions(gameState: GameState): Array<Action> {
    return this.actionContextProvider.getActions(this.data, gameState);
  }
}
