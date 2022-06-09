import { Engine, Entity } from '../ecs';
import { Time, TimeManager } from '../time';
import type { GameEvent } from './game-event';
import { GameEventQueue } from './game-event-queue';

export class GameEngine extends Engine {
  readonly timeManager: TimeManager;
  readonly eventQueue: GameEventQueue;

  constructor() {
    super();
    this.timeManager = new TimeManager(new Date(812, 6, 12, 8));
    this.eventQueue = new GameEventQueue();
    const gameManager: Entity = new Entity();
    gameManager.addComponent(this.timeManager);
    gameManager.addComponent(this.eventQueue);
    this.addEntity(gameManager);
  }

  get time(): Time {
    return this.timeManager.time;
  }

  addEvent(event: GameEvent): void {
    this.eventQueue.addEvent(event);
  }
}
