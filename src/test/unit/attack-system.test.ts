import { CDIContainer } from 'cdi-container';
import { ActionExecutingEvent } from 'engine/core/action';
import type { GameEngine } from 'engine/core/game';
import { AttackAction, AttackSystem } from 'engine/modules/attack';
import { Character } from 'engine/modules/character';
import { GameBuilder } from 'game';

describe('AttackSystem', () => {
  let attackSystem: AttackSystem;
  let engine: GameEngine;
  let attacker: Character;
  let target: Character;

  beforeEach(() => {
    attackSystem = new AttackSystem();
    engine = CDIContainer.create().get(GameBuilder).build();
    attacker = Character.create(engine);
    target = Character.create(engine);
  });

  describe('Attack ActionExecutingEvent', () => {
    it('should decrease health of target', async () => {
      attacker.attacker.damage = 13;
      target.health.healthPoints = 217;

      await attackSystem.processEvent(
        new ActionExecutingEvent({ time: engine.time, action: new AttackAction({ target }), executor: attacker.actionExecutor }),
        engine
      );

      expect(target.health.healthPoints).toEqual(204);
    });

    it('should do nothing if no attacker component', async () => {
      attacker.entity.removeComponent(attacker.attacker);
      target.health.healthPoints = 217;

      await attackSystem.processEvent(
        new ActionExecutingEvent({ time: engine.time, action: new AttackAction({ target }), executor: attacker.actionExecutor }),
        engine
      );

      expect(target.health.healthPoints).toEqual(217);
    });

    it('should do nothing if target has no health component', async () => {
      attacker.attacker.damage = 13;
      target.entity.removeComponent(target.health);

      await attackSystem.processEvent(
        new ActionExecutingEvent({ time: engine.time, action: new AttackAction({ target }), executor: attacker.actionExecutor }),
        engine
      );
    });
  });
});
