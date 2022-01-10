import type { NarrationSequenceStage } from './narration-sequence-stage';

export class NarrationSequence {
  readonly title: string | undefined;
  readonly checkpointStage: NarrationSequenceStage;

  constructor({ title, checkpointStage }: { title?: string; checkpointStage: NarrationSequenceStage }) {
    this.title = title;
    this.checkpointStage = checkpointStage;
  }
}
