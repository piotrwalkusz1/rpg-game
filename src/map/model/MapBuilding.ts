import { Building } from '../../building/model/Building';
import { Character } from '../../character/model/Character';
import { MapObject } from './MapObject';

export class MapBuilding extends MapObject {
  building: Building;
  guards: Array<Character> = [];

  constructor(building: Building) {
    super();
    this.building = building;
  }

  getImageUrl(): string {
    return this.building.type.imageUrl;
  }
}
