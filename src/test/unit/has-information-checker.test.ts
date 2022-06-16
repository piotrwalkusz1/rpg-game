import { Entity } from 'engine/core/ecs';
import { GameEngine } from 'engine/core/game';
import { HasInformation, Information, InformationOwner } from 'engine/modules/information';
import { HasInformationChecker } from 'engine/modules/information/has-information-checker';

describe('HasInformationChecker', () => {
  class MockInformation extends Information {
    constructor(private id: number) {
      super();
    }

    override equals(information: Information): boolean {
      return information instanceof MockInformation && information.id === this.id;
    }
  }

  let hasInformationChecker: HasInformationChecker;
  let engine: GameEngine;
  let informationOwner: InformationOwner;

  beforeEach(() => {
    hasInformationChecker = new HasInformationChecker();
    engine = new GameEngine();
    informationOwner = engine.addEntityWithComponent(new InformationOwner());
  });

  describe('check', () => {
    it('should return true if information owner has information', () => {
      informationOwner.addInformation(new MockInformation(1));
      const condition = new HasInformation(informationOwner, new MockInformation(1));

      expect(hasInformationChecker.check(condition)).toBe(true);
    });

    it('should return false if information owner does not have information', () => {
      informationOwner.addInformation(new MockInformation(1));
      const condition = new HasInformation(informationOwner, new MockInformation(2));

      expect(hasInformationChecker.check(condition)).toBe(false);
    });

    it('should return false if entity is not information owner', () => {
      const condition = new HasInformation(new Entity(), new MockInformation(1));

      expect(hasInformationChecker.check(condition)).toBe(false);
    });
  });
});
