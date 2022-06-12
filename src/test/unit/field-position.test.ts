import { FieldPlacement, FieldPosition, PlacementFieldPosition, RectFieldPosition, SimpleFieldPosition } from 'engine/core/field';
import { mockField } from 'test/mock/mock-field';

describe('FieldPosition', () => {
  describe('areEqual method', () => {
    it('should return true if positions are the same', () => {
      const position = new SimpleFieldPosition(mockField());

      expect(FieldPosition.areEqual(position, position)).toBe(true);
    });

    it('should return true if both positions are undefined', () => {
      expect(FieldPosition.areEqual(undefined, undefined)).toBe(true);
    });

    it('should return false if only first position is undefined', () => {
      const position = new SimpleFieldPosition(mockField());

      expect(FieldPosition.areEqual(undefined, position)).toBe(false);
    });

    it('should return false if only second position is undefined', () => {
      const position = new SimpleFieldPosition(mockField());

      expect(FieldPosition.areEqual(position, undefined)).toBe(false);
    });

    it('should return true if both positions are SimplePosition with same parent field', () => {
      const field = mockField();
      const firstPosition = new SimpleFieldPosition(field);
      const secondPosition = new SimpleFieldPosition(field);

      expect(FieldPosition.areEqual(firstPosition, secondPosition)).toBe(true);
    });

    it('should return false if both positions are SimplePosition but with different parent field', () => {
      const firstPosition = new SimpleFieldPosition(mockField());
      const secondPosition = new SimpleFieldPosition(mockField());

      expect(FieldPosition.areEqual(firstPosition, secondPosition)).toBe(false);
    });

    it('should return true if both positions are RectFieldPosition with same parent field and XY position', () => {
      const field = mockField();
      const firstPosition = new RectFieldPosition(field, 1, 3);
      const secondPosition = new RectFieldPosition(field, 1, 3);

      expect(FieldPosition.areEqual(firstPosition, secondPosition)).toBe(true);
    });

    it('should return false if both positions are RectFieldPosition but with different parent field', () => {
      const firstPosition = new RectFieldPosition(mockField(), 1, 3);
      const secondPosition = new RectFieldPosition(mockField(), 1, 3);

      expect(FieldPosition.areEqual(firstPosition, secondPosition)).toBe(false);
    });

    it('should return false if both positions are RectFieldPosition but with different X position', () => {
      const field = mockField();
      const firstPosition = new RectFieldPosition(field, 1, 3);
      const secondPosition = new RectFieldPosition(field, 2, 3);

      expect(FieldPosition.areEqual(firstPosition, secondPosition)).toBe(false);
    });

    it('should return false if both positions are RectFieldPosition but with different Y position', () => {
      const field = mockField();
      const firstPosition = new RectFieldPosition(field, 1, 3);
      const secondPosition = new RectFieldPosition(field, 1, 4);

      expect(FieldPosition.areEqual(firstPosition, secondPosition)).toBe(false);
    });

    it('should return true if both positions are PlacementFieldPosition with same parent field and placement', () => {
      const field = mockField();
      const firstPosition = new PlacementFieldPosition(field, FieldPlacement.INSIDE);
      const secondPosition = new PlacementFieldPosition(field, FieldPlacement.INSIDE);

      expect(FieldPosition.areEqual(firstPosition, secondPosition)).toBe(true);
    });

    it('should return false if both positions are PlacementFieldPosition but with different parent field', () => {
      const firstPosition = new PlacementFieldPosition(mockField(), FieldPlacement.INSIDE);
      const secondPosition = new PlacementFieldPosition(mockField(), FieldPlacement.INSIDE);

      expect(FieldPosition.areEqual(firstPosition, secondPosition)).toBe(false);
    });

    it('should return false if both positions are PlacementFieldPosition but with different placement', () => {
      const field = mockField();
      const firstPosition = new PlacementFieldPosition(field, FieldPlacement.INSIDE);
      const secondPosition = new PlacementFieldPosition(field, FieldPlacement.OUTSIDE);

      expect(FieldPosition.areEqual(firstPosition, secondPosition)).toBe(false);
    });

    it('should return false for SimplePosition and RectFieldPosition', () => {
      const field = mockField();
      const firstPosition = new SimpleFieldPosition(field);
      const secondPosition = new RectFieldPosition(field, 0, 0);

      expect(FieldPosition.areEqual(firstPosition, secondPosition)).toBe(false);
    });

    it('should return false for RectFieldPosition and PlacementFieldPosition', () => {
      const field = mockField();
      const firstPosition = new RectFieldPosition(field, 0, 0);
      const secondPosition = new PlacementFieldPosition(field, FieldPlacement.OUTSIDE);

      expect(FieldPosition.areEqual(firstPosition, secondPosition)).toBe(false);
    });

    it('should return false for PlacementFieldPosition and SimplePosition', () => {
      const field = mockField();
      const firstPosition = new PlacementFieldPosition(field, FieldPlacement.OUTSIDE);
      const secondPosition = new SimpleFieldPosition(field);

      expect(FieldPosition.areEqual(firstPosition, secondPosition)).toBe(false);
    });
  });
});
