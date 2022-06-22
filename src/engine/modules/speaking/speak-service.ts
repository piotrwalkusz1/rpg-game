import type { EntityProvider } from 'engine/core/ecs';
import type { GameEngine } from 'engine/core/game';
import type { TranslatableText } from 'i18n/translatable-text';
import type { InteractionService } from '../interaction';
import { SpeakInteraction } from './speak-interaction';

export class SpeakService {
  constructor(private interactionService: InteractionService) {}

  async speak(
    speaker: EntityProvider,
    receivers: EntityProvider[],
    content: TranslatableText,
    quote: boolean,
    engine: GameEngine
  ): Promise<void> {
    await this.interactionService.executeInteraction(speaker, new SpeakInteraction({ receivers, content, quote }), engine);
  }
}
