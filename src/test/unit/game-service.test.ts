import { addMilliseconds } from 'date-fns';
import { ECSEvent, Engine, System } from 'engine/core/ecs';
import { GameEngine, GameEvent } from 'engine/core/game';
import type { Time } from 'engine/core/time';
import { GameService } from 'frontend/game';
import { Player } from 'game';

describe('GameService', () => {
  class MockEvent extends GameEvent {
    readonly id: number;

    constructor({ time, id }: { time: Time; id: number }) {
      super({ time });
      this.id = id;
    }
  }

  class MockSystem extends System {
    readonly processedEvents: ECSEvent[] = [];

    override async processEvent(event: ECSEvent, _engine: Engine): Promise<void> {
      this.processedEvents.push(event);
    }
  }

  describe('processEvents method', () => {
    let engine: GameEngine;
    let system: MockSystem;
    let initialTime: Time;

    beforeEach(() => {
      engine = new GameEngine();
      Player.create(engine);
      system = new MockSystem();
      engine.addSystem(system);
      initialTime = engine.time;
    });

    it('should process all next events with same time when time of events is current time', async () => {
      engine.addEvents([
        new MockEvent({ time: new Date(initialTime), id: 1 }),
        new MockEvent({ time: new Date(initialTime), id: 2 }),
        new MockEvent({ time: new Date(initialTime), id: 3 }),
        new MockEvent({ time: addMilliseconds(initialTime, 1), id: 4 }),
        new MockEvent({ time: addMilliseconds(initialTime, 2), id: 5 })
      ]);

      await GameService.processEvents(engine, () => {});

      expect(engine.time).toEqual(initialTime);
      expect(system.processedEvents).toEqual([
        new MockEvent({ time: new Date(initialTime), id: 1 }),
        new MockEvent({ time: new Date(initialTime), id: 2 }),
        new MockEvent({ time: new Date(initialTime), id: 3 })
      ]);
      expect(engine.events).toEqual([
        new MockEvent({ time: addMilliseconds(initialTime, 1), id: 4 }),
        new MockEvent({ time: addMilliseconds(initialTime, 2), id: 5 })
      ]);
    });

    it('should process all next events with same time when time of events is in future', async () => {
      engine.addEvents([
        new MockEvent({ time: addMilliseconds(initialTime, 100), id: 1 }),
        new MockEvent({ time: addMilliseconds(initialTime, 100), id: 2 }),
        new MockEvent({ time: addMilliseconds(initialTime, 200), id: 3 }),
        new MockEvent({ time: addMilliseconds(initialTime, 300), id: 4 })
      ]);

      await GameService.processEvents(engine, () => {});

      expect(engine.time).toEqual(addMilliseconds(initialTime, 100));
      expect(system.processedEvents).toEqual([
        new MockEvent({ time: addMilliseconds(initialTime, 100), id: 1 }),
        new MockEvent({ time: addMilliseconds(initialTime, 100), id: 2 })
      ]);
      expect(engine.events).toEqual([
        new MockEvent({ time: addMilliseconds(initialTime, 200), id: 3 }),
        new MockEvent({ time: addMilliseconds(initialTime, 300), id: 4 })
      ]);
    });
  });
});
