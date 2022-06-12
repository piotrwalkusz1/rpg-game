import { Entity } from 'engine/core/ecs';
import { AreFieldsConnected } from 'engine/core/field/are-fields-connected';
import { mockField } from 'test/mock/mock-field';

describe('AreFieldsConnected', () => {
  describe('check method', () => {
    it('should return false if one of the fields providers is undefined', () => {
      expect(new AreFieldsConnected([new Entity(), new Entity().addComponent(mockField())]).check()).toBe(false);
    });
  });
});
