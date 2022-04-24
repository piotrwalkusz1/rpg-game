import type { Field } from 'engine/core/field/field';

export class FieldObjectPosition {
  constructor(readonly field: Field) {}

  static areEqual(firstPosition: FieldObjectPosition | undefined, secondPosition: FieldObjectPosition | undefined) {
    if (firstPosition === undefined && secondPosition === undefined) {
      return true;
    } else if (firstPosition === undefined || secondPosition === undefined) {
      return false;
    } else {
      return firstPosition.field === secondPosition.field;
    }
  }
}
