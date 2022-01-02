import type { NarrationDescription } from '../../narration/model/narration-description';

export type ActionExecutionResult =
  | { type: 'SUCCESS' }
  | {
      type: 'PREVENTION';
      description: NarrationDescription;
    };
