import { CommandExecutor, CommandService } from 'engine/core/command';
import { getParentField, getX, getY, subFieldAt } from 'engine/core/field';
import { MovementCommandHintProvider } from 'frontend/narration/narration-providers/movement-narration-provider';
import { GameService } from 'frontend/game/game-service';
import { MockedEngine } from 'test/mock/mock-engine';
import { mockRectField } from 'test/mock/mock-field';

describe('Movement', () => {
  test('Move to adjoin field', async () => {
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

    expect(getParentField(character)).toBe(world);
    expect(getX(character)).toEqual(3);
    expect(getY(character)).toEqual(1);
  });

  test('Move to distant field', async () => {
    const engine = new MockedEngine();
    const world = mockRectField(5, 5);
    const character = engine.addPlayer({ field: subFieldAt(world, 2, 1) });
    const movementCommandHintProvider = new MovementCommandHintProvider();

    const command = movementCommandHintProvider.getCommandsHints({
      engine,
      executor: character.requireComponent(CommandExecutor),
      field: subFieldAt(world, 4, 3)
    })[0].command;
    CommandService.scheduleCommand(command, character.requireComponent(CommandExecutor), engine);
    await GameService.processEvents(engine);

    expect(getParentField(character)).toBe(world);
    expect(getX(character)).toEqual(4);
    expect(getY(character)).toEqual(3);
  });
});
