import type { GameStore } from 'frontend/store/game-store';
import type { Type } from 'utils';
import { CharacterNarrationContext } from '../narration-contexts';
import { NarrationOptionExecutor } from '../narration-option-executor';
import { CharacterNarrationOption } from '../narration-options';

export class CharacterNarrationOptionExecutor extends NarrationOptionExecutor<CharacterNarrationOption> {
  override get narrationOptionType(): Type<CharacterNarrationOption> {
    return CharacterNarrationOption;
  }

  override async execute(narrationOption: CharacterNarrationOption, store: GameStore): Promise<void> {
    store.props.narrationContext.set(new CharacterNarrationContext(narrationOption.character));
  }
}
