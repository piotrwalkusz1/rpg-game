import type { Character } from 'engine/modules/character';
import { CharacterNarrationContext } from '../narration-contexts/character-narration-context';
import { NarrationOption, NarrationOptionParams } from '../narration-option';

export class CharacterNarrationOption extends NarrationOption {
  readonly character: Character;

  constructor({ character }: { character: Character }) {
    super({ name: character.name, image: character.avatar, imageSize: 'LARGE' });
    this.character = character;
  }

  override async onClick({ setNarrationContext }: NarrationOptionParams): Promise<void> {
    setNarrationContext(new CharacterNarrationContext(this.character));
  }
}
