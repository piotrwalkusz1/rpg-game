import { EntityProvider } from '../ecs';
import { CommandExecutor } from './command-executor';

export namespace CommandUtils {
  export const isCommandPending = (entityProvider: EntityProvider): boolean => {
    return EntityProvider.getComponent(entityProvider, CommandExecutor)?.pendingCommand !== undefined;
  };
}
