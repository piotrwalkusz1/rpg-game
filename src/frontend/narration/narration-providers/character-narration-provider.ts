import { Character } from 'engine/modules/character';
import { getPlayer } from 'game';
import { FieldNarrationContext } from '../narration-contexts/field-narration-context';
import type { NarrationOption } from '../narration-option';
import { CharacterNarrationOption } from '../narration-options/character-narration-option';
import { NarrationProvider, NarrationProviderParams } from '../narration-provider';

export class CharacterNarrationProvider extends NarrationProvider {
  override getNarrationOptions({ context, engine }: NarrationProviderParams): NarrationOption[] {
    if (!(context instanceof FieldNarrationContext)) {
      return [];
    }
    const playerCharacter = getPlayer(engine).character;
    return context.field
      .getObjectsByComponentType(Character)
      .filter((character) => character !== playerCharacter)
      .map((character) => new CharacterNarrationOption({ character }));
  }
}
