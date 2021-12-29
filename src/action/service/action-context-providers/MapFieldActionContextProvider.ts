import { TranslatableRichText } from '../../../common/model/TranslatableRichText';
import { GameState } from '../../../game/model/GameState';
import { MapField } from '../../../map/model/MapField';
import { MapFieldType } from '../../../map/model/MapFieldType';
import { Action } from '../../model/Action';
import { ActionTrigger } from '../../model/ActionTrigger';
import { MapFieldActionTrigger } from '../../model/MapFieldActionTrigger';
import { ActionContextProvider } from './ActionContextProvider';

interface Data {
  field: MapField;
}

export class MapFieldActionContextProvider extends ActionContextProvider<Data> {
  override getDataFromActionTriggerIfSupported(actionTrigger: ActionTrigger): Data | undefined {
    const field = actionTrigger instanceof MapFieldActionTrigger && actionTrigger.field;
    return field ? { field: field } : undefined;
  }

  override getTitle({ field }: Data): { title: TranslatableRichText; order: number } {
    return { title: field.fieldType.getName(), order: 200 };
  }

  override getDescription({ field }: Data): Array<{ description: TranslatableRichText; order: number }> {
    return [{ description: field.fieldType.getDescription(), order: 200 }];
  }

  override getActions({ field }: Data, gameState: GameState): Array<Action> {
    if (field.fieldType === MapFieldType.EMPTY || gameState.player.character.field === field) {
      return [];
    }
    return [
      new Action('GO', 100, (actionExecutionContext) => {
        actionExecutionContext.go(field);
      })
    ];
  }

  private getFieldFromActionTriggerOrThrowException(actionTrigger: ActionTrigger): MapField {
    const field = this.tryGetFieldFromActionTrigger(actionTrigger);
    if (!field) {
      throw new Error('ActionTrigger is not supported');
    }
    return field;
  }

  private tryGetFieldFromActionTrigger(actionTrigger: ActionTrigger): MapField | undefined {
    const field = actionTrigger instanceof MapFieldActionTrigger && actionTrigger.field;
    return field ? field : undefined;
  }
}
