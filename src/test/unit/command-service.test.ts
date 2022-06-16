import type { Action, ActionService } from 'engine/core/action';
import { Command, CommandEndedEvent, CommandExecutor, CommandService } from 'engine/core/command';
import { GameEngine } from 'engine/core/game';
import { IMock, It, Mock, Times } from 'typemoq';

describe('CommandService', () => {
  let actionServiceMock: IMock<ActionService>;
  let commandService: CommandService;
  let engine: GameEngine;
  let commandExecutor: CommandExecutor;
  let commandMock: IMock<Command>;
  let command: Command;
  let actionMock: IMock<Action>;
  let action: Action;

  beforeEach(() => {
    actionServiceMock = Mock.ofType<ActionService>();
    commandService = new CommandService(actionServiceMock.object);
    engine = new GameEngine();
    commandExecutor = CommandExecutor.create(engine);
    commandMock = Mock.ofType<Command>();
    command = commandMock.object;
    actionMock = Mock.ofType<Action>();
    action = actionMock.object;
  });

  describe('continueCommand', () => {
    it('should set pendingCommand to undefined and add event if no next action', () => {
      commandMock.setup((instance) => instance.getNextAction(It.isAny())).verifiable(Times.once());
      commandExecutor.pendingCommand = command;

      const result = commandService.continueCommand(commandExecutor, engine);

      expect(result).toBe(false);
      expect(commandExecutor.pendingCommand).toBeUndefined();
      expect(engine.events).toEqual([new CommandEndedEvent({ time: engine.time, command, executor: commandExecutor })]);
      commandMock.verifyAll();
    });

    it('should set pendingCommand to undefined and add event if action not started', () => {
      commandMock
        .setup((instance) => instance.getNextAction(It.isAny()))
        .returns(() => action)
        .verifiable(Times.once());
      actionServiceMock
        .setup((instance) => instance.startAction(action, It.isAny(), It.isAny()))
        .returns(() => false)
        .verifiable(Times.once());
      commandExecutor.pendingCommand = command;

      const result = commandService.continueCommand(commandExecutor, engine);

      expect(result).toBe(false);
      expect(commandExecutor.pendingCommand).toBeUndefined();
      expect(engine.events).toEqual([new CommandEndedEvent({ time: engine.time, command, executor: commandExecutor })]);
      commandMock.verifyAll();
      actionServiceMock.verifyAll();
    });

    it('should not set pendingCommand to undefined and add event if action started', () => {
      commandMock
        .setup((instance) => instance.getNextAction(It.isAny()))
        .returns(() => action)
        .verifiable(Times.once());
      actionServiceMock
        .setup((instance) => instance.startAction(action, It.isAny(), It.isAny()))
        .returns(() => true)
        .verifiable(Times.once());
      commandExecutor.pendingCommand = command;

      const result = commandService.continueCommand(commandExecutor, engine);

      expect(result).toBe(true);
      expect(commandExecutor.pendingCommand).toBe(command);
      expect(engine.events).toEqual([]);
      commandMock.verifyAll();
      actionServiceMock.verifyAll();
    });

    it('should do nothing if no pending command', () => {
      actionServiceMock.setup((instance) => instance.startAction(It.isAny(), It.isAny(), It.isAny())).verifiable(Times.never());

      const result = commandService.continueCommand(commandExecutor, engine);

      expect(result).toBe(false);
      expect(commandExecutor.pendingCommand).toBeUndefined();
      expect(engine.events).toEqual([]);
      actionServiceMock.verifyAll();
    });
  });
});
