import { Entity } from 'engine/core/ecs';
import { AreFieldsConnected } from 'engine/core/field/are-fields-connected';
import { AreFieldsConnectedChecker } from 'engine/core/field/are-fields-connected-checker';
import { mockField } from 'test/mock/mock-field';

describe('AreFieldsConnected', () => {
  let areFieldsConnectedChecker: AreFieldsConnectedChecker;

  beforeEach(() => {
    areFieldsConnectedChecker = new AreFieldsConnectedChecker();
  });

  describe('check method', () => {
    it('should return false if one of the fields providers is undefined', () => {
      const condition = new AreFieldsConnected([new Entity(), new Entity().addComponent(mockField())]);

      expect(areFieldsConnectedChecker.check(condition)).toBe(false);
    });
  });
});
