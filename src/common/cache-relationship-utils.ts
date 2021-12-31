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

export abstract class OneToManyCollection<Item> {
  abstract add(item: Item): void;

  abstract remove(item: Item): void;
}

export abstract class OneToManyForeignKey<Item, Collection extends OneToManyCollection<Item>, FK> {
  setForeignKey(newForeignKey: FK | undefined) {
    const oldForeignKey = this._value;
    if (this.areForeignKeysEqual(oldForeignKey, newForeignKey)) {
      return;
    }
    this._value = newForeignKey;
    const oldParent = this.getCollectionByForeignKey(oldForeignKey);
    const newParent = this.getCollectionByForeignKey(newForeignKey);
    if (oldParent == newParent) {
      return;
    }
    if (oldParent) {
      oldParent.remove(this.child);
    }
    if (newParent) {
      newParent.add(this.child);
    }
  }

  private child: Item;
  protected _value: FK | undefined;

  constructor(child: Item) {
    this.child = child;
  }

  get value(): FK | undefined {
    return this._value;
  }

  set value(newValue: FK | undefined) {
    this.setForeignKey(newValue);
  }

  abstract areForeignKeysEqual(firstForeignKey: FK | undefined, secondForeignKey: FK | undefined): boolean;

  abstract getCollectionByForeignKey(foreignKey: FK | undefined): Collection | undefined;
}
