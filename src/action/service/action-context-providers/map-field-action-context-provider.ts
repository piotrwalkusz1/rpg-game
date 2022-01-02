import type { GameState } from '../../../game/model/game-state';
import type { TranslatableText } from '../../../i18n/translatable-text';
import type { MapField } from '../../../map/model/map-field';
import { MapFieldKind } from '../../../map/model/map-field-kind';
import type { ActionTrigger } from '../../model/action-triggers/action-trigger';
import type { Action } from '../../model/actions/action';
import { GoToFieldAction } from '../../model/actions/go-to-field-action';
import { SeeLocationAction } from '../../model/actions/see-location-action';
import { FieldSelectedActionTrigger } from '../../model/action-triggers/field-selected-action-trigger';
import { ActionContextProvider } from './action-context-provider';

interface Data {
  field: MapField;
}

export class MapFieldActionContextProvider extends ActionContextProvider<Data> {
  override getDataFromActionTriggerIfSupported(actionTrigger: ActionTrigger): Data | undefined {
    const field = actionTrigger instanceof FieldSelectedActionTrigger && actionTrigger.field;
    return field ? { field: field } : undefined;
  }

  override getTitle({ field }: Data): { title: TranslatableText; order: number } {
    return { title: field.fieldType.name, order: 200 };
  }

  override getDescription({ field }: Data): Array<{ description: TranslatableText; order: number }> {
    return [{ description: field.fieldType.description, order: 200 }];
  }

  override getActions({ field }: Data, gameState: GameState): Array<Action> {
    return [...this.prepareSeeLocationActions(field), this.prepareGoAction(field, gameState)].flatMap((action) => (action ? [action] : []));
  }

  private prepareSeeLocationActions(field: MapField): Action[] {
    return field.subLocations.getArray().map((subLocation) => new SeeLocationAction(subLocation));
  }

  private prepareGoAction(field: MapField, gameState: GameState): Action | undefined {
    if (field.kind !== MapFieldKind.FIELD || gameState.player.character.isOnField(field)) {
      return;
    }
    return new GoToFieldAction(field);
  }
}
