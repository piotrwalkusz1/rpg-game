import { ArrayUtils } from '../../common/array-utils';
import type { ActiveTrait } from '../model/active-trait';
import type { Trait } from '../model/trait';
import type { TraitOwner } from '../model/trait-owner';

export namespace TraitService {
  export const resolveTraits = <T extends Trait, V, R>(
    activeTraitOwner: TraitOwner,
    passiveTraitOwner: TraitOwner,
    activeTraitType: abstract new () => ActiveTrait<T, V>,
    passiveTraitType: abstract new () => T,
    reducer: (values: V[]) => R
  ): R => {
    const activeTraits = ArrayUtils.filterInstanceOf(activeTraitOwner.traits, activeTraitType);
    const passiveTraits = ArrayUtils.filterInstanceOf(passiveTraitOwner.traits, passiveTraitType);
    const values = activeTraits.flatMap((activeTrait) => passiveTraits.map((passiveTrait) => activeTrait.getValue(passiveTrait)));
    return reducer(values);
  };

  export const getTrait = <T extends Trait>(traitOwner: TraitOwner, traitType: abstract new () => T): T | undefined => {
    return ArrayUtils.filterInstanceOf(traitOwner.traits, traitType)[0];
  };
}
