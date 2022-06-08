import { FieldPlacement, PlacementFieldPosition, RectFieldPosition, SimpleFieldPosition, subFieldAt } from 'engine/core/field';
import { FieldService } from 'engine/core/field/field-service';
import { mockField, mockRectField } from 'test/mock/mock-field';

describe('Field service', () => {
  describe('getConnectedField method', () => {
    it('should return empty array if field is not connected to any field', () => {
      expect(FieldService.getConnectedFields(mockField())).toEqual([]);
    });

    it('should return sibling field if both fields have PlacementFieldPosition', () => {
      const parentField = mockField();
      const field = mockField(new PlacementFieldPosition(parentField, FieldPlacement.OUTSIDE));
      const connectedSiblingField = mockField(new PlacementFieldPosition(parentField, FieldPlacement.INSIDE));

      expect(FieldService.getConnectedFields(field)).toEqual([parentField, connectedSiblingField]);
    });

    it('should not return sibling field if both fields have SimpleFieldPosition', () => {
      const parentField = mockField();
      const field = mockField(new SimpleFieldPosition(parentField));
      const siblingField = mockField(new SimpleFieldPosition(parentField));

      expect(FieldService.getConnectedFields(field)).toEqual([parentField, siblingField]);
    });

    it('should return sibling field if both fields have RectFieldPosition and are neighbours', () => {
      const field = mockRectField(5, 5);

      const connectedFields = FieldService.getConnectedFields(subFieldAt(field, [1, 1]));

      expect(connectedFields.length).toEqual(9);
      expect(connectedFields[0]).toBe(field);
      expect(connectedFields[1]).toBe(subFieldAt(field, [0, 0]));
      expect(connectedFields[2]).toBe(subFieldAt(field, [1, 0]));
      expect(connectedFields[3]).toBe(subFieldAt(field, [2, 0]));
      expect(connectedFields[4]).toBe(subFieldAt(field, [0, 1]));
      expect(connectedFields[5]).toBe(subFieldAt(field, [2, 1]));
      expect(connectedFields[6]).toBe(subFieldAt(field, [0, 2]));
      expect(connectedFields[7]).toBe(subFieldAt(field, [1, 2]));
      expect(connectedFields[8]).toBe(subFieldAt(field, [2, 2]));
    });

    it('should return sub fields', () => {
      const field = mockField();
      const subFields = [
        mockField(new SimpleFieldPosition(field)),
        mockField(new PlacementFieldPosition(field, FieldPlacement.OUTSIDE)),
        mockField(new RectFieldPosition(field, 0, 0))
      ];

      expect(FieldService.getConnectedFields(field)).toEqual(subFields);
    });
  });

  describe('getPathBetweenRectFields method', () => {
    const field = mockRectField(5, 5);

    it('should return one field if "from" and "to" are equal', () => {
      expect(FieldService.getPathBetweenRectFields(subFieldAt(field, [1, 3]), subFieldAt(field, [1, 3]))).toEqual([
        subFieldAt(field, [1, 3])
      ]);
    });

    it('should return two fields if "from" and "to" are adjoining', () => {
      expect(FieldService.getPathBetweenRectFields(subFieldAt(field, [1, 3]), subFieldAt(field, [0, 2]))).toEqual([
        subFieldAt(field, [1, 3]),
        subFieldAt(field, [0, 2])
      ]);
    });

    it('should select diagonal path first if possible', () => {
      expect(FieldService.getPathBetweenRectFields(subFieldAt(field, [0, 0]), subFieldAt(field, [2, 4]))).toEqual([
        subFieldAt(field, [0, 0]),
        subFieldAt(field, [1, 1]),
        subFieldAt(field, [2, 2]),
        subFieldAt(field, [2, 3]),
        subFieldAt(field, [2, 4])
      ]);

      expect(FieldService.getPathBetweenRectFields(subFieldAt(field, [4, 4]), subFieldAt(field, [3, 2]))).toEqual([
        subFieldAt(field, [4, 4]),
        subFieldAt(field, [3, 3]),
        subFieldAt(field, [3, 2])
      ]);
    });
  });
});
