import { Action, ActionExecutor, ActionService, ActionSystem, BeforeActionExecutingEvent, PendingAction } from 'engine/core/action';
import { GameEngine } from 'engine/core/game';
import { IMock, It, Mock, Times } from 'typemoq';

describe('ActionSystem', () => {
  let actionServiceMock: IMock<ActionService>;
  let actionSystem: ActionSystem;
  let engine: GameEngine;

  beforeEach(() => {
    actionServiceMock = Mock.ofType<ActionService>();
    actionSystem = new ActionSystem(actionServiceMock.object);
    engine = new GameEngine();
  });

  describe('processEvent', () => {
    it('should set pendingAction to undefined', async () => {
      const actionExecutor = engine.addEntityWithComponent(new ActionExecutor());
      const action = Mock.ofType<Action>().object;
      const event = new BeforeActionExecutingEvent({ time: engine.time, action, executor: actionExecutor });
      actionExecutor.pendingAction = new PendingAction({ action, executionEvent: event, scheduleTime: engine.time });

      await actionSystem.processEvent(event, engine);

      expect(actionExecutor.pendingAction).toBeUndefined();
    });

    it('should add events if can execute action', async () => {
      const actionExecutor = engine.addEntityWithComponent(new ActionExecutor());
      const action = Mock.ofType<Action>().object;
      const event = new BeforeActionExecutingEvent({ time: engine.time, action, executor: actionExecutor });
      actionExecutor.pendingAction = new PendingAction({ action, executionEvent: event, scheduleTime: engine.time });
      actionServiceMock
        .setup((instance) => instance.canExecuteAction(action, It.isAny(), It.isAny()))
        .returns(() => true)
        .verifiable(Times.once());

      await actionSystem.processEvent(event, engine);

      // expect(engine.events).toEqual([
      //   new ActionExecutingEvent({ time: engine.time, action, executor: actionExecutor }),
      //   new ActionExecutedEvent({ time: engine.time, action, executor: actionExecutor })
      // ]);
      actionServiceMock.verifyAll();
    });

    it('should not add events if cannot execute action', async () => {
      const actionExecutor = engine.addEntityWithComponent(new ActionExecutor());
      const action = Mock.ofType<Action>().object;
      const event = new BeforeActionExecutingEvent({ time: engine.time, action, executor: actionExecutor });
      actionExecutor.pendingAction = new PendingAction({ action, executionEvent: event, scheduleTime: engine.time });
      actionServiceMock
        .setup((instance) => instance.canExecuteAction(action, It.isAny(), It.isAny()))
        .returns(() => false)
        .verifiable(Times.once());

      await actionSystem.processEvent(event, engine);

      expect(engine.events).toEqual([]);
      actionServiceMock.verifyAll();
    });

    it('should do nothing if current pending action is not equal to action from event', async () => {
      const actionExecutor = engine.addEntityWithComponent(new ActionExecutor());
      const event = new BeforeActionExecutingEvent({ time: engine.time, action: Mock.ofType<Action>().object, executor: actionExecutor });
      const pendingAction = new PendingAction({ action: Mock.ofType<Action>().object, executionEvent: event, scheduleTime: engine.time });
      actionExecutor.pendingAction = pendingAction;

      await actionSystem.processEvent(event, engine);

      expect(actionExecutor.pendingAction).toBe(pendingAction);
    });

    it('should do nothing if action executor has no pending action', async () => {
      const actionExecutor = engine.addEntityWithComponent(new ActionExecutor());
      const event = new BeforeActionExecutingEvent({ time: engine.time, action: Mock.ofType<Action>().object, executor: actionExecutor });
      actionServiceMock.setup((instance) => instance.canExecuteAction(It.isAny(), It.isAny(), It.isAny())).verifiable(Times.never());

      await actionSystem.processEvent(event, engine);

      expect(actionExecutor.pendingAction).toBe(undefined);
      actionServiceMock.verifyAll();
    });
  });
});
