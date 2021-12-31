import type { GameState } from '../../../game/model/game-state';
import type { TranslatableText } from '../../../i18n/translatable-text';
import type { MapField } from '../../../map/model/map-field';
import { Action } from '../../model/action';
import type { ActionTrigger } from '../../model/action-trigger';
import { MapFieldActionTrigger } from '../../model/map-field-action-trigger';
import { ActionContextProvider } from './action-context-provider';

interface Data {
  field: MapField;
}

export class MapFieldActionContextProvider extends ActionContextProvider<Data> {
  override getDataFromActionTriggerIfSupported(actionTrigger: ActionTrigger): Data | undefined {
    const field = actionTrigger instanceof MapFieldActionTrigger && actionTrigger.field;
    return field ? { field: field } : undefined;
  }

  override getTitle({ field }: Data): { title: TranslatableText; order: number } {
    return { title: field.fieldType.getName(), order: 200 };
  }

  override getDescription({ field }: Data): Array<{ description: TranslatableText; order: number }> {
    return [{ description: field.fieldType.getDescription(), order: 200 }];
  }

  override getActions({ field }: Data, gameState: GameState): Array<Action> {
    if (gameState.player.character.field === field) {
      return [];
    }
    return [
      new Action('GO', 100, (actionExecutionContext) => {
        actionExecutionContext.go(field);
      })
    ];
  }
}
