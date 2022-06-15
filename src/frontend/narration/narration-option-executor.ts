import type { GameStore } from 'frontend/store/game-store';
import type { Type } from 'utils';
import type { NarrationOption } from './narration-option';

export abstract class NarrationOptionExecutor<T extends NarrationOption> {
  abstract get narrationOptionType(): Type<T>;

  abstract execute(narrationOption: T, store: GameStore): Promise<void>;
}
