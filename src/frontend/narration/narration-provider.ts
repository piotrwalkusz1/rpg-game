import type { Engine } from 'engine/core/ecs';
import type { NarrationContext } from './narration-context';
import type { NarrationOption } from './narration-option';

export type NarrationProviderParams = { context: NarrationContext; engine: Engine };

export abstract class NarrationProvider {
  abstract getNarrationOptions(params: NarrationProviderParams): NarrationOption[];
}
