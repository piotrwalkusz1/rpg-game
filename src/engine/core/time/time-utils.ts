import type { Engine } from '../ecs';
import type { Time } from './time';
import { TimeManager } from './time-manager';

export const getTime = (engine: Engine): Time => {
  return engine.requireComponent(TimeManager).time;
};
