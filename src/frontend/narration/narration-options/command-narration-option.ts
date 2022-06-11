import { Command, CommandService } from 'engine/core/command';
import type { Image } from 'engine/core/resources/image';
import { getPlayer } from 'game';
import type { TranslatableText } from 'i18n/translatable-text';
import { NarrationOption, NarrationOptionParams } from '../narration-option';

export class CommandNarrationOption extends NarrationOption {
  readonly command: Command;

  constructor({ name, image, command }: { name: TranslatableText; image: Image; command: Command }) {
    super({ name, image });
    this.command = command;
  }

  override async onClick({ engine, processEvents }: NarrationOptionParams): Promise<void> {
    CommandService.scheduleCommand(this.command, getPlayer(engine).commandExecutor, engine);
    await processEvents();
  }
}
