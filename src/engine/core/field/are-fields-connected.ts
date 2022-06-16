import type { Condition } from '../condition';
import type { Field } from './field';
import { FieldProvider, tryGetField } from './field-utils';

export class AreFieldsConnected implements Condition {
  readonly fields: [Field | undefined, Field | undefined];

  constructor(fieldsProviders: [FieldProvider, FieldProvider]) {
    this.fields = [tryGetField(fieldsProviders[0]), tryGetField(fieldsProviders[1])];
  }
}
