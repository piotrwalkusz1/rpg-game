import type { GameState } from '../../../game/model/game-state';
import type { MapField } from '../../../map/model/map-field';
import { MapFieldKind } from '../../../map/model/map-field-kind';
import { GoToFieldNarrationAction } from '../../model/narration-actions/go-to-field-narration-action';
import type { TemplateNarrationAction } from '../../model/narration-actions/template-narration-action';
import type { NarrationProvider } from '../../model/narration-provider/narration-provider';
import type { NarrationProviderResult } from '../../model/narration-provider/narration-provider-result';

export namespace FieldNarrationProvider {
  export const create =
    (field: MapField): NarrationProvider =>
    ({ trigger, gameState }): NarrationProviderResult | undefined => {
      if (trigger.type !== 'SELECTED_FIELD' || trigger.field !== field) {
        return;
      }
      return {
        title: { value: field.fieldType.name, order: 200 },
        descriptions: [{ value: field.fieldType.description, order: 200 }],
        actions: prepareGoAction(field, gameState)
      };
    };
}

const prepareGoAction = (field: MapField, gameState: GameState): TemplateNarrationAction[] => {
  if (field.kind !== MapFieldKind.FIELD || gameState.player.character.isOnField(field)) {
    return [];
  }
  return [new GoToFieldNarrationAction(field)];
};
