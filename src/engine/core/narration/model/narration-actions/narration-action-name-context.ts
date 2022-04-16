import type { TranslatableText } from '../../../../../i18n/translatable-text';
import { Actor } from '../../../actor/model/actor';
import type { MapLocation } from '../../../map/model/map-location';
import { TerrainObject } from '../../../map/model/terrain-object';

export type NarrationActionNameContext = Actor | TerrainObject | MapLocation;

export namespace NarrationActionNameContext {
  export const getName = (nameContext: NarrationActionNameContext): TranslatableText => {
    if (nameContext instanceof Actor) {
      return nameContext.displayName;
    } else if (nameContext instanceof TerrainObject) {
      return nameContext.name;
    } else {
      return nameContext.name;
    }
  };
}
