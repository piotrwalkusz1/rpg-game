import type { Field } from 'engine/core/field/field';
import { ArrayUtils } from 'utils';

export namespace FieldService {
  export const getConnectedFields = (field: Field): readonly Field[] => {
    return ArrayUtils.filterNotNull([field.parentField, ...(field.parentField?.getSubFields() || []), ...field.getSubFields()]).filter(
      (otherField) => otherField !== field
    );
  };
}
