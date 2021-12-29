import { BuildingType } from './BuildingType';
export class Building {
  type: BuildingType;

  constructor(type: BuildingType) {
    this.type = type;
  }
}
