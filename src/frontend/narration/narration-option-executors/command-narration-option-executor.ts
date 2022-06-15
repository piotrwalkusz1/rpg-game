import { CommandService } from 'engine/core/command';
import { GameService } from 'frontend/game';
import type { GameStore } from 'frontend/store/game-store';
import { getPlayer } from 'game';
import type { Type } from 'moq.ts/lib/static.injector/type';
import { NarrationOptionExecutor } from '../narration-option-executor';
import { CommandNarrationOption } from '../narration-options';

export class CommandNarrationOptionExecutor extends NarrationOptionExecutor<CommandNarrationOption> {
  override get narrationOptionType(): Type<CommandNarrationOption> {
    return CommandNarrationOption;
  }

  override async execute(narrationOption: CommandNarrationOption, store: GameStore): Promise<void> {
    const engine = store.engine;
    CommandService.scheduleCommand(narrationOption.command, getPlayer(engine).commandExecutor, engine);
    await GameService.processEvents(store);
  }
}
