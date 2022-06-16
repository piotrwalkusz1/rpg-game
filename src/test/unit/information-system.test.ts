import { ActionExecutingEvent } from 'engine/core/action';
import { GameEngine } from 'engine/core/game';
import { Character } from 'engine/modules/character';
import { InformAction, Information, InformationSystem } from 'engine/modules/information';
import { Mock } from 'typemoq';

describe('InformationSystem', () => {
  let informationSystem: InformationSystem;
  let engine: GameEngine;

  beforeEach(() => {
    informationSystem = new InformationSystem();
    engine = new GameEngine();
  });

  describe('processEvent', () => {
    it('should add information to information receiver', async () => {
      const information = Mock.ofType<Information>().object;
      const informationOwner = Character.create(engine);
      informationOwner.informationOwner.addInformation(information);
      const informationReceiver = Character.create(engine);
      const event = new ActionExecutingEvent({
        time: engine.time,
        action: new InformAction({ informationReceiver: informationReceiver.informationOwner, information }),
        executor: informationOwner
      });

      await informationSystem.processEvent(event, engine);

      expect(informationOwner.informationOwner.informations).toEqual([information]);
      expect(informationReceiver.informationOwner.informations).toEqual([information]);
    });
  });
});
