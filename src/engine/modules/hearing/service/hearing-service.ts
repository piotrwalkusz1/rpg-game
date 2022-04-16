import type { TraitOwner } from '../../../core/trait/model/trait-owner';
import { TraitService } from '../../../core/trait/service/trait-service';
import { HearableTrait } from '../model/hearable-trait';
import { HearerTrait } from '../model/hearer-trait';
import { HearingLevel } from '../model/hearing-level';

export namespace HearingService {
  export const canTalk = (firstTraitOwner: TraitOwner, secondTraitOwner: TraitOwner): boolean => {
    return (
      getHearingLevel(firstTraitOwner, secondTraitOwner) >= HearingLevel.TALK &&
      getHearingLevel(secondTraitOwner, firstTraitOwner) >= HearingLevel.TALK
    );
  };

  export const getHearingLevel = (hearbale: TraitOwner, hearer: TraitOwner): HearingLevel => {
    return TraitService.resolveTraits(hearbale, hearer, HearableTrait, HearerTrait, (hearingLevels) =>
      Math.max(HearingLevel.NONE, ...hearingLevels)
    );
  };
}
