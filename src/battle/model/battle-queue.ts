import { ArrayUtils } from '../../common/array-utils';
import type { BattleParticipant } from './battle-participant';

export class BattleQueue {
  private readonly participants: readonly BattleParticipant[];
  private _queue: BattleParticipant[];

  constructor(participants: readonly BattleParticipant[]) {
    this.participants = participants;
    this._queue = this.getNewQueue();
  }

  get length(): number {
    return this.queue.length;
  }

  get queue(): readonly BattleParticipant[] {
    return this._queue;
  }

  pop(): BattleParticipant | undefined {
    return this._queue.shift();
  }

  recreateQueue(): void {
    this._queue = this.getNewQueue();
  }

  refreshQueue(): void {
    this._queue = this.filterQueue(this._queue);
  }

  private getNewQueue(): BattleParticipant[] {
    return ArrayUtils.getShuffledArray(this.filterQueue(this.participants));
  }

  private filterQueue(queue: readonly BattleParticipant[]): BattleParticipant[] {
    return queue.filter((participant) => participant.canStillFight());
  }
}
