import { add } from 'date-fns';
import { ActionExecutor, ActionService, ActionStartedEvent, BeforeActionExecutingEvent, PendingAction } from 'engine/core/action';
import { GameEngine } from 'engine/core/game';
import { MockAction } from 'test/mock/mock-action';

describe('ActionService', () => {
  let engine: GameEngine;
  let actionExecutor: ActionExecutor;

  beforeEach(() => {
    engine = new GameEngine();
    actionExecutor = engine.addEntityWithComponent(new ActionExecutor());
  });

  describe('scheduleAction method', () => {
    it('should set pending action and create events', () => {
      const duration: Duration = { seconds: 10 };
      const action = new MockAction({ duration });

      const scheduled = ActionService.scheduleAction(action, actionExecutor, engine);

      expect(scheduled).toEqual(true);
      expect(actionExecutor.pendingAction).toEqual(
        new PendingAction({
          action,
          scheduleTime: engine.time,
          executionEvent: new BeforeActionExecutingEvent({ time: add(engine.time, duration), action, executor: actionExecutor })
        })
      );
      expect(engine.events).toEqual([
        new ActionStartedEvent({ time: engine.time, action, executor: actionExecutor }),
        new BeforeActionExecutingEvent({ time: add(engine.time, duration), action, executor: actionExecutor })
      ]);
    });

    it('should do nothing if pending action', () => {
      const alreadyPendingAction = mockPendingAction();
      actionExecutor.pendingAction = alreadyPendingAction;

      const scheduled = ActionService.scheduleAction(new MockAction(), actionExecutor, engine);

      expect(scheduled).toEqual(false);
      expect(actionExecutor.pendingAction).toBe(alreadyPendingAction);
      expect(engine.events).toEqual([]);
    });

    it('should do nothing if cannot execute action', () => {
      const action = new MockAction({ condition: { check: () => false } });

      const scheduled = ActionService.scheduleAction(action, actionExecutor, engine);

      expect(scheduled).toEqual(false);
      expect(actionExecutor.pendingAction).toEqual(undefined);
      expect(engine.events).toEqual([]);
    });
  });

  function mockPendingAction(): PendingAction {
    return new PendingAction({
      action: new MockAction(),
      scheduleTime: engine.time,
      executionEvent: new BeforeActionExecutingEvent({ time: engine.time, action: new MockAction(), executor: actionExecutor })
    });
  }
});
