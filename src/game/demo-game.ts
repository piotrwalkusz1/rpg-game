import { ActionService } from 'engine/core/action';
import type { Engine } from 'engine/core/ecs';
import type { GameEngine } from 'engine/core/game';
import { Character } from 'engine/modules/character';
import { SpeakAction } from 'engine/modules/speaking';
import { isLiteral } from 'i18n/translatable-text';
import { GameBuilder } from './game-builder';
import { getPlayer } from './player';

export const initializeDemoGame = (): Engine => {
  const engine: GameEngine = new GameBuilder()
    .addCharacter({ name: 'Sestia', avatar: '/images/characters/002_Sestia.png', position: [0, 0] })
    .build();

  ActionService.scheduleAction(
    new SpeakAction({ receivers: [getPlayer(engine)], content: 'DIALOGUE.TEXT.10002_THERE_IS_BURIED_TREASURE', quote: true }),
    engine.getComponents(Character).filter((character) => isLiteral(character.name, 'Sestia'))[0].actionExecutor,
    engine
  );

  return engine;
};
