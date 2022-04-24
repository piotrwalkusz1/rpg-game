import { Component } from 'engine/core/ecs';
import { FieldObjectsCollection } from 'engine/core/field/field-object';
import { FieldObjectPosition } from 'engine/core/field/field-object-position';
import { FieldPosition, RectFieldPosition } from 'engine/core/field/field-position';
import { areSame, OneToManyCollection, OneToManyForeignKey } from 'utils';

class SubFieldsCollection extends OneToManyCollection<Field, FieldPosition> {
  override getForeignKey = (field: Field) => field.positionFK;
}

class FieldPositionFK extends OneToManyForeignKey<Field, SubFieldsCollection, FieldPosition> {
  override getCollection = (position: FieldPosition | undefined) => position?.parentField?.subFields;
  override areForeignKeysEqual = areSame;
}

export class Field extends Component {
  readonly positionFK: FieldPositionFK = new FieldPositionFK(this);
  readonly subFields: SubFieldsCollection = new SubFieldsCollection(new RectFieldPosition(this, 0, 0));
  readonly objects: FieldObjectsCollection = new FieldObjectsCollection(new FieldObjectPosition(this));

  get position(): FieldPosition | undefined {
    return this.positionFK.value;
  }

  get parentField(): Field | undefined {
    return this.position?.parentField;
  }
}
