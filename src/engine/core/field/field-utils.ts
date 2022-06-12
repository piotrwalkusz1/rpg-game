import { Engine, EntityProvider } from 'engine/core/ecs';
import { Field } from 'engine/core/field/field';
import { FieldObject } from 'engine/core/field/field-object';
import { FieldObjectPosition } from 'engine/core/field/field-object-position';
import { requireNotNull, requireType } from 'utils';
import { RectFieldPosition, type FieldPosition } from './field-position';

export namespace FieldUtils {
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

export const siblingAt = (field: Field, position: [number, number]): Field => subFieldAt(getParentField(field), position);

export const subFieldAt = (field: FieldProvider, position: [number, number]): Field =>
  requireNotNull(getField(field).getRectSubFields()[position[1]][position[0]]);

export const getX = (fieldProvider: FieldProvider): number => requireNotNull(getRectFieldPosition(fieldProvider)).x;

export const getY = (fieldProvider: FieldProvider): number => requireNotNull(getRectFieldPosition(fieldProvider)).y;

export const isRectFieldPosition = (position: FieldPosition | undefined): position is RectFieldPosition =>
  position instanceof RectFieldPosition;

export const getRectFieldPosition = (fieldProvider: FieldProvider): RectFieldPosition => {
  return requireType(getField(fieldProvider).position, RectFieldPosition);
};

export const getParentField = (field: FieldProvider): Field => requireNotNull(tryGetParentField(field));

export const tryGetParentField = (field: FieldProvider): Field | undefined => tryGetField(field)?.parentField;

export const sameParent = (firstField: Field, secondField: Field): boolean =>
  tryGetParentField(firstField) === tryGetParentField(secondField);

export const rootField = (engine: Engine): Field =>
  requireNotNull(engine.getComponents(Field).filter((field) => field.parentField === undefined)[0]);
