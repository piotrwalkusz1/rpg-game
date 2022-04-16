import type { TranslatableText } from '../../../../i18n/translatable-text';
import { ArrayUtils } from '../../../../utils/array-utils';
import { OneToManyForeignKey } from '../../../../utils/cache-relationship-utils';
import { areSame } from '../../../../utils/object-utils';
import type { Law } from '../../../modules/law/model/law';
import type { LawContext } from '../../../modules/law/model/law-context';
import { ConstantObservableTrait } from '../../../modules/vision/model/observable-traits/constant-observable-trait';
import { PositionBasedObservableTrait } from '../../../modules/vision/model/observable-traits/position-based-observable-trait';
import { TerrainObjectKnownLocationObservableTrait } from '../../../modules/vision/model/observable-traits/terrain-object-known-location-observable-trait';
import { VisibilityLevel } from '../../../modules/vision/model/visibility-level';
import { ActorsCollection } from '../../actor/model/actor';
import type { Detector } from '../../detector/model/detector';
import type { DetectorContext } from '../../detector/model/detector-context';
import type { NarrationProvider } from '../../narration/model/narration-provider/narration-provider';
import type { NarrationProviderOwner } from '../../narration/model/narration-provider/narration-provider-owner';
import type { Trait } from '../../trait/model/trait';
import type { TraitOwner } from '../../trait/model/trait-owner';
import type { MapField, TerrainObjectsCollection } from './map-field';
import { TerrainObjectPosition } from './position';
import { PositionSet } from './position-set';
import type { TerrainObjectType } from './terrain-object-type';

class TerrainObjectFieldFK extends OneToManyForeignKey<TerrainObject, TerrainObjectsCollection, MapField> {
  override getCollection = (field?: MapField) => field?.terrainObjects;
  override areForeignKeysEqual = areSame;
}

export class TerrainObject implements DetectorContext, TraitOwner, NarrationProviderOwner, LawContext {
  readonly type: TerrainObjectType;
  readonly fieldFK: TerrainObjectFieldFK = new TerrainObjectFieldFK(this);
  readonly characters: ActorsCollection;
  readonly laws: Law[] = [];
  readonly traits: Trait[];
  readonly narrationProviders: NarrationProvider[] = [];
  private readonly customDetectors: Detector[] = [];

  constructor({ type, field, hidden }: { type: TerrainObjectType; field?: MapField; hidden?: boolean }) {
    this.type = type;
    this.fieldFK.value = field;
    this.characters = new ActorsCollection(new TerrainObjectPosition(this, this.type.defaultCharacterPlacement));
    this.traits = [
      new PositionBasedObservableTrait(() => PositionSet.create({ terrainObject: this })),
      hidden ? new TerrainObjectKnownLocationObservableTrait(this) : new ConstantObservableTrait(VisibilityLevel.LOCATABLE)
    ];
  }

  get imageUrl(): string {
    return this.type.imageUrl;
  }

  get field(): MapField | undefined {
    return this.fieldFK.value;
  }

  set field(field: MapField | undefined) {
    this.fieldFK.value = field;
  }

  get name(): TranslatableText {
    return this.type.name;
  }

  getParentDetectorContext(): DetectorContext | undefined {
    return this.field;
  }

  get detectors(): readonly Detector[] {
    return [...this.laws.flatMap((law) => law.detectors), ...this.customDetectors];
  }

  addDetector(detector: Detector): void {
    this.customDetectors.push(detector);
  }

  removeDetector(detector: Detector): void {
    ArrayUtils.remove(this.customDetectors, detector);
  }
}
