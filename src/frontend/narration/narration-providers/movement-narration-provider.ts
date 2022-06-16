import type { ActionService } from 'engine/core/action';
import { Command, SimpleCommand } from 'engine/core/command';
import { FieldObjectPosition, getField, hasField } from 'engine/core/field';
import { FieldService } from 'engine/core/field/field-service';
import { MoveAction, MoveCommand } from 'engine/modules/movement';
import { getPlayer } from 'game';
import { notEmpty } from 'utils';
import { FieldNarrationContext } from '../narration-contexts/field-narration-context';
import type { NarrationOption } from '../narration-option';
import { CommandNarrationOption } from '../narration-options/command-narration-option';
import { NarrationProvider, NarrationProviderParams } from '../narration-provider';

export class MovementNarrationProvider extends NarrationProvider {
  constructor(private actionService: ActionService) {
    super();
  }

  override getNarrationOptions({ context, engine }: NarrationProviderParams): NarrationOption[] {
    if (!(context instanceof FieldNarrationContext)) {
      return [];
    }
    const player = getPlayer(engine);
    const action = new MoveAction({ position: new FieldObjectPosition(context.field) });
    if (this.actionService.canExecuteAction(action, player.actionExecutor, engine)) {
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
