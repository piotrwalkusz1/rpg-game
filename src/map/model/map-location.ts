import { ArrayUtils } from '../../common/array-utils';
import { OneToManyForeignKey } from '../../common/cache-relationship-utils';
import { areSame } from '../../common/object-utils';
import type { Detector } from '../../detector/model/detector';
import type { DetectorContext } from '../../detector/model/detector-context';
import type { TranslatableText } from '../../i18n/translatable-text';
import type { NarrationProvider } from '../../narration/model/narration-provider/narration-provider';
import type { NarrationProviderOwner } from '../../narration/model/narration-provider/narration-provider-owner';
import { MapField, SubLocationsCollection } from './map-field';
import type { MapFieldType } from './map-field-type';

class LocationParentFieldFK extends OneToManyForeignKey<MapLocation, SubLocationsCollection, MapField> {
  override getCollection = (field?: MapField) => field?.subLocations;
  override areForeignKeysEqual = areSame;
}

export class MapLocation implements DetectorContext, NarrationProviderOwner {
  name: TranslatableText;
  readonly width: number;
  readonly height: number;
  readonly fields: readonly MapField[][];
  readonly startingField?: MapField;
  readonly parentFieldFK: LocationParentFieldFK = new LocationParentFieldFK(this);
  readonly detectors: Detector[] = [];
  readonly narrationProviders: NarrationProvider[] = [];

  constructor({
    name,
    width,
    height,
    fieldType,
    startingField,
    parentField
  }: {
    name: TranslatableText;
    width: number;
    height: number;
    fieldType: MapFieldType;
    startingField?: { x: number; y: number };
    parentField?: MapField;
  }) {
    if (startingField && (startingField.x < 0 || startingField.x >= width || startingField.y < 0 || startingField.y >= height)) {
      throw new Error(
        'Starting position (x=' + startingField.x + ', y=' + startingField.y + ') is invalid for width=' + width + ' and height=' + height
      );
    }

    this.name = name;
    this.width = width;
    this.height = height;
    this.fields = this.prepareFields(width, height, fieldType);
    this.startingField = startingField && this.fields[startingField.y][startingField.x];
    this.parentField = parentField;
  }

  private prepareFields(width: number, height: number, fieldType: MapFieldType): readonly MapField[][] {
    const fields: MapField[][] = [];
    for (let y = 0; y < height; y++) {
      fields[y] = [];
      for (let x = 0; x < width; x++) {
        fields[y][x] = new MapField({ fieldType, location: this });
      }
    }
    return fields;
  }

  get parentField(): MapField | undefined {
    return this.parentFieldFK.value;
  }

  set parentField(parentField: MapField | undefined) {
    this.parentFieldFK.value = parentField;
  }

  addDetector(detector: Detector): void {
    this.detectors.push(detector);
  }

  removeDetector(detector: Detector): void {
    ArrayUtils.remove(this.detectors, detector);
  }

  getParentDetectorContext(): DetectorContext | undefined {
    return this.parentField;
  }
}
