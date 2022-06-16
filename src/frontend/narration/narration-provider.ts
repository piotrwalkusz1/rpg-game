import type { GameEngine } from 'engine/core/game';
import type { NarrationContext } from './narration-context';
import type { NarrationOption } from './narration-option';

export type NarrationProviderParams = { context: NarrationContext; engine: GameEngine };

export abstract class NarrationProvider {
  abstract getNarrationOptions(params: NarrationProviderParams): NarrationOption[];
}
