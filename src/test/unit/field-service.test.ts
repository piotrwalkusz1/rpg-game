import { FieldPlacement, PlacementFieldPosition, RectFieldPosition, SimpleFieldPosition } from 'engine/core/field';
import { FieldService } from 'engine/core/field/field-service';
import { mockField, mockRectField, subFieldAt } from 'test/mock/mock-field';

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

      const connectedFields = FieldService.getConnectedFields(subFieldAt(field, 1, 1));

      expect(connectedFields.length).toEqual(9);
      expect(connectedFields[0]).toBe(field);
      expect(connectedFields[1]).toBe(subFieldAt(field, 0, 0));
      expect(connectedFields[2]).toBe(subFieldAt(field, 1, 0));
      expect(connectedFields[3]).toBe(subFieldAt(field, 2, 0));
      expect(connectedFields[4]).toBe(subFieldAt(field, 0, 1));
      expect(connectedFields[5]).toBe(subFieldAt(field, 2, 1));
      expect(connectedFields[6]).toBe(subFieldAt(field, 0, 2));
      expect(connectedFields[7]).toBe(subFieldAt(field, 1, 2));
      expect(connectedFields[8]).toBe(subFieldAt(field, 2, 2));
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
});
