import { ActiveTrait } from 'engine/core/trait';
import type { HearingLevel } from 'engine/modules/hearing';

export abstract class HearableTrait extends ActiveTrait<HearableTrait, HearingLevel> {}
