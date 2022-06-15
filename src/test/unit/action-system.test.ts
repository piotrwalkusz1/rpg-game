import { CDIContainer } from 'cdi-container';
import {
  Action,
  ActionExecutedEvent,
  ActionExecutingEvent,
  ActionExecutor,
  ActionSystem,
  BeforeActionExecutingEvent,
  PendingAction
} from 'engine/core/action';
import type { GameEngine } from 'engine/core/game';
import type { Time } from 'engine/core/time';
import { GameBuilder } from 'game';
import { MockAction } from 'test/mock/mock-action';

describe('Command system', () => {
  let actionSystem: ActionSystem;
  let engine: GameEngine;
  let actionExecutor: ActionExecutor;
  let action: Action;
  let time: Time;

  beforeEach(() => {
    actionSystem = new ActionSystem();
    engine = CDIContainer.create().get(GameBuilder).build();
    actionExecutor = engine.addEntityWithComponent(new ActionExecutor());
    action = new MockAction();
    time = engine.time;
  });

  describe('BeforeActionExecutingEvent', () => {
    it('should create events and reset pending action', async () => {
      actionExecutor.pendingAction = mockPendingAction();

      await actionSystem.processEvent(mockBeforeActionExecutingEvent(), engine);

      expect(engine.events).toEqual([mockActionExecutingEvent(), mockActionExecutedEvent()]);
      expect(actionExecutor.pendingAction).toBeUndefined();
    });

    it('should do nothing if action is not pendig any more', async () => {
      await actionSystem.processEvent(mockBeforeActionExecutingEvent(), engine);

      expect(engine.events).toEqual([]);
      expect(actionExecutor.pendingAction).toBeUndefined();
    });

    it('should reset pending action if cannot execute action', async () => {
      action = mockActionThatCannotBeExecuted();
      actionExecutor.pendingAction = mockPendingAction();

      await actionSystem.processEvent(mockBeforeActionExecutingEvent(), engine);

      expect(engine.events).toEqual([]);
      expect(actionExecutor.pendingAction).toBeUndefined();
    });
  });

  function mockActionThatCannotBeExecuted(): Action {
    return new MockAction({ condition: { check: () => false } });
  }

  function mockPendingAction(): PendingAction {
    return new PendingAction({ action, scheduleTime: time, executionEvent: mockBeforeActionExecutingEvent() });
  }

  function mockBeforeActionExecutingEvent(): BeforeActionExecutingEvent {
    return new BeforeActionExecutingEvent({ time, action, executor: actionExecutor });
  }

  function mockActionExecutingEvent(): ActionExecutingEvent {
    return new ActionExecutingEvent({ time, action, executor: actionExecutor });
  }

  function mockActionExecutedEvent(): ActionExecutedEvent {
    return new ActionExecutedEvent({ time, action, executor: actionExecutor });
  }
});
