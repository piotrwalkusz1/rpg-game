import { ActionService } from 'engine/core/action';
import { Command, SimpleCommand } from 'engine/core/command';
import { FieldObjectPosition, getField, hasField } from 'engine/core/field';
import { FieldService } from 'engine/core/field/field-service';
import { Player } from 'engine/core/game';
import { MoveAction, MoveCommand } from 'engine/modules/movement';
import { notEmpty } from 'utils';
import { CommandNarrationOption } from '../narration-options/command-narration-option';
import { FieldNarrationContext } from '../narration-contexts/field-narration-context';
import type { NarrationOption } from '../narration-option';
import { NarrationProvider, NarrationProviderParams } from '../narration-provider';

export class MovementNarrationProvider extends NarrationProvider {
  override getNarrationOptions({ context, engine }: NarrationProviderParams): NarrationOption[] {
    if (!(context instanceof FieldNarrationContext)) {
      return [];
    }
    const player = engine.requireComponent(Player);
    const action = new MoveAction({ position: new FieldObjectPosition(context.field) });
    if (ActionService.canExecuteAction(action, player, engine)) {
      return this.prepareNarrationOptions(new SimpleCommand(action));
    }
    const path = hasField(player) ? FieldService.getPathBetweenRectFields(getField(player), context.field)?.slice(1) : undefined;
    if (notEmpty(path)) {
      return this.prepareNarrationOptions(new MoveCommand(path));
    }
    return [];
  }

  private prepareNarrationOptions(command: Command): NarrationOption[] {
    return [new CommandNarrationOption({ name: 'COMMAND.MOVE.NAME', image: '/images/ui/move-command.svg', command })];
  }
}
