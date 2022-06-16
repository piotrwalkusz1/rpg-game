import { Information, InformationOwner } from 'engine/modules/information';

describe('InformationOwner', () => {
  class MockInformation extends Information {
    constructor(readonly id: number) {
      super();
    }

    override equals(information: Information): boolean {
      return information instanceof MockInformation && information.id === this.id;
    }
  }

  let informationOwner: InformationOwner;

  beforeEach(() => {
    informationOwner = new InformationOwner();
  });

  describe('addInformation', () => {
    it('should not add information if information owner already has that information', () => {
      informationOwner.addInformation(new MockInformation(1));
      informationOwner.addInformation(new MockInformation(2));
      informationOwner.addInformation(new MockInformation(3));

      informationOwner.addInformation(new MockInformation(2));

      expect(informationOwner.informations).toEqual([new MockInformation(1), new MockInformation(2), new MockInformation(3)]);
    });
  });
});
