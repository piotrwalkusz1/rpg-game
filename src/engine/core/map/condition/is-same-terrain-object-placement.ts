import type { Condition, Entity } from 'engine/core/ecs';
import { EntityProvider, getEntities } from 'engine/core/ecs/model/entity-provider';
import { PositionComponent } from 'engine/core/map/component/position-component';
import { Position, TerrainObjectPosition } from 'engine/core/map/model/position';

export class IsSameTerrainObjectPlacement implements Condition {
  constructor(private readonly entitiesProviders: EntityProvider[]) {}

  check(): boolean {
    const entities: Entity[] = getEntities(this.entitiesProviders);
    if (this.entitiesProviders.length !== entities.length || entities.length < 2) {
      return true;
    }

    const position: Position | undefined = PositionComponent.getPosition(entities[0]);
    if (!(position instanceof TerrainObjectPosition)) {
      return false;
    }

    for (let i = 1; i < entities.length; i++) {
      const otherPosition: Position | undefined = PositionComponent.getPosition(entities[i]);
      if (!Position.areEqual(position, otherPosition)) {
        return false;
      }
    }

    return true;
  }
}
