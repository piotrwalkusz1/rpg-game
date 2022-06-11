import { ActionExecutedEvent, ActionScheduledEvent, BeforeActionExecutingEvent, PendingAction } from 'engine/core/action';
import {
  Command,
  CommandEndedEvent,
  CommandExecutor,
  CommandScheduledEvent,
  CommandStartedEvent,
  CommandSystem
} from 'engine/core/command';
import type { GameEngine } from 'engine/core/game';
import { GameBuilder } from 'game';
import { MockAction } from 'test/mock/mock-action';
import { MockCommand } from 'test/mock/mock-command';

describe('Command system', () => {
  let commandSystem: CommandSystem;
  let engine: GameEngine;
  let commandExecutor: CommandExecutor;
  let command: Command;

  beforeEach(() => {
    commandSystem = new CommandSystem();
    engine = new GameBuilder().build();
    commandExecutor = CommandExecutor.create(engine);
    command = mockCommand();
  });

  describe('CommandScheduledEvent', () => {
    it('should create CommandStartedEvent if action scheduled', async () => {
      await commandSystem.processEvent(mockCommandScheduledEvent(), engine);

      expect(engine.events).toEqual([mockActionScheduledEvent(), mockCommandStartedEvent()]);
    });

    it('should not create CommandStartedEvent if another command is already pending', async () => {
      commandExecutor.pendingCommand = command;

      await commandSystem.processEvent(mockCommandScheduledEvent(), engine);

      expect(engine.events).toEqual([]);
    });

    it('should not create CommandStartedEvent if action cannot be scheduled', async () => {
      commandExecutor.pendingAction = mockPendingAction();

      await commandSystem.processEvent(mockCommandScheduledEvent(), engine);

      expect(engine.events).toEqual([]);
    });
  });

  describe('ActionExecutedEvent', () => {
    it('should create CommandEndedEvent and reset pending command if command is pending and next action cannot be scheduled', async () => {
      commandExecutor.pendingCommand = command;
      commandExecutor.pendingAction = mockPendingAction();

      await commandSystem.processEvent(mockActionExecutedEvent(), engine);

      expect(engine.events).toEqual([mockCommandEndedEvent()]);
      expect(commandExecutor.pendingCommand).toBeUndefined();
    });

    it('should do nothing if command is not pending', async () => {
      await commandSystem.processEvent(mockActionExecutedEvent(), engine);

      expect(engine.events).toEqual([]);
    });

    it('should do nothing if next action scheduled', async () => {
      commandExecutor.pendingCommand = command;

      await commandSystem.processEvent(mockActionExecutedEvent(), engine);

      expect(engine.events).toEqual([mockActionScheduledEvent()]);
    });

    it('should do nothing if action executor is not command executor', async () => {
      commandExecutor.entity?.removeComponent(CommandExecutor);

      await commandSystem.processEvent(mockActionExecutedEvent(), engine);

      expect(engine.events).toEqual([]);
    });
  });

  function mockCommand(): MockCommand {
    return new MockCommand();
  }

  function mockPendingAction(): PendingAction {
    return new PendingAction({ action: mockAction(), scheduleTime: engine.time, executionEvent: mockBeforeActionExecutingEvent() });
  }

  function mockAction(): MockAction {
    return new MockAction();
  }

  function mockActionScheduledEvent(): ActionScheduledEvent {
    return new ActionScheduledEvent({ time: engine.time, action: mockAction(), executor: commandExecutor.actionExecutor });
  }

  function mockBeforeActionExecutingEvent(): BeforeActionExecutingEvent {
    return new BeforeActionExecutingEvent({ time: engine.time, action: mockAction(), executor: commandExecutor.actionExecutor });
  }

  function mockActionExecutedEvent(): ActionExecutedEvent {
    return new ActionExecutedEvent({ time: engine.time, action: mockAction(), executor: commandExecutor.actionExecutor });
  }

  function mockCommandScheduledEvent(): CommandScheduledEvent {
    return new CommandScheduledEvent({ time: engine.time, command, executor: commandExecutor });
  }

  function mockCommandStartedEvent(): CommandStartedEvent {
    return new CommandStartedEvent({ time: engine.time, command, executor: commandExecutor });
  }

  function mockCommandEndedEvent(): CommandEndedEvent {
    return new CommandEndedEvent({ time: engine.time, command, executor: commandExecutor });
  }
});
