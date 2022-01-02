import type { GameState } from '../../../game/model/game-state';
import type { TranslatableText } from '../../../i18n/translatable-text';
import type { MapField } from '../../../map/model/map-field';
import type { TemplateNarrationAction } from '../../model/narration-actions/template-narration-action';

export abstract class NarrationProvider<T extends {}> {
  getNarrationProviderWithDataIfSupported(field: MapField): NarrationProviderWithData<T> | undefined {
    const data = this.getDataIfSupported(field);
    return data && new NarrationProviderWithData(this, data);
  }

  abstract getDataIfSupported(field: MapField): T | undefined;

  getTitle(_data: T): { title: TranslatableText; order: number } | undefined {
    return undefined;
  }

  getDescription(_data: T, _gameState: GameState): { description: TranslatableText; order: number }[] {
    return [];
  }

  getActions(_data: T, _gameState: GameState): TemplateNarrationAction[] {
    return [];
  }
}

export class NarrationProviderWithData<T> {
  constructor(readonly narrationProvider: NarrationProvider<T>, readonly data: T) {}

  getTitle(): { title: TranslatableText; order: number } | undefined {
    return this.narrationProvider.getTitle(this.data);
  }

  getDescription(gameState: GameState): { description: TranslatableText; order: number }[] {
    return this.narrationProvider.getDescription(this.data, gameState);
  }

  getActions(gameState: GameState): TemplateNarrationAction[] {
    return this.narrationProvider.getActions(this.data, gameState);
  }
}
