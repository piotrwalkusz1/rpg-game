import type { Action } from 'engine/core/action';
import { Command } from 'engine/core/command';
import type { FieldObjectPosition } from 'engine/core/field';
import { MoveAction } from './move-action';

export class MoveCommand extends Command {
  private nextIndex = 0;

  constructor(readonly path: FieldObjectPosition[]) {
    super();
  }

  override getNextAction(): Action | undefined {
    const nextPosition: FieldObjectPosition | undefined = this.path[this.nextIndex];
    if (!nextPosition) {
      return undefined;
    }
    this.nextIndex++;
    return new MoveAction({ position: nextPosition });
  }
}
