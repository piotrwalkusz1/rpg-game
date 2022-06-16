import type { Type } from 'utils';
import { ConditionChecker } from '../condition';
import { AreFieldsConnected } from './are-fields-connected';
import { FieldService } from './field-service';

export class AreFieldsConnectedChecker extends ConditionChecker<AreFieldsConnected> {
  override get conditionType(): Type<AreFieldsConnected> {
    return AreFieldsConnected;
  }

  override check(condition: AreFieldsConnected): boolean {
    return condition.fields[0] && condition.fields[1]
      ? FieldService.getConnectedFields(condition.fields[0]).includes(condition.fields[1])
      : false;
  }
}
