import type { GameState } from '../../../game/model/game-state';
import type { TranslatableText } from '../../../i18n/translatable-text';
import type { MapField } from '../../../map/model/map-field';
import { MapFieldKind } from '../../../map/model/map-field-kind';
import { GoToFieldNarrationAction } from '../../model/narration-actions/go-to-field-narration-action';
import type { NarrationAction } from '../../model/narration-actions/narration-action';
import { SeeLocationNarrationAction } from '../../model/narration-actions/see-location-narration-action';
import { NarrationProvider } from './narration-provider';

interface Data {
  field: MapField;
}

export class FieldNarrationProvider extends NarrationProvider<Data> {
  override getDataIfSupported(field: MapField): Data | undefined {
    return { field };
  }

  override getTitle({ field }: Data): { title: TranslatableText; order: number } {
    return { title: field.fieldType.name, order: 200 };
  }

  override getDescription({ field }: Data): { description: TranslatableText; order: number }[] {
    return [{ description: field.fieldType.description, order: 200 }];
  }

  override getActions({ field }: Data, gameState: GameState): NarrationAction[] {
    return [...this.prepareSeeLocationActions(field), this.prepareGoAction(field, gameState)].flatMap((action) => (action ? [action] : []));
  }

  private prepareSeeLocationActions(field: MapField): NarrationAction[] {
    return field.subLocations.getArray().map((subLocation) => new SeeLocationNarrationAction(subLocation));
  }

  private prepareGoAction(field: MapField, gameState: GameState): NarrationAction | undefined {
    if (field.kind !== MapFieldKind.FIELD || gameState.player.character.isOnField(field)) {
      return;
    }
    return new GoToFieldNarrationAction(field);
  }
}
