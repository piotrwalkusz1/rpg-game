import { Engine, Entity } from 'engine/core/ecs';
import { Field, FieldObject, RectFieldPosition } from 'engine/core/field';
import { GameEventQueue, Player } from 'engine/core/game';
import { TimeManager, TimeSystem } from 'engine/core/time';

export const initializeDemoGame = (): Engine => {
  const gameManager: Entity = new Entity();
  gameManager.addComponent(new GameEventQueue());
  gameManager.addComponent(new TimeManager(new Date()));
  const world: Entity = new Entity();
  world.addComponent(buildRectField(2, 2));
  const player: Entity = new Entity();
  player.addComponent(new Player());
  player.addComponent(new FieldObject({ field: world.requireComponent(Field).getSubFields()[0] }));
  const engine: Engine = new Engine();
  engine.addEntity(gameManager);
  engine.addEntity(world);
  engine.addEntity(player);
  engine.addSystem(new TimeSystem());

  return engine;
};

const buildRectField = (width: number, height: number): Field => {
  const field: Field = new Field();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const childField: Field = new Field();
      childField.position = new RectFieldPosition(field, x, y);
    }
  }

  return field;
};
