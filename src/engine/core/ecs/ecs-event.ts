import type { Entity } from './entity';

export abstract class ECSEvent {
  get entities(): readonly Entity[] {
    return [];
  }
}
