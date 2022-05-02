import type { Condition } from 'engine/core/ecs';
import { FieldProvider } from 'engine/core/field/field-provider';
import type { Field } from './field';
import { FieldService } from './field-service';

export class AreFieldsConnected implements Condition {
  constructor(private readonly fieldsProviders: [FieldProvider, FieldProvider]) {}

  check(): boolean {
    const firstField: Field | undefined = FieldProvider.getField(this.fieldsProviders[0]);
    const secondField: Field | undefined = FieldProvider.getField(this.fieldsProviders[1]);
    return firstField && secondField ? FieldService.getConnectedFields(firstField).includes(secondField) : false;
  }
}
