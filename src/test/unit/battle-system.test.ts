import { CDIContainer } from 'cdi-container';
import { ActionExecutedEvent } from 'engine/core/action';
import type { GameEngine } from 'engine/core/game';
import { AttackAction } from 'engine/modules/attack';
import { BattleActivity, BattleSystem } from 'engine/modules/battle';
import { Character } from 'engine/modules/character';
import { GameBuilder } from 'game';

describe('BattleSystem', () => {
  let battleSystem: BattleSystem;
  let engine: GameEngine;
  let attacker: Character;
  let target: Character;

  beforeEach(() => {
    battleSystem = new BattleSystem();
    engine = CDIContainer.create().get(GameBuilder).build();
    attacker = Character.create(engine);
    target = Character.create(engine);
  });

  describe('processEvent', () => {
    it('should set common battle activity after attack', async () => {
      await battleSystem.processEvent(
        new ActionExecutedEvent({ time: engine.time, action: new AttackAction({ target: target }), executor: attacker.actionExecutor })
      );

      const activity = attacker.activityParticipant.getActivity(BattleActivity);
      expect(target.activityParticipant.getActivity(BattleActivity)).toBe(activity);
      expect(activity?.participants.getArray()).toEqual([attacker.activityParticipant, target.activityParticipant]);
    });

    it('should not set common battle activity after attack if no ActivityParticipant component', async () => {
      attacker.entity.removeComponent(attacker.activityParticipant);

      await battleSystem.processEvent(
        new ActionExecutedEvent({ time: engine.time, action: new AttackAction({ target: target }), executor: attacker.actionExecutor })
      );

      expect(target.activityParticipant.getActivity(BattleActivity)).toBeUndefined();
    });
  });
});
