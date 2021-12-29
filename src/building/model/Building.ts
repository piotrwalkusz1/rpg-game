import { BuildingType } from './BuildingType';

export class Building {
  constructor(readonly type: BuildingType) {
    this.type = type;
  }
}
