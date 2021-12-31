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

export abstract class OneToManyCollection<Item, FK> {
  private readonly items: Item[] = [];

  add(item: Item) {
    if (this.items.includes(item)) {
      return;
    }
    this.items.push(item);
    if (this.getCollectionByItem(item) !== this) {
      const foreignKey = this.prepareForeignKey();
      this.setForeignKey(item, foreignKey);
    }
  }
  remove(item: Item) {
    const itemIndex = this.items.findIndex((otherItem) => otherItem === item);
    if (itemIndex === -1) {
      return;
    }
    this.items.splice(itemIndex, 1);
    if (this.getCollectionByItem(item) === this) {
      this.setForeignKey(item, undefined);
    }
  }

  abstract getCollectionByItem(item: Item): OneToManyCollection<Item, FK> | undefined;

  abstract prepareForeignKey(): FK;

  abstract setForeignKey(item: Item, foreignKey: FK | undefined): void;
}

export abstract class OneToManyForeignKey<Item, Collection extends OneToManyCollection<Item, FK>, FK> {
  setForeignKey(newForeignKey: FK | undefined) {
    const oldForeignKey = this._value;
    if (this.areForeignKeysEqual(oldForeignKey, newForeignKey)) {
      return;
    }
    this._value = newForeignKey;
    const oldCollection = this.getCollectionByForeignKey(oldForeignKey);
    const newCollection = this.getCollectionByForeignKey(newForeignKey);
    if (oldCollection == newCollection) {
      return;
    }
    oldCollection?.remove(this.item);
    newCollection?.add(this.item);
  }

  private item: Item;
  protected _value: FK | undefined;

  constructor(child: Item) {
    this.item = child;
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
