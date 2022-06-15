import type { CDIContainer } from 'cdi-container';
import type { GameEngine } from 'engine/core/game';
import { GameBuilder } from './game-builder';

export const initializeDemoGame = (container: CDIContainer): GameEngine => {
  const engine: GameEngine = container
    .get(GameBuilder)
    .addCharacter({ name: 'Sestia', avatar: '/images/characters/002_Sestia.png', position: [0, 0] })
    .build();

  return engine;
};
