import { ECSEvent, Engine, Entity } from '../ecs';
import { Time, TimeEvent, TimeManager } from '../time';
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

  override async processEvent(event: ECSEvent): Promise<void> {
    if (event instanceof TimeEvent) {
      this.time = event.time;
    }
    await super.processEvent(event);
  }

  get time(): Time {
    return this.timeManager.time;
  }

  set time(time: Time) {
    this.timeManager.time = time;
  }

  get events(): readonly GameEvent[] {
    return this.eventQueue.events;
  }

  get nextEventTime(): Time | undefined {
    return this.nextEvent?.time;
  }

  get nextEvent(): GameEvent | undefined {
    return this.events[0];
  }

  addEvents(events: GameEvent[]): void {
    this.eventQueue.addEvents(events);
  }

  addEvent(event: GameEvent): void {
    this.eventQueue.addEvent(event);
  }
}
