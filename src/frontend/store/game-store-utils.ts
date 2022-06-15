import type { GameStore } from './game-store';

export const refreshEngine = (store: GameStore): void => store.engine.update((engine) => engine);
