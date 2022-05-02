import { EntityProvider } from '../ecs';
import { Field } from './field';
import { FieldObject } from './field-object';
import { FieldObjectPosition } from './field-object-position';

export type FieldProvider = Field | FieldObjectPosition | EntityProvider;

export namespace FieldProvider {
  export const getField = (fieldProvider: FieldProvider): Field | undefined => {
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
    const fieldObject: FieldObject | undefined = EntityProvider.getComponent(fieldProvider, FieldObject);
    return fieldObject?.field;
  };
}
