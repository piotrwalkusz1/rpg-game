import { EntityProvider } from 'engine/core/ecs';
import type { Field } from 'engine/core/field/field';
import { FieldObject } from 'engine/core/field/field-object';
import type { FieldObjectPosition } from 'engine/core/field/field-object-position';

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

  export const getField = (object: EntityProvider): Field | undefined => {
    return EntityProvider.getComponent(object, FieldObject)?.position?.field;
  };

  export const setFieldObjectPosition = (object: EntityProvider, position: FieldObjectPosition): void => {
    const fieldObject: FieldObject | undefined = EntityProvider.getComponent(object, FieldObject);
    if (fieldObject) {
      fieldObject.position = position;
    }
  };
}
