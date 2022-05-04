import { ActionService } from 'engine/core/action';
import { Command, SimpleCommand } from 'engine/core/command';
import { Field, FieldObjectPosition, getField, hasField } from 'engine/core/field';
import { FieldService } from 'engine/core/field/field-service';
import { MoveAction, MoveCommand } from 'engine/modules/movement';
import { notEmpty } from 'utils';
import { CommandHint } from '../command-hint';
import { CommandHintProvider, CommandHintProviderParams } from '../command-hint-provider';

export class MovementCommandHintProvider extends CommandHintProvider {
  override getCommandsHints({ engine, executor, field }: CommandHintProviderParams): CommandHint[] {
    if (!field) {
      return [];
    }
    const action = new MoveAction({ position: new FieldObjectPosition(field) });
    if (ActionService.canExecuteAction(action, executor, engine)) {
      return this.prepareCommandsHints(new SimpleCommand(action), field);
    }
    const path = hasField(executor) ? FieldService.getPathBetweenRectFields(getField(executor), field)?.slice(1) : undefined;
    if (notEmpty(path)) {
      return this.prepareCommandsHints(new MoveCommand(path), field);
    }
    return [];
  }

  private prepareCommandsHints(command: Command, field: Field): CommandHint[] {
    return [new CommandHint({ command, name: 'COMMAND.MOVE.NAME', imageUrl: '/images/ui/move-command.svg', field })];
  }
}
