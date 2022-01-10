import type { TranslatableText } from '../../../i18n/translatable-text';
import { NarrationActionOrder } from '../narration-action-order';
import type { NarrationSequence } from '../narration-sequence/narration-sequence';
import type { NarrationSequenceStage } from '../narration-sequence/narration-sequence-stage';
import { SequenceNarrationAction } from './sequence-narration-action';

export class CustomSequenceNarrationAction extends SequenceNarrationAction {
  private readonly narrationSequence: NarrationSequence;
  private readonly narrationSequenceStage: NarrationSequenceStage;
  private readonly name: TranslatableText;

  constructor({
    narrationSequence,
    narrationSequenceStage,
    name
  }: {
    narrationSequence: NarrationSequence;
    narrationSequenceStage?: NarrationSequenceStage;
    name: TranslatableText;
  }) {
    super();
    this.narrationSequence = narrationSequence;
    this.narrationSequenceStage = narrationSequenceStage || narrationSequence.checkpointStage;
    this.name = name;
  }

  get order(): NarrationActionOrder {
    return NarrationActionOrder.CUSTOM;
  }

  protected override getBaseName(): TranslatableText {
    return this.name;
  }

  protected override getNarrationSequenceStage(): NarrationSequenceStage {
    return this.narrationSequenceStage;
  }

  protected override getNarrationSequence(): NarrationSequence {
    return this.narrationSequence;
  }
}
