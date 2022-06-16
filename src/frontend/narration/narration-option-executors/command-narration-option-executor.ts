import { CommandService } from 'engine/core/command';
import { GameService } from 'frontend/game';
import type { GameStore } from 'frontend/store/game-store';
import type { Type } from 'utils';
import { NarrationOptionExecutor } from '../narration-option-executor';
import { CommandNarrationOption } from '../narration-options';

export class CommandNarrationOptionExecutor extends NarrationOptionExecutor<CommandNarrationOption> {
  override get narrationOptionType(): Type<CommandNarrationOption> {
    return CommandNarrationOption;
  }

  override async execute(narrationOption: CommandNarrationOption, store: GameStore): Promise<void> {
    CommandService.scheduleCommand(narrationOption.command, store.getPlayer().commandExecutor, store.getEngine());
    await GameService.processEvents(store);
  }
}
