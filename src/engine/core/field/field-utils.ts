import { EntityProvider } from 'engine/core/ecs';
import { Field } from 'engine/core/field/field';
import { FieldObject } from 'engine/core/field/field-object';
import { FieldObjectPosition } from 'engine/core/field/field-object-position';
import { requireNotNull, requireType } from 'utils';
import { PlacementFieldPosition, RectFieldPosition, SimpleFieldPosition, type FieldPosition } from './field-position';

export namespace FieldUtils {
  export const isObjectOnField = (object: EntityProvider, field: Field): boolean => {
    const fieldOfObject: Field | undefined = getField(object);
    return fieldOfObject !== undefined && (fieldOfObject === field || isSubFieldOfField(fieldOfObject, field));
  };

  export const isSubFieldOfField = (subField: Field, parentField: Field): boolean => {
    if (subField.parentField === parentField) {
      return true;
    }
    if (subField.parentField === undefined) {
      return false;
    }
    return isSubFieldOfField(subField.parentField, parentField);
  };

  export const setFieldObjectPosition = (object: EntityProvider, position: FieldObjectPosition): void => {
    const fieldObject: FieldObject | undefined = EntityProvider.getComponent(object, FieldObject);
    if (fieldObject) {
      fieldObject.position = position;
    }
  };
}

export type FieldProvider = Field | FieldObjectPosition | EntityProvider;

export const getField = (fieldProvider: FieldProvider): Field => requireNotNull(tryGetField(fieldProvider));

export const hasField = (fieldProvider: FieldProvider): boolean => {
  return tryGetField(fieldProvider) !== undefined;
};

export const tryGetField = (fieldProvider: FieldProvider): Field | undefined => {
  if (fieldProvider instanceof Field) {
    return fieldProvider;
  }
  if (fieldProvider instanceof FieldObjectPosition) {
    return fieldProvider.field;
  }
  const field: Field | undefined = EntityProvider.getComponent(fieldProvider, Field);
  if (field) {
    return field;
  }
  return EntityProvider.getComponent(fieldProvider, FieldObject)?.field;
};

export const siblingAt = (field: Field, x: number, y: number): Field => subFieldAt(getParentField(field), x, y);

export const subFieldAt = (field: FieldProvider, x: number, y: number): Field => requireNotNull(getField(field).getRectSubFields()[y][x]);

export const getX = (fieldProvider: FieldProvider): number => requireNotNull(getRectFieldPosition(fieldProvider)?.x);

export const getY = (fieldProvider: FieldProvider): number => getRectFieldPosition(fieldProvider)?.y;

export const isSimpleFieldPosition = (position: FieldPosition | undefined): position is SimpleFieldPosition =>
  position instanceof SimpleFieldPosition;

export const isRectFieldPosition = (position: FieldPosition | undefined): position is RectFieldPosition =>
  position instanceof RectFieldPosition;

export const getRectFieldPosition = (fieldProvider: FieldProvider): RectFieldPosition => {
  return requireType(getField(fieldProvider)?.position, RectFieldPosition);
};

export const isPlacementFieldPosition = (position: FieldPosition): position is PlacementFieldPosition =>
  position instanceof PlacementFieldPosition;

export const getParentField = (field: FieldProvider): Field => requireNotNull(tryGetParentField(field));

export const tryGetParentField = (field: FieldProvider): Field | undefined => tryGetField(field)?.parentField;

export const sameParent = (firstField: Field, secondField: Field): boolean =>
  tryGetParentField(firstField) === tryGetParentField(secondField);
