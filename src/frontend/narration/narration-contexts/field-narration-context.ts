import type { Field } from 'engine/core/field';
import { NarrationContext } from '../narration-context';

export class FieldNarrationContext extends NarrationContext {
  constructor(readonly field: Field) {
    super();
  }
}
