import { Field, RectFieldPosition, type FieldPosition } from 'engine/core/field';
import { FieldDefinition } from 'engine/core/field/field-definition';

export const mockRectField = (width: number, height: number): Field => {
  const field = mockField();
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      new Field({ definition: mockFieldDefinition(), position: new RectFieldPosition(field, x, y) });
    }
  }
  return field;
};

export const mockField = (position?: FieldPosition): Field => new Field({ definition: mockFieldDefinition(), position });

export const subFieldAt = (field: Field, x: number, y: number): Field => field.getRectSubFields()[y][x];

export const mockFieldDefinition = (): FieldDefinition => new FieldDefinition({ name: { literal: '' } });
