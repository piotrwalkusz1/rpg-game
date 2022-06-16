import { GameEngine } from 'engine/core/game';
import { Character } from 'engine/modules/character';
import { IsAlive } from 'engine/modules/health';
import { HasInformation, InformAction, Information } from 'engine/modules/information';
import { Mock } from 'typemoq';

describe('InformationAction', () => {
  let engine: GameEngine;
  let information: Information;

  beforeEach(() => {
    engine = new GameEngine();
    information = Mock.ofType<Information>().object;
  });

  describe('duration', () => {
    it('should return 10 seconds', () => {
      const character = Character.create(engine);

      expect(new InformAction({ informationReceiver: character.informationOwner, information }).duration).toEqual({ seconds: 10 });
    });
  });

  describe('getExecutionConditions', () => {
    it('should return conditions', () => {
      const character = Character.create(engine);
      const character2 = Character.create(engine);
      const action = new InformAction({ informationReceiver: character.informationOwner, information });

      const conditions = action.getExecutionConditions(character2.actionExecutor);

      expect(conditions).toEqual([new IsAlive(character2), new IsAlive(character), new HasInformation(character2, information)]);
    });
  });
});
