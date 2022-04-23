import { Component, Entity } from 'engine/core/ecs';
import { Position } from 'engine/core/map/model/position';
import { OneToManyCollection, OneToManyForeignKey } from 'utils/cache-relationship-utils';

export class PositionComponentsCollection extends OneToManyCollection<PositionComponent, Position> {
  override getForeignKey = (positionComponent: PositionComponent) => positionComponent.positionFK;
}

class PositionFK extends OneToManyForeignKey<PositionComponent, PositionComponentsCollection, Position> {
  override getCollection = (position: Position | undefined) => position?.positionComponents;
  override areForeignKeysEqual = Position.areEqual;
}

export class PositionComponent extends Component {
  readonly positionFK: PositionFK = new PositionFK(this);

  getPosition(): Position | undefined {
    return this.positionFK.value;
  }

  setPosition(position: Position): void {
    this.positionFK.value = position;
  }

  static getPosition(entity: Entity): Position | undefined {
    return entity.getComponent(PositionComponent)?.getPosition();
  }
}
