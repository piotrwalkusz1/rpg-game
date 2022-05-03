import type { Field } from 'engine/core/field/field';
import { ArrayUtils } from 'utils';
import { PlacementFieldPosition, RectFieldPosition, SimpleFieldPosition } from './field-position';

export namespace FieldService {
  export const getConnectedFields = (field: Field): readonly Field[] => {
    return ArrayUtils.filterNotNull([field.parentField, ...getConnectedSiblings(field), ...field.getSubFields()]);
  };

  const getConnectedSiblings = (field: Field): readonly Field[] => {
    if (!field.parentField) {
      return [];
    }
    if (field.position instanceof SimpleFieldPosition) {
      return field.siblings.filter((sibling) => sibling.position instanceof SimpleFieldPosition);
    }
    if (field.position instanceof PlacementFieldPosition) {
      return field.siblings.filter((sibling) => sibling.position instanceof PlacementFieldPosition);
    }
    if (field.position instanceof RectFieldPosition) {
      return field.siblings.filter(
        (sibling) =>
          sibling.position instanceof RectFieldPosition &&
          field.position instanceof RectFieldPosition &&
          Math.abs(field.position.x - sibling.position.x) <= 1 &&
          Math.abs(field.position.y - sibling.position.y) <= 1
      );
    }
    return [];
  };
}
