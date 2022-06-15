import type { EntityProvider } from 'engine/core/ecs';
import type { GameEngine } from 'engine/core/game';
import type { TranslatableText } from 'i18n/translatable-text';
import { InteractionEvent } from '../interaction';
import { SpeakInteraction } from './speak-interaction';

export class SpeakService {
  speak(speaker: EntityProvider, receivers: EntityProvider[], content: TranslatableText, quote: boolean, engine: GameEngine): void {
    engine.addEvent(
      new InteractionEvent({ time: engine.time, executor: speaker, interaction: new SpeakInteraction({ receivers, content, quote }) })
    );
  }
}
