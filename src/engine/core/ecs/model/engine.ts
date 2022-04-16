import type { ECSEvent, Entity, System } from 'engine/core/ecs';

export class Engine {
  private readonly entities: Entity[] = [];
  private readonly systems: System[] = [];

  getEntities(): readonly Entity[] {
    return this.entities;
  }

  getSystems(): readonly System[] {
    return this.systems;
  }

  addSystem(system: System): void {
    this.systems.push(system);
  }

  async processEvent(event: ECSEvent): Promise<void> {
    for (const system of this.systems) {
      await system.processEvent(event);
    }
  }
}
