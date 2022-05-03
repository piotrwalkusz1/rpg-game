import { Component } from 'engine/core/ecs';
import type { FieldDefinition } from 'engine/core/field/field-definition';
import { FieldObjectsCollection } from 'engine/core/field/field-object';
import { FieldObjectPosition } from 'engine/core/field/field-object-position';
import { FieldPosition, RectFieldPosition } from 'engine/core/field/field-position';
import type { TranslatableText } from 'i18n/translatable-text';
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
  readonly definition: FieldDefinition;

  constructor({ definition, position }: { definition: FieldDefinition; position?: FieldPosition }) {
    super();
    this.definition = definition;
    this.position = position;
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

  get imageUrl(): string | undefined {
    return this.definition.imageUrl;
  }

  get name(): TranslatableText {
    return this.definition.name;
  }

  get description(): TranslatableText | undefined {
    return this.definition.description;
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

  get siblings(): readonly Field[] {
    return this.parentField?.getSubFields()?.filter((field) => field !== this) || [];
  }
}
