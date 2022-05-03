import { ActionExecutedEvent, ActionExecutor, ActionScheduledEvent, BeforeActionExecutingEvent, PendingAction } from 'engine/core/action';
import {
  Command,
  CommandEndedEvent,
  CommandExecutor,
  CommandScheduledEvent,
  CommandStartedEvent,
  CommandSystem
} from 'engine/core/command';
import type { Time } from 'engine/core/time';
import { MockAction } from 'test/mock/mock-action';
import { MockCommand } from 'test/mock/mock-command';
import { MockedEngine } from 'test/mock/mock-engine';

describe('Command system', () => {
  let commandSystem: CommandSystem;
  let engine: MockedEngine;
  let commandExecutor: CommandExecutor;
  let actionExecutor: ActionExecutor;
  let command: Command;
  let time: Time;

  beforeEach(() => {
    commandSystem = new CommandSystem();
    engine = new MockedEngine();
    commandExecutor = engine.addCommandExecutor();
    actionExecutor = commandExecutor.requireComponent(ActionExecutor);
    command = mockCommand();
    time = engine.time;
  });

  describe('CommandScheduledEvent', () => {
    it('should create CommandStartedEvent if action scheduled', async () => {
      await commandSystem.processEvent(mockCommandScheduledEvent(), engine);

      expect(engine.events).toEqual([mockActionScheduledEvent(), mockBeforeActionExecutingEvent(), mockCommandStartedEvent()]);
    });

    it('should not create CommandStartedEvent if another command is already pending', async () => {
      commandExecutor.pendingCommand = command;

      await commandSystem.processEvent(mockCommandScheduledEvent(), engine);

      expect(engine.events).toEqual([]);
    });

    it('should not create CommandStartedEvent if action cannot be scheduled', async () => {
      actionExecutor.pendingAction = mockPendingAction();

      await commandSystem.processEvent(mockCommandScheduledEvent(), engine);

      expect(engine.events).toEqual([]);
    });
  });

  describe('ActionExecutedEvent', () => {
    it('should create CommandEndedEvent if command is pending and next action cannot be scheduled', async () => {
      commandExecutor.pendingCommand = command;
      actionExecutor.pendingAction = mockPendingAction();

      await commandSystem.processEvent(mockActionExecutedEvent(), engine);

      expect(engine.events).toEqual([mockCommandEndedEvent()]);
    });

    it('should not create CommandEndedEvent if command is not pending', async () => {
      await commandSystem.processEvent(mockActionExecutedEvent(), engine);

      expect(engine.events).toEqual([]);
    });

    it('should not create CommandEndedEvent if next action scheduled', async () => {
      commandExecutor.pendingCommand = command;

      await commandSystem.processEvent(mockActionExecutedEvent(), engine);

      expect(engine.events).toEqual([mockActionScheduledEvent(), mockBeforeActionExecutingEvent()]);
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
    return new ActionScheduledEvent({ time, action: mockAction(), executor: actionExecutor });
  }

  function mockBeforeActionExecutingEvent(): BeforeActionExecutingEvent {
    return new BeforeActionExecutingEvent({ time, action: mockAction(), executor: actionExecutor });
  }

  function mockActionExecutedEvent(): ActionExecutedEvent {
    return new ActionExecutedEvent({ time, action: mockAction(), executor: actionExecutor });
  }

  function mockCommandScheduledEvent(): CommandScheduledEvent {
    return new CommandScheduledEvent({ time, command, executor: commandExecutor });
  }

  function mockCommandStartedEvent(): CommandStartedEvent {
    return new CommandStartedEvent({ time, command, executor: commandExecutor });
  }

  function mockCommandEndedEvent(): CommandEndedEvent {
    return new CommandEndedEvent({ time, command, executor: commandExecutor });
  }
});
