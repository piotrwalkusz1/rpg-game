import type { NarrationDescription } from '../../narration/model/narration-description';

export type ActionScheduleResult =
  | { type: 'SUCCESS' }
  | { type: 'CANNOT_EXECUTE' }
  | {
      type: 'PREVENTION';
      description: NarrationDescription;
    };
