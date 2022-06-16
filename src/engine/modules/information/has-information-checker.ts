import { ConditionChecker } from 'engine/core/condition';
import type { Type } from 'utils';
import { HasInformation, InformationOwner } from '.';

export class HasInformationChecker extends ConditionChecker<HasInformation> {
  override get conditionType(): Type<HasInformation> {
    return HasInformation;
  }

  override check(condition: HasInformation): boolean {
    return condition.entity.getComponent(InformationOwner)?.hasInformation(condition.information) === true;
  }
}
