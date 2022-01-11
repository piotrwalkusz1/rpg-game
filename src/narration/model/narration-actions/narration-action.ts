import type { TranslatableText } from '../../../i18n/translatable-text';
import { NarrationActionOrder } from '../narration-action-order';
import type { NarrationSequence } from '../narration-sequence/narration-sequence';
import type { NarrationSequenceStage } from '../narration-sequence/narration-sequence-stage';
import { NarrationActionNameContext } from './narration-action-name-context';

export class NarrationAction {
  readonly name: TranslatableText;
  readonly order: NarrationActionOrder;
  readonly narrationSequence: NarrationSequence;
  readonly narrationStages: NarrationSequenceStage[];

  constructor({
    name,
    nameContext,
    order,
    narrationSequence,
    narrationStages
  }: {
    name: TranslatableText;
    nameContext?: NarrationActionNameContext;
    order?: NarrationActionOrder;
    narrationSequence: NarrationSequence;
    narrationStages?: NarrationSequenceStage[];
  }) {
    this.name = nameContext
      ? (tc) => tc.join([{ literal: '[' }, NarrationActionNameContext.getName(nameContext), { literal: '] ' }, name])
      : name;
    this.order = order || NarrationActionOrder.CUSTOM;
    this.narrationSequence = narrationSequence;
    this.narrationStages = narrationStages || narrationSequence.checkpointStages;
  }
}
