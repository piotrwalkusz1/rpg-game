import type { Type } from 'utils';
import type { Entity } from './entity';

export abstract class Component {
  private _entity: Entity | undefined;

  get entity(): Entity {
    if (!this._entity) {
      throw new Error('Component was not added to entity or was removed from entity');
    }
    return this._entity;
  }

  set entity(entity: Entity | undefined) {
    this._entity = entity;
  }

  getComponent<T extends Component>(componentType: Type<T>): T | undefined {
    return this.entity.getComponent(componentType);
  }

  hasComponent<T extends Component>(componentType: Type<T>): boolean {
    return this.getComponent(componentType) !== undefined;
  }

  requireComponent<T extends Component>(componentType: Type<T>): T {
    const component: T | undefined = this.getComponent(componentType);
    if (!component) {
      throw new Error('Component ' + componentType.name + ' is required');
    }
    return component;
  }
}
