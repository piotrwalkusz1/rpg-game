import { Building } from '../../building/model/Building';
import { MapObject } from './MapObject';

export class MapBuilding extends MapObject {
  building: Building;

  constructor(building: Building) {
    super();
    this.building = building;
  }

  getImageUrl(): string {
    return this.building.type.imageUrl;
  }
}
