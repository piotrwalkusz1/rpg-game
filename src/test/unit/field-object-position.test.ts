import { FieldObjectPosition } from 'engine/core/field';
import { mockField } from 'test/mock/mock-field';

describe('FieldObjectPosition', () => {
  describe('areEqual position', () => {
    it('should return true if positions are the same', () => {
      const fieldObjectPosition = new FieldObjectPosition(mockField());

      expect(FieldObjectPosition.areEqual(fieldObjectPosition, fieldObjectPosition)).toBe(true);
    });

    it('should return true if both positions are undefined', () => {
      expect(FieldObjectPosition.areEqual(undefined, undefined)).toBe(true);
    });

    it('should return false if only first position is undefined', () => {
      const fieldObjectPosition = new FieldObjectPosition(mockField());

      expect(FieldObjectPosition.areEqual(undefined, fieldObjectPosition)).toBe(false);
    });

    it('should return false if only second position is undefined', () => {
      const fieldObjectPosition = new FieldObjectPosition(mockField());

      expect(FieldObjectPosition.areEqual(fieldObjectPosition, undefined)).toBe(false);
    });

    it('should return true if fields of both positions are the same', () => {
      const field = mockField();
      const firstPosition = new FieldObjectPosition(field);
      const secondPosition = new FieldObjectPosition(field);

      expect(FieldObjectPosition.areEqual(firstPosition, secondPosition)).toBe(true);
    });

    it('should return false if fields of both positions are different', () => {
      const firstPosition = new FieldObjectPosition(mockField());
      const secondPosition = new FieldObjectPosition(mockField());

      expect(FieldObjectPosition.areEqual(firstPosition, secondPosition)).toBe(false);
    });
  });
});
