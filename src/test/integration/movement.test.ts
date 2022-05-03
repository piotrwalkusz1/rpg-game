import { CommandExecutor, CommandService } from 'engine/core/command';
import { EntityProvider } from 'engine/core/ecs';
import { FieldObject, RectFieldPosition } from 'engine/core/field';
import { MovementCommandHintProvider } from 'frontend/command-hint/command-hint-providers/movement-command-hint-provider';
import { GameService } from 'frontend/game/game-service';
import { MockedEngine } from 'test/mock/mock-engine';
import { mockRectField, subFieldAt } from 'test/mock/mock-field';

describe('Movement', () => {
  test.only('Move to adjoin field', async () => {
    const engine = new MockedEngine();
    const world = mockRectField(5, 5);
    const character = engine.addPlayer({ field: subFieldAt(world, 2, 1) });
    const movementCommandHintProvider = new MovementCommandHintProvider();

    const command = movementCommandHintProvider.getCommandsHints({
      engine,
      executor: character.requireComponent(CommandExecutor),
      field: subFieldAt(world, 3, 1)
    })[0].command;
    CommandService.scheduleCommand(command, character.requireComponent(CommandExecutor), engine);
    await GameService.processEvents(engine);

    expect(rectFieldPosition(character).parentField).toBe(world);
    expect(rectFieldPosition(character).x).toEqual(3);
    expect(rectFieldPosition(character).y).toEqual(1);
  });

  const rectFieldPosition = (entityProvider: EntityProvider): RectFieldPosition => {
    const position = EntityProvider.getComponent(entityProvider, FieldObject)?.field?.position;
    if (!(position instanceof RectFieldPosition)) {
      throw new Error('Expected RectFieldPosition');
    }
    return position;
  };
});
