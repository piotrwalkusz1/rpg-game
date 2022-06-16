import { ActionExecutedEvent } from '../action';
import type { ECSEvent } from '../ecs';
import { GameEngine, GameSystem } from '../game';
import { CommandExecutor } from './command-executor';
import type { CommandService } from './command-service';

export class CommandSystem extends GameSystem {
  constructor(private commandService: CommandService) {
    super();
  }

  override async processEvent(event: ECSEvent, engine: GameEngine): Promise<void> {
    if (event instanceof ActionExecutedEvent) {
      const commandExecutor = event.executor.getComponent(CommandExecutor);
      if (commandExecutor) {
        this.commandService.continueCommand(commandExecutor, engine);
      }
    }
  }
}
