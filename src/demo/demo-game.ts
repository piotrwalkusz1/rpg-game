import { ActionExecutor, ActionSystem } from 'engine/core/action';
import { CommandExecutor, CommandSystem } from 'engine/core/command';
import { Engine, Entity } from 'engine/core/ecs';
import { Field, FieldObject, RectFieldPosition } from 'engine/core/field';
import { FieldDefinition } from 'engine/core/field/field-definition';
import { GameEventQueue, Player } from 'engine/core/game';
import { TimeManager, TimeSystem } from 'engine/core/time';
import { Health } from 'engine/modules/health';
import { MovementSystem } from 'engine/modules/movement';

export const initializeDemoGame = (): Engine => {
  const gameManager: Entity = new Entity();
  gameManager.addComponent(new GameEventQueue());
  gameManager.addComponent(new TimeManager(new Date(812, 6, 12, 8)));
  const world: Entity = new Entity();
  world.addComponent(buildRectField(4, 4));
  const player: Entity = new Entity();
  player.addComponent(new Player());
  player.addComponent(new FieldObject({ field: world.requireComponent(Field).getSubFields()[0] }));
  player.addComponent(new ActionExecutor());
  player.addComponent(new CommandExecutor());
  player.addComponent(new Health());
  const engine: Engine = new Engine();
  engine.addEntity(gameManager);
  engine.addEntity(world);
  engine.addEntity(player);
  engine.addSystem(new TimeSystem());
  engine.addSystem(new ActionSystem());
  engine.addSystem(new CommandSystem());
  engine.addSystem(new MovementSystem());

  return engine;
};

const FieldDefinitions = {
  WORLD: new FieldDefinition({ name: { literal: '' } }),
  GRASS: new FieldDefinition({ name: 'FIELD.GRASS.NAME', description: 'FIELD.GRASS.DESCRIPTION', imageUrl: '/images/fields/grass.jpg' })
};

const buildRectField = (width: number, height: number): Field => {
  const field: Field = new Field({ definition: FieldDefinitions.WORLD });
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      new Field({
        definition: FieldDefinitions.GRASS,
        position: new RectFieldPosition(field, x, y)
      });
    }
  }
  return field;
};
