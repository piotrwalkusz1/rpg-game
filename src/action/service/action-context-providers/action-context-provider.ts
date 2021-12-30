import type { GameState } from '../../../game/model/game-state';
import type { TranslatableText } from '../../../i18n/translatable-text';
import type { Action } from '../../model/action';
import type { ActionTrigger } from '../../model/action-trigger';

export abstract class ActionContextProvider<T extends {}> {
  getActionContextProviderWithDataFromActionTriggerIfSupported(actionTrigger: ActionTrigger): ActionContextProviderWithData<T> | undefined {
    const data = this.getDataFromActionTriggerIfSupported(actionTrigger);
    return data && new ActionContextProviderWithData(this, data);
  }

  abstract getDataFromActionTriggerIfSupported(actionTrigger: ActionTrigger): T | undefined;

  abstract getTitle(data: T): { title: TranslatableText; order: number };

  abstract getDescription(data: T, gameState: GameState): Array<{ description: TranslatableText; order: number }>;

  abstract getActions(data: T, gameState: GameState): Array<Action>;
}

export class ActionContextProviderWithData<T> {
  constructor(readonly actionContextProvider: ActionContextProvider<T>, readonly data: T) {}

  getTitle(): { title: TranslatableText; order: number } {
    return this.actionContextProvider.getTitle(this.data);
  }

  getDescription(gameState: GameState): Array<{ description: TranslatableText; order: number }> {
    return this.actionContextProvider.getDescription(this.data, gameState);
  }

  getActions(gameState: GameState): Array<Action> {
    return this.actionContextProvider.getActions(this.data, gameState);
  }
}
