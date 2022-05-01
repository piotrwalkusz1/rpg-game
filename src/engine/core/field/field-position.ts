import type { Field } from 'engine/core/field/field';
import type { FieldPlacement } from 'engine/core/field/field-placement';

export abstract class FieldPosition {
  constructor(readonly parentField: Field) {}

  abstract equals(position: FieldPosition): boolean;

  static areEqual(firstPosition: FieldPosition | undefined, secondPosition: FieldPosition | undefined) {
    if (firstPosition === undefined && secondPosition === undefined) {
      return true;
    } else if (firstPosition === undefined || secondPosition === undefined) {
      return false;
    } else {
      return firstPosition.equals(secondPosition);
    }
  }
}

export class SimpleFieldPosition extends FieldPosition {
  override equals(position: FieldPosition): boolean {
    return position instanceof SimpleFieldPosition && this.parentField === position.parentField;
  }
}

export class RectFieldPosition extends FieldPosition {
  readonly x: number;
  readonly y: number;

  constructor(parentField: Field, x: number, y: number) {
    super(parentField);
    this.x = x;
    this.y = y;
  }

  override equals(position: FieldPosition): boolean {
    return (
      position instanceof RectFieldPosition && this.parentField === position.parentField && this.x === position.x && this.y === position.y
    );
  }
}

export class PlacementFieldPosition extends FieldPosition {
  readonly placement: FieldPlacement;

  constructor(parentField: Field, placement: FieldPlacement) {
    super(parentField);
    this.placement = placement;
  }

  override equals(position: FieldPosition): boolean {
    return position instanceof PlacementFieldPosition && this.parentField === position.parentField && this.placement === position.placement;
  }
}
