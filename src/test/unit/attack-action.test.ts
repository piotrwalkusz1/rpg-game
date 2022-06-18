import { ActionExecutor } from 'engine/core/action';
import { Entity } from 'engine/core/ecs';
import { GameEngine } from 'engine/core/game';
import { AttackAction } from 'engine/modules/attack';
import { IsAlive } from 'engine/modules/health';

describe('AttackAction', () => {
  let engine: GameEngine;

  beforeEach(() => {
    engine = new GameEngine();
  });

  describe('duration', () => {
    it('should return 2 seconds', () => {
      expect(new AttackAction({ target: new Entity() }).duration).toEqual({ seconds: 2 });
    });
  });

  describe('getExecutionConditions', () => {
    it('should return conditions', () => {
      const actionExecutor = engine.addEntityWithComponent(new ActionExecutor());
      const target = new Entity();
      const action = new AttackAction({ target });

      const conditions = action.getExecutionConditions(actionExecutor);

      expect(conditions).toEqual([new IsAlive(actionExecutor), new IsAlive(target)]);
    });
  });
});
