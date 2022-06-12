import { FieldObject, FieldObjectPosition } from 'engine/core/field';
import { mockField } from 'test/mock/mock-field';

describe('FieldObject', () => {
  describe('field setter', () => {
    it('should set position with field', () => {
      const fieldObject = new FieldObject();
      const field = mockField();

      fieldObject.field = field;

      expect(fieldObject.position).toEqual(new FieldObjectPosition(field));
    });

    it('should set position to undefined', () => {
      const fieldObject = new FieldObject();
      const field = mockField();
      fieldObject.position = new FieldObjectPosition(field);

      fieldObject.field = undefined;

      expect(fieldObject.position).toBeUndefined();
    });
  });
});
