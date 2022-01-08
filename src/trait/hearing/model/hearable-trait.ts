import { ActiveTrait } from '../../model/active-trait';
import type { HearingLevel } from './hearing-level';

export abstract class HearableTrait extends ActiveTrait<HearableTrait, HearingLevel> {}
