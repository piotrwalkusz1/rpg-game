import type { CommandExecutor } from 'engine/core/command';
import type { Engine } from 'engine/core/ecs';
import type { Field } from 'engine/core/field';
import type { CommandHint } from './command-hint';

export type CommandHintProviderParams = { engine: Engine; executor: CommandExecutor; field?: Field };

export abstract class CommandHintProvider {
  abstract getCommandsHints(params: CommandHintProviderParams): CommandHint[];
}
