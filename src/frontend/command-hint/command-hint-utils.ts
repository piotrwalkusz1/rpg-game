import type { CommandHint } from './command-hint';
import type { CommandHintProvider, CommandHintProviderParams } from './command-hint-provider';

export namespace CommandHintUtils {
  export const getCommandsHints = (providers: CommandHintProvider[], params: CommandHintProviderParams): CommandHint[] => {
    return providers.flatMap((provider) => provider.getCommandsHints(params));
  };
}
