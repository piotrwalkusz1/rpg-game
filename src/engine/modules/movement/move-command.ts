import type { Action } from 'engine/core/action';
import { Command } from 'engine/core/command';
import { Field, FieldObjectPosition } from 'engine/core/field';
import { MoveAction } from './move-action';

export class MoveCommand extends Command {
  private nextIndex = 0;

  constructor(readonly path: Field[]) {
    super();
  }

  override getNextAction(): Action | undefined {
    const nextField: Field | undefined = this.path[this.nextIndex];
    if (!nextField) {
      return undefined;
    }
    this.nextIndex++;
    return new MoveAction({ position: new FieldObjectPosition(nextField) });
  }
}
