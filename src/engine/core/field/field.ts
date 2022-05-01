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
  imageUrl: string | undefined = undefined;

  constructor(params?: { position?: FieldPosition; imageUrl?: string }) {
    super();
    if (params?.position) {
      this.position = params.position;
    }
    if (params?.imageUrl) {
      this.imageUrl = params.imageUrl;
    }
  }

  get position(): FieldPosition | undefined {
    return this.positionFK.value;
  }

  set position(position: FieldPosition | undefined) {
    this.positionFK.value = position;
  }

  get parentField(): Field | undefined {
    return this.position?.parentField;
  }

  getSubFields(): readonly Field[] {
    return this.subFields.getArray();
  }

  getRectSubFields(): readonly Field[][] {
    const fields: Field[][] = [];
    for (const field of this.getSubFields()) {
      if (field.position instanceof RectFieldPosition) {
        fields[field.position.y] = fields[field.position.y] || [];
        fields[field.position.y][field.position.x] = field;
      }
    }
    return fields;
  }

  addSubField(field: Field): void {
    this.subFields.add(field);
  }
}
