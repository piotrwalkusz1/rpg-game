import type { Condition } from 'engine/core/ecs';
import { FieldService } from './field-service';
import { FieldProvider, tryGetField } from './field-utils';

export class AreFieldsConnected implements Condition {
  constructor(private readonly fieldsProviders: [FieldProvider, FieldProvider]) {}

  check(): boolean {
    const firstField = tryGetField(this.fieldsProviders[0]);
    const secondField = tryGetField(this.fieldsProviders[1]);
    return firstField && secondField ? FieldService.getConnectedFields(firstField).includes(secondField) : false;
  }
}
