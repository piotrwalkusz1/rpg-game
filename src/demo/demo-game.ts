import { Engine, Entity } from 'engine/core/ecs';
import { GameEventQueue, Player } from 'engine/core/game';
import { TimeManager, TimeSystem } from 'engine/core/time';

export const initializeDemoGame = (): Engine => {
  const gameManager: Entity = new Entity();
  gameManager.addComponent(new GameEventQueue());
  gameManager.addComponent(new TimeManager(new Date()));
  const player: Entity = new Entity();
  player.addComponent(new Player());
  const engine: Engine = new Engine();
  engine.addEntity(gameManager);
  engine.addEntity(player);
  engine.addSystem(new TimeSystem());

  return engine;
};
