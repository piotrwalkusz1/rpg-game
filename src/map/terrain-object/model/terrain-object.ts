import { CharactersCollection } from '../../../character/model/character';
import { ArrayUtils } from '../../../common/array-utils';
import { OneToManyForeignKey } from '../../../common/cache-relationship-utils';
import { areSame } from '../../../common/object-utils';
import type { Detector } from '../../../detector/model/detector';
import type { DetectorContext } from '../../../detector/model/detector-context';
import type { TranslatableText } from '../../../i18n/translatable-text';
import type { Law } from '../../../law/model/law';
import type { LawContext } from '../../../law/model/law-context';
import type { NarrationProvider } from '../../../narration/model/narration-provider/narration-provider';
import type { NarrationProviderOwner } from '../../../narration/model/narration-provider/narration-provider-owner';
import type { Trait } from '../../../trait/model/trait';
import type { TraitOwner } from '../../../trait/model/trait-owner';
import { ConstantObservableTrait } from '../../../vision/model/observable-traits/constant-observable-trait';
import { TerrainObjectKnownLocationObservableTrait } from '../../../vision/model/observable-traits/terrain-object-known-location-observable-trait';
import { PositionBasedObservableTrait } from '../../../vision/model/observable-traits/position-based-observable-trait';
import { VisibilityLevel } from '../../../vision/model/visibility-level';
import type { MapField, TerrainObjectsCollection } from '../../model/map-field';
import { TerrainObjectPosition } from '../../model/position';
import { PositionSet } from '../../model/position-set';
import type { TerrainObjectType } from './terrain-object-type';

class TerrainObjectFieldFK extends OneToManyForeignKey<TerrainObject, TerrainObjectsCollection, MapField> {
  override getCollection = (field?: MapField) => field?.terrainObjects;
  override areForeignKeysEqual = areSame;
}

export class TerrainObject implements DetectorContext, TraitOwner, NarrationProviderOwner, LawContext {
  readonly type: TerrainObjectType;
  readonly fieldFK: TerrainObjectFieldFK = new TerrainObjectFieldFK(this);
  readonly characters: CharactersCollection;
  readonly laws: Law[] = [];
  readonly traits: Trait[];
  readonly narrationProviders: NarrationProvider[] = [];
  private readonly customDetectors: Detector[] = [];

  constructor({ type, field, hidden }: { type: TerrainObjectType; field?: MapField; hidden?: boolean }) {
    this.type = type;
    this.fieldFK.value = field;
    this.characters = new CharactersCollection(new TerrainObjectPosition(this, this.type.defaultCharacterPlacement));
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
