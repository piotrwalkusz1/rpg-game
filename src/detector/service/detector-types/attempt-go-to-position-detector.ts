import { GoActionScheduledEvent } from '../../../action/model/actions/go-action';
import type { MapField } from '../../../map/model/map-field';
import type { Position } from '../../../map/model/position';
import { FieldPosition, TerrainObjectPosition } from '../../../map/model/position';
import type { TerrainObject } from '../../../map/terrain-object/model/terrain-object';
import type { TerrainObjectPlacement } from '../../../map/terrain-object/model/terrain-object-placement';
import type { DetectableEvent } from '../../model/detectable-event';
import { DetectorType } from '../../model/detector-type';

export class AttemptGoToPositionDetector extends DetectorType<GoActionScheduledEvent> {
  readonly positionChecker: (position: Position) => boolean;

  constructor(
    args:
      | { field: MapField }
      | {
          terrainObject: TerrainObject;
          terrainObjectPlacement?: TerrainObjectPlacement;
        }
      | {
          terrainObject: TerrainObject;
          terrainObjectPlacementOtherThanDefault: true;
        }
  ) {
    super();
    if ('terrainObject' in args) {
      if ('terrainObjectPlacementOtherThanDefault' in args) {
        this.positionChecker = (position) =>
          position instanceof TerrainObjectPosition &&
          position.terrainObject === args.terrainObject &&
          position.placement !== args.terrainObject.type.defaultCharacterPlacement;
      } else {
        this.positionChecker = (position) =>
          position instanceof TerrainObjectPosition &&
          position.terrainObject === args.terrainObject &&
          (!args.terrainObjectPlacement || position.placement === args.terrainObjectPlacement);
      }
    } else {
      this.positionChecker = (position) => position instanceof FieldPosition && position.field === args.field;
    }
  }

  override check(detectableEvent: DetectableEvent): GoActionScheduledEvent | undefined {
    if (detectableEvent instanceof GoActionScheduledEvent && this.positionChecker(detectableEvent.newPosition)) {
      return detectableEvent;
    }
  }
}