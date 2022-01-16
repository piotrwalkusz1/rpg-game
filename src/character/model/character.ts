import type { Activity } from '../../activity/model/activity';
import { ManyToManyCollection, OneToManyCollection, OneToManyForeignKey } from '../../common/cache-relationship-utils';
import type { TranslatableText } from '../../i18n/translatable-text';
import type { MapField } from '../../map/model/map-field';
import { Position, TerrainObjectPosition } from '../../map/model/position';
import { PositionSet } from '../../map/model/position-set';
import type { TerrainObject } from '../../map/terrain-object/model/terrain-object';
import type { NarrationProvider } from '../../narration/model/narration-provider/narration-provider';
import type { NarrationProviderOwner } from '../../narration/model/narration-provider/narration-provider-owner';
import { PositionBasedHearableTrait } from '../../trait/hearing/model/hearable-traits/position-based-hearable-trait';
import { PositionBasedHearerTrait } from '../../trait/hearing/model/hearer-traits/position-based-hearer-trait';
import type { Trait } from '../../trait/model/trait';
import type { TraitOwner } from '../../trait/model/trait-owner';
import { PositionBasedObservableTrait } from '../../trait/vision/model/observable-traits/position-based-observable-trait';
import { KnownLocationObservatorTrait } from '../../trait/vision/model/observator-traits/known-location-observator-trait';
import { PositionBasedObservatorTrait } from '../../trait/vision/model/observator-traits/position-based-observator-trait';
import { VisionService } from '../../trait/vision/service/vision-service';
import type { Race } from './race';

export class CharactersCollection extends OneToManyCollection<Character, Position> {
  override getForeignKey = (character: Character) => character.positionFK;
}

class CharacterPositionFK extends OneToManyForeignKey<Character, CharactersCollection, Position> {
  override getCollection = (position: Position | undefined) => position?.characters;
  override areForeignKeysEqual = Position.areEqual;
}

class ActivitiesCollection extends ManyToManyCollection<Activity, Character> {
  override getCollection = (activity: Activity) => activity.participants;
}

export class Character implements TraitOwner, NarrationProviderOwner {
  readonly name?: string;
  readonly race: Race;
  readonly avatarUrl?: string;
  readonly positionFK: CharacterPositionFK = new CharacterPositionFK(this);
  readonly traits: Trait[];
  readonly narrationProviders: NarrationProvider[] = [];
  readonly activities: ActivitiesCollection = new ActivitiesCollection(this);
  healthPoints = 100;
  maxHealthPoints = 100;
  damage = 10;

  constructor({ name, race, avatarUrl, position }: { name?: string; race: Race; avatarUrl?: string; position?: Position }) {
    this.name = name;
    this.race = race;
    this.avatarUrl = avatarUrl;
    this.positionFK.value = position;
    this.traits = [
      new PositionBasedObservatorTrait(() =>
        this.position instanceof TerrainObjectPosition
          ? PositionSet.create({ terrainObject: this.position.terrainObject })
          : PositionSet.create()
      ),
      new KnownLocationObservatorTrait(),
      new PositionBasedObservableTrait(() =>
        this.position instanceof TerrainObjectPosition
          ? PositionSet.create({ terrainObject: this.position.terrainObject, placement: this.position.placement })
          : PositionSet.create()
      ),
      new PositionBasedHearerTrait(() => this.position),
      new PositionBasedHearableTrait(
        (otherPosition) => this.position instanceof TerrainObjectPosition && Position.areEqual(this.position, otherPosition)
      )
    ];
  }

  get displayName(): TranslatableText {
    return this.name ? { literal: this.name } : this.race.name;
  }

  get field(): MapField | undefined {
    return this.position?.field;
  }

  get position(): Position | undefined {
    return this.positionFK.value;
  }

  set position(newPosition: Position | undefined) {
    this.positionFK.value = newPosition;
  }

  get lostPercentageOfHealth(): number {
    return Math.round((100 * (this.maxHealthPoints - this.healthPoints)) / this.maxHealthPoints);
  }

  isOnField(field: MapField): boolean {
    return this.positionFK.value?.isOnField(field) || false;
  }

  isNearTerrainObject(terrainObject: TerrainObject): boolean {
    return this.positionFK.value?.isNearTerrainObject(terrainObject) || false;
  }

  dealDamage(damage: number): void {
    this.healthPoints = Math.max(this.healthPoints - damage, 0);
  }

  remove(): void {
    this.position?.characters.remove(this);
  }

  addKnownLocation(location: TraitOwner): void {
    VisionService.addKnownLocation(this, location);
  }

  addActivity(activity: Activity): void {
    this.activities.add(activity);
  }

  removeActivity(activity: Activity): void {
    this.activities.remove(activity);
  }
}
