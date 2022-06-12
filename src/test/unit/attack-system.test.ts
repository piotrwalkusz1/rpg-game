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
    engine = new GameBuilder().build();
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
  });
});
