import type { EntityProvider } from 'engine/core/ecs';
import type { GameEngine } from 'engine/core/game';
import type { Type } from 'utils';
import type { Interaction } from './interaction';

export abstract class InteractionExecutor<T extends Interaction> {
  abstract get interactionType(): Type<T>;

  abstract execute(executor: EntityProvider, interaction: T, engine: GameEngine): Promise<void>;
}
