export const createOneToManyRelationship = <Parent, Child, FK>({
  getChildren,
  getParent,
  setForeignKey,
  prepareForeignKey
}: {
  getChildren: (parent: Parent) => Child[];
  getParent: (child: Child) => Parent | undefined;
  setForeignKey: (child: Child, foreignKey: FK | undefined) => void;
  prepareForeignKey: (parent: Parent) => FK;
}) => {
  return {
    addChild: (parent: Parent, child: Child) => {
      const children = getChildren(parent);
      if (children.includes(child)) {
        return;
      }
      children.push(child);
      if (getParent(child) !== parent) {
        const foreignKey = prepareForeignKey(parent);
        setForeignKey(child, foreignKey);
      }
    },
    removeChild: (parent: Parent, child: Child) => {
      const children = getChildren(parent);
      const childIndex = children.findIndex((otherChild) => otherChild === child);
      if (childIndex === -1) {
        return;
      }
      children.splice(childIndex, 1);
      if (getParent(child) === parent) {
        setForeignKey(child, undefined);
      }
    }
  };
};

export const createManyToOneRelationship = <Child, Parent, FK>({
  getForeignKey,
  setForeignKeyInternally,
  areForeignKeysEqual,
  getParent,
  addChild,
  removeChild
}: {
  getForeignKey: (child: Child) => FK | undefined;
  setForeignKeyInternally: (Child: Child, foreignKey: FK | undefined) => void;
  areForeignKeysEqual: (firstForeignKey: FK | undefined, secondForeignKey: FK | undefined) => boolean;
  getParent: (foreignKey: FK | undefined) => Parent | undefined;
  addChild: (parent: Parent, child: Child) => void;
  removeChild: (parent: Parent, child: Child) => void;
}) => {
  return {
    setForeignKey: (child: Child, newForeignKey: FK | undefined) => {
      const oldForeignKey = getForeignKey(child);
      if (areForeignKeysEqual(oldForeignKey, newForeignKey)) {
        return;
      }
      setForeignKeyInternally(child, newForeignKey);
      const oldParent = getParent(oldForeignKey);
      const newParent = getParent(newForeignKey);
      if (oldParent == newParent) {
        return;
      }
      if (oldParent) {
        removeChild(oldParent, child);
      }
      if (newParent) {
        addChild(newParent, child);
      }
    }
  };
};
