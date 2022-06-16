import { Action, ActionExecutedEvent, ActionExecutor } from 'engine/core/action';
import { CommandExecutor, CommandService, CommandSystem } from 'engine/core/command';
import { GameEngine } from 'engine/core/game';
import { IMock, It, Mock, Times } from 'typemoq';

describe('CommandSystem', () => {
  let commandServiceMock: IMock<CommandService>;
  let commandSystem: CommandSystem;
  let engine: GameEngine;

  beforeEach(() => {
    commandServiceMock = Mock.ofType<CommandService>();
    commandSystem = new CommandSystem(commandServiceMock.object);
    engine = new GameEngine();
  });

  describe('processEvent', () => {
    it('should continue command if command executor executed action', async () => {
      const commandExecutor = CommandExecutor.create(engine);
      const event = new ActionExecutedEvent({
        action: Mock.ofType<Action>().object,
        executor: commandExecutor.actionExecutor,
        time: engine.time
      });
      commandServiceMock.setup((instance) => instance.continueCommand(commandExecutor, engine)).verifiable(Times.once());

      await commandSystem.processEvent(event, engine);

      commandServiceMock.verifyAll();
    });

    it('should do nothing if action executor is not command executor', async () => {
      const actionExecutor = engine.addEntityWithComponent(new ActionExecutor());
      const event = new ActionExecutedEvent({
        action: Mock.ofType<Action>().object,
        executor: actionExecutor,
        time: engine.time
      });

      await commandSystem.processEvent(event, engine);

      commandServiceMock.verify((instance) => instance.continueCommand(It.isAny(), It.isAny()), Times.never());
    });
  });
});
