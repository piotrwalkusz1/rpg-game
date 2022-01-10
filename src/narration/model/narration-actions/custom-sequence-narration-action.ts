import type { TranslatableText } from '../../../i18n/translatable-text';
import { NarrationActionOrder } from '../narration-action-order';
import type { NarrationSequence } from '../narration-sequence/narration-sequence';
import type { NarrationSequenceStage } from '../narration-sequence/narration-sequence-stage';
import { SequenceNarrationAction } from './sequence-narration-action';

export class CustomSequenceNarrationAction extends SequenceNarrationAction {
  private readonly narrationSequence: NarrationSequence;
  private readonly narrationSequenceStages: NarrationSequenceStage[];
  private readonly baseName: TranslatableText;
  private readonly nameContext?: TranslatableText;

  constructor({
    narrationSequence,
    narrationSequenceStages,
    name,
    nameContext
  }: {
    narrationSequence: NarrationSequence;
    narrationSequenceStages?: NarrationSequenceStage[];
    name: TranslatableText;
    nameContext?: TranslatableText;
  }) {
    super();
    this.narrationSequence = narrationSequence;
    this.narrationSequenceStages = narrationSequenceStages || narrationSequence.checkpointStages;
    this.baseName = name;
    this.nameContext = nameContext;
  }

  get order(): NarrationActionOrder {
    return NarrationActionOrder.CUSTOM;
  }

  protected override getBaseName(): TranslatableText {
    return this.baseName;
  }

  protected override getNameContext(): TranslatableText | undefined {
    return this.nameContext;
  }

  protected override getNarrationSequenceStages(): NarrationSequenceStage[] {
    return this.narrationSequenceStages;
  }

  protected override getNarrationSequence(): NarrationSequence {
    return this.narrationSequence;
  }
}
