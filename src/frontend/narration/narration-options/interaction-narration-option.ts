import { addEvent, getPlayerComponent } from 'engine/core/game';
import type { Image } from 'engine/core/resources/image';
import { getTime } from 'engine/core/time/time-utils';
import { Character } from 'engine/modules/character';
import { Interaction, InteractionEvent } from 'engine/modules/interaction';
import type { TranslatableText } from 'i18n/translatable-text';
import { NarrationOption, NarrationOptionParams } from '../narration-option';

export class InteractionNarrationOption extends NarrationOption {
  readonly interaction: Interaction;

  constructor({ name, image, interaction }: { name: TranslatableText; image: Image; interaction: Interaction }) {
    super({ name, image });
    this.interaction = interaction;
  }

  override async onClick({ engine, processEvents }: NarrationOptionParams): Promise<void> {
    const playerCharacter = getPlayerComponent(engine, Character);
    addEvent(engine, new InteractionEvent({ time: getTime(engine), interaction: this.interaction, executor: playerCharacter }));
    await processEvents();
  }
}
