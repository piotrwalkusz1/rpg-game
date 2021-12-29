import { TranslatableRichText } from '../../common/model/TranslatableRichText';
import { MapField } from '../../map/model/MapField';
import { MapFieldType } from '../../map/model/MapFieldType';
import { Action } from '../model/Action';
import { ActionContextProvider } from '../model/ActionContextProvider';
import { ActionTrigger } from '../model/ActionTrigger';
import { MapFieldActionTrigger } from '../model/MapFieldActionTrigger';
import { GameState } from '../../game/model/GameState';

export class MapFieldActionContextProvider extends ActionContextProvider {
  override isActionTriggerSupported(actionTrigger: ActionTrigger): boolean {
    return !!this.tryGetFieldFromActionTrigger(actionTrigger);
  }

  override getTitle(actionTrigger: ActionTrigger): { title: TranslatableRichText; order: number } {
    const field = this.getFieldFromActionTriggerOrThrowException(actionTrigger);
    return { title: field.fieldType.getName(), order: 200 };
  }

  override getDescription(actionTrigger: ActionTrigger): { description: TranslatableRichText; order: number } {
    const field = this.getFieldFromActionTriggerOrThrowException(actionTrigger);
    return { description: field.fieldType.getDescription(), order: 200 };
  }

  override getActions(actionTrigger: ActionTrigger, gameState: GameState): Array<Action> {
    const field = this.getFieldFromActionTriggerOrThrowException(actionTrigger);
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
