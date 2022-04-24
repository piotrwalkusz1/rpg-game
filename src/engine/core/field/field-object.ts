import { Component } from 'engine/core/ecs';
import { FieldObjectPosition } from 'engine/core/field/field-object-position';
import { OneToManyCollection, OneToManyForeignKey } from 'utils';

export class FieldObjectsCollection extends OneToManyCollection<FieldObject, FieldObjectPosition> {
  override getForeignKey = (fieldObject: FieldObject) => fieldObject.positionFK;
}

class FieldObjectPositionFK extends OneToManyForeignKey<FieldObject, FieldObjectsCollection, FieldObjectPosition> {
  override getCollection = (position: FieldObjectPosition | undefined) => position?.field?.objects;
  override areForeignKeysEqual = FieldObjectPosition.areEqual;
}

export class FieldObject extends Component {
  readonly positionFK: FieldObjectPositionFK = new FieldObjectPositionFK(this);

  get position(): FieldObjectPosition | undefined {
    return this.positionFK.value;
  }

  set position(position: FieldObjectPosition | undefined) {
    this.positionFK.value = position;
  }
}
