import type { Field } from 'engine/core/field/field';
import { ArrayUtils, clamp } from 'utils';
import { PlacementFieldPosition, RectFieldPosition, SimpleFieldPosition } from './field-position';
import { getX, getY, isRectFieldPosition, sameParent, siblingAt } from './field-utils';

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

  export const getPathBetweenRectFields = (from: Field, to: Field): Field[] | undefined => {
    if (!(sameParent(from, to) && isRectFieldPosition(from.position) && isRectFieldPosition(to.position))) {
      return;
    }
    const path = [from];
    while (path[path.length - 1] !== to) {
      const last = path[path.length - 1];
      const x = getX(last) + clamp(getX(to) - getX(last), -1, 1);
      const y = getY(last) + clamp(getY(to) - getY(last), -1, 1);
      path.push(siblingAt(from, x, y));
    }
    return path;
  };
}
