import type { MapLocation } from '../../../map/model/map-location';
import { SeeLocationNarrationAction } from '../../model/narration-actions/see-location-narration-action';
import type { NarrationProvider } from '../../model/narration-provider/narration-provider';
import type { NarrationProviderResult } from '../../model/narration-provider/narration-provider-result';

export namespace LocationNarrationProvider {
  export const create =
    (location: MapLocation): NarrationProvider =>
    ({ trigger }): NarrationProviderResult | undefined => {
      if (trigger.type !== 'SELECTED_FIELD' || !trigger.field.subLocations.getArray().includes(location)) {
        return;
      }
      return {
        actions: [new SeeLocationNarrationAction(location)]
      };
    };
}
