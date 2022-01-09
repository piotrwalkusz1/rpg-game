export abstract class OneToManyCollection<Item, FK> {
  private readonly items: Item[] = [];

  constructor(private readonly defaultForeignKey: FK) {}

  add(item: Item) {
    if (this.items.includes(item)) {
      return;
    }
    this.items.push(item);
    if (this.getCollection(item) !== this) {
      this.setForeignKey(item, this.defaultForeignKey);
    }
  }

  remove(item: Item) {
    const itemIndex = this.items.findIndex((otherItem) => otherItem === item);
    if (itemIndex === -1) {
      return;
    }
    this.items.splice(itemIndex, 1);
    if (this.getCollection(item) === this) {
      this.setForeignKey(item, undefined);
    }
  }

  getArray(): readonly Item[] {
    return this.items;
  }

  get(index: number): Item {
    return this.items[index];
  }

  get length(): number {
    return this.items.length;
  }

  private getCollection(item: Item): OneToManyCollection<Item, FK> | undefined {
    const foreignKey = this.getForeignKey(item);
    return foreignKey.getCollection(foreignKey.value);
  }

  private setForeignKey(item: Item, foreignKey: FK | undefined) {
    this.getForeignKey(item).value = foreignKey;
  }

  abstract getForeignKey(item: Item): OneToManyForeignKey<Item, OneToManyCollection<Item, FK>, FK>;
}

export abstract class OneToManyForeignKey<Item, Collection extends OneToManyCollection<Item, FK>, FK> {
  protected _value: FK | undefined;

  constructor(private readonly item: Item) {}

  get value(): FK | undefined {
    return this._value;
  }

  set value(newForeignKey: FK | undefined) {
    const oldForeignKey = this._value;
    if (this.areForeignKeysEqual(oldForeignKey, newForeignKey)) {
      return;
    }
    this._value = newForeignKey;
    const oldCollection = this.getCollection(oldForeignKey);
    const newCollection = this.getCollection(newForeignKey);
    if (oldCollection === newCollection) {
      return;
    }
    oldCollection?.remove(this.item);
    newCollection?.add(this.item);
  }

  abstract areForeignKeysEqual(firstForeignKey: FK | undefined, secondForeignKey: FK | undefined): boolean;

  abstract getCollection(foreignKey: FK | undefined): Collection | undefined;
}
