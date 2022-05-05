import { Command, CommandExecutor, CommandService } from 'engine/core/command';
import type { Engine } from 'engine/core/ecs';
import { Player } from 'engine/core/game';
import { GameService } from 'frontend/game/game-service';
import type { Image } from 'frontend/image';
import type { TranslatableText } from 'i18n/translatable-text';
import { NarrationOption } from '../narration-option';

export class CommandNarrationOption extends NarrationOption {
  readonly command: Command;

  constructor({ name, image, command }: { name: TranslatableText; image: Image; command: Command }) {
    super({ name, image });
    this.command = command;
  }

  override async onClick(engine: Engine): Promise<void> {
    CommandService.scheduleCommand(this.command, engine.requireComponent(Player).requireComponent(CommandExecutor), engine);
    await GameService.processEvents(engine);
  }
}
