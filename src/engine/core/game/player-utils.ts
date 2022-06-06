import type { Type } from 'utils';
import type { Component, Engine } from '../ecs';
import { Player } from './player';

export const getPlayerComponent = <T extends Component>(engine: Engine, componentType: Type<T>): T =>
  getPlayer(engine).requireComponent(componentType);

export const getPlayer = (engine: Engine): Player => engine.requireComponent(Player);
