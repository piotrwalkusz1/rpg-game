import { ActionExecutor, ActionService } from 'engine/core/action';
import type { Engine } from 'engine/core/ecs';
import { GameEngine, getPlayerEntity } from 'engine/core/game';
import { getCharacterByName } from 'engine/modules/character';
import { SpeakAction } from 'engine/modules/speaking';
import { GameBuilder } from './game-builder';

export const initializeDemoGame = (): Engine => {
  const engine: GameEngine = new GameBuilder()
    .addCharacter({ name: 'Sestia', avatar: '/images/characters/002_Sestia.png', position: [0, 0] })
    .build();

  ActionService.scheduleAction(
    new SpeakAction({ receivers: [getPlayerEntity(engine)], content: 'DIALOGUE.TEXT.10002_THERE_IS_BURIED_TREASURE', quote: true }),
    getCharacterByName(engine, 'Sestia').requireComponent(ActionExecutor),
    engine
  );

  return engine;
};
