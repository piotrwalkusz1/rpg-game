import type { GameState } from '../../../game/model/game-state';
import type { TranslatableText } from '../../../i18n/translatable-text';
import type { MapField } from '../../../map/model/map-field';
import { MapFieldKind } from '../../../map/model/map-field-kind';
import { Action } from '../../model/action';
import type { ActionTrigger } from '../../model/action-trigger';
import { MapFieldActionTrigger } from '../../model/map-field-action-trigger';
import { ActionContextProvider } from './action-context-provider';
import { FieldPosition, Position } from '../../../map/model/position';

interface Data {
  field: MapField;
}

export class MapFieldActionContextProvider extends ActionContextProvider<Data> {
  override getDataFromActionTriggerIfSupported(actionTrigger: ActionTrigger): Data | undefined {
    const field = actionTrigger instanceof MapFieldActionTrigger && actionTrigger.field;
    return field ? { field: field } : undefined;
  }

  override getTitle({ field }: Data): { title: TranslatableText; order: number } {
    return { title: field.fieldType.name, order: 200 };
  }

  override getDescription({ field }: Data): Array<{ description: TranslatableText; order: number }> {
    return [{ description: field.fieldType.description, order: 200 }];
  }

  override getActions({ field }: Data, gameState: GameState): Array<Action> {
    return [...this.getSeeLocationActions(field), this.getGoAction(field, gameState)].flatMap((action) => (action ? [action] : []));
  }

  private getSeeLocationActions(field: MapField): Action[] {
    return field.subLocations.getArray().map(
      (subLocation) =>
        new Action({
          id: 'SEE_LOCATION',
          nameTranslationProperties: {
            locationName: subLocation.name
          },
          order: 50,
          executeAction: (actionExecutionContext) => {
            actionExecutionContext.changeCurrentLocationView(subLocation);
            return undefined;
          }
        })
    );
  }

  private getGoAction(field: MapField, gameState: GameState): Action | undefined {
    const newPostion = new FieldPosition(field);
    if (field.kind === MapFieldKind.FIELD && !Position.areEqual(gameState.player.character.position, newPostion)) {
      return new Action({
        id: 'GO',
        order: 100,
        executeAction: (actionExecutionContext) => {
          actionExecutionContext.go(newPostion);
          return undefined;
        }
      });
    }
  }
}
