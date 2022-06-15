import { CDIContainer } from 'cdi-container';
import { addSeconds } from 'date-fns';
import { BeforeActionExecutingEvent, PendingAction } from 'engine/core/action';
import { CommandEndedEvent } from 'engine/core/command';
import type { GameEngine } from 'engine/core/game';
import { AttackAction } from 'engine/modules/attack';
import { BattleActivity } from 'engine/modules/battle';
import type { Character } from 'engine/modules/character';
import { GameService } from 'frontend/game';
import type { GameStore } from 'frontend/store/game-store';
import { GameStoreService } from 'frontend/store/game-store-service';
import { GameBuilder, getPlayer } from 'game';
import { MockAction } from 'test/mock/mock-action';
import { MockCommand } from 'test/mock/mock-command';

describe('AI', () => {
  let cdiContainer: CDIContainer;
  let engine: GameEngine;
  let character: Character;
  let store: GameStore;

  beforeEach(() => {
    cdiContainer = CDIContainer.default();
    engine = CDIContainer.default().get(GameBuilder).build();
    character = GameBuilder.createCharacter(engine);
    store = cdiContainer.get(GameStoreService).createStore({ engine });
  });

  describe('Battle', () => {
    test('Attack if during battle', async () => {
      new BattleActivity({ participants: [getPlayer(engine).activityParticipant, character.activityParticipant] });
      engine.addEvent(new CommandEndedEvent({ time: engine.time, command: new MockCommand(), executor: character.commandExecutor }));

      await GameService.processEvents(store);

      const expectedBeforeActionExecutingEvent = new BeforeActionExecutingEvent({
        action: new AttackAction({ target: getPlayer(engine) }),
        executor: character.actionExecutor,
        time: addSeconds(engine.time, 2)
      });
      expect(character.pendingAction).toEqual(
        new PendingAction({
          action: new AttackAction({ target: getPlayer(engine) }),
          scheduleTime: engine.time,
          executionEvent: expectedBeforeActionExecutingEvent
        })
      );
      expect(engine.events).toEqual([expectedBeforeActionExecutingEvent]);
    });

    test('Do not attack if there is no battle', async () => {
      engine.addEvent(new CommandEndedEvent({ time: engine.time, command: new MockCommand(), executor: character.commandExecutor }));

      await GameService.processEvents(store);

      expect(character.pendingAction).toEqual(undefined);
      expect(engine.events).toEqual([]);
    });

    test('Do not attack if pending action', async () => {
      const pendingAction = new PendingAction({
        action: new MockAction(),
        scheduleTime: engine.time,
        executionEvent: new BeforeActionExecutingEvent({
          action: new MockAction(),
          executor: character.actionExecutor,
          time: engine.time
        })
      });
      new BattleActivity({ participants: [getPlayer(engine).activityParticipant, character.activityParticipant] });
      engine.addEvent(new CommandEndedEvent({ time: engine.time, command: new MockCommand(), executor: character.commandExecutor }));
      character.pendingAction = pendingAction;

      await GameService.processEvents(store);

      expect(character.pendingAction).toEqual(pendingAction);
      expect(engine.events).toEqual([]);
    });

    test('Do not attack if pending command', async () => {
      new BattleActivity({ participants: [getPlayer(engine).activityParticipant, character.activityParticipant] });
      engine.addEvent(new CommandEndedEvent({ time: engine.time, command: new MockCommand(), executor: character.commandExecutor }));
      character.pendingCommand = new MockCommand();

      await GameService.processEvents(store);

      expect(character.pendingAction).toEqual(undefined);
      expect(character.pendingCommand).toEqual(new MockCommand());
      expect(engine.events).toEqual([]);
    });

    test('Stop battle if there is no enemy', async () => {
      new BattleActivity({ participants: [character.activityParticipant] });
      engine.addEvent(new CommandEndedEvent({ time: engine.time, command: new MockCommand(), executor: character.commandExecutor }));

      await GameService.processEvents(store);

      expect(character.pendingAction).toEqual(undefined);
      expect(character.activityParticipant.activities.getArray()).toEqual([]);
      expect(engine.events).toEqual([]);
    });
  });
});
