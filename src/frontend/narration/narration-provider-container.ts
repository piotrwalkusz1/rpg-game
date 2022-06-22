import { Component } from 'engine/core/ecs';
import type { NarrationOption } from './narration-option';
import type { NarrationProvider, NarrationProviderParams } from './narration-provider';

export class NarrationProviderContainer extends Component {
  private narrationProviders: NarrationProvider[] = [];

  getNarrationOptions(params: NarrationProviderParams): NarrationOption[] {
    return this.narrationProviders.flatMap((narrationProvider) => narrationProvider.getNarrationOptions(params));
  }

  addNarrationProvider(narrationProvider: NarrationProvider): void {
    this.narrationProviders.push(narrationProvider);
  }
}
