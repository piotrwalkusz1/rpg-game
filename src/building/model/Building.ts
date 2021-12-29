import { Character } from '../../character/model/Character';
import { MapField } from '../../map/model/MapField';
import { MapObject } from '../../map/model/MapObject';
import { BuildingType } from './BuildingType';

export class Building extends MapObject {
  readonly type: BuildingType;
  guards: Array<Character> = [];

  constructor({ type, field }: { type: BuildingType; field?: MapField }) {
    super({ field });
    this.type = type;
  }

  override get imageUrl(): string {
    return this.type.imageUrl;
  }
}
