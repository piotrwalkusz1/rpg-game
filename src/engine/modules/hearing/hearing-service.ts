import { TraitOwner, TraitService } from 'engine/core/trait';
import { HearableTrait, HearerTrait, HearingLevel } from 'engine/modules/hearing';

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
