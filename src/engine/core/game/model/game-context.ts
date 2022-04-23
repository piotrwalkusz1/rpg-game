import { ActionSystem } from 'engine/core/action';
import { Engine, Entity } from 'engine/core/ecs';
import { GameEventQueue } from 'engine/core/game';
import { TimeManager } from 'engine/core/time';
import { TalkSystem } from 'engine/modules/talk/talk-system';

export class GameContext {
  static KEY = Symbol();

  readonly engine: Engine = new Engine();
  readonly refresh: () => void;
  private readonly setBlockedScreen: (blocked: boolean) => void;

  constructor({ refresh, setBlockedScreen }: { refresh: () => void; setBlockedScreen: (blocked: boolean) => void }) {
    this.refresh = refresh;
    this.setBlockedScreen = setBlockedScreen;

    const gameManager = new Entity();
    gameManager.addComponent(new GameEventQueue());
    gameManager.addComponent(new TimeManager(new Date()));
    this.engine.addEntity(gameManager);
    this.engine.addSystem(new ActionSystem());
    this.engine.addSystem(new TalkSystem());
  }

  set blockedScreen(blocked: boolean) {
    this.setBlockedScreen(blocked);
  }
}
