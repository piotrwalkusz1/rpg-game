import { ActionService } from 'engine/core/action';
import { SimpleCommand } from 'engine/core/command';
import { FieldObjectPosition } from 'engine/core/field';
import { MoveAction } from 'engine/modules/movement';
import { CommandHint } from '../command-hint';
import { CommandHintProvider, CommandHintProviderParams } from '../command-hint-provider';

export class MovementCommandHintProvider extends CommandHintProvider {
  override getCommandsHints({ engine, executor, field }: CommandHintProviderParams): CommandHint[] {
    if (!field) {
      return [];
    }
    const action = new MoveAction({ position: new FieldObjectPosition(field) });
    if (!ActionService.canExecuteAction(action, executor, engine)) {
      return [];
    }
    return [
      new CommandHint({ command: new SimpleCommand(action), name: 'COMMAND.MOVE.NAME', imageUrl: '/images/ui/move-command.svg', field })
    ];
  }
}
