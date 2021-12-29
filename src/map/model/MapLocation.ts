import { MapField } from './MapField';
import { MapFieldType } from './MapFieldType';

export class MapLocation {
  width: number;
  height: number;
  fields: MapField[][];

  constructor(width: number, height: number, fieldType: MapFieldType) {
    this.width = width;
    this.height = height;
    this.fields = [];

    for (let y = 0; y < height; y++) {
      this.fields[y] = [];
      for (let x = 0; x < width; x++) {
        this.fields[y][x] = new MapField({ fieldType });
      }
    }
  }
}
