import type { PendingAction } from 'engine/core/action/model/pending-action';
import type { Activity } from 'engine/core/activity/model/activity';
import type { Race } from 'engine/core/actor/model/race';
import type { MapField } from 'engine/core/map/model/map-field';
import { Position, TerrainObjectPosition } from 'engine/core/map/model/position';
import { PositionSet } from 'engine/core/map/model/position-set';
import type { TerrainObject } from 'engine/core/map/model/terrain-object';
import type { NarrationProvider } from 'engine/core/narration/model/narration-provider/narration-provider';
import type { NarrationProviderOwner } from 'engine/core/narration/model/narration-provider/narration-provider-owner';
import type { Trait } from 'engine/core/trait/model/trait';
import type { TraitOwner } from 'engine/core/trait/model/trait-owner';
import { PositionBasedHearableTrait } from 'engine/modules/hearing/model/hearable-traits/position-based-hearable-trait';
import { PositionBasedHearerTrait } from 'engine/modules/hearing/model/hearer-traits/position-based-hearer-trait';
import type { Information } from 'engine/modules/information/model/information';
import type { InformationOwner } from 'engine/modules/information/model/information-owner';
import { TerrainObjectLocationInformation } from 'engine/modules/information/model/informations/terrain-object-location-information';
import { InformationUtils } from 'engine/modules/information/service/information-utils';
import { PositionBasedObservableTrait } from 'engine/modules/vision/model/observable-traits/position-based-observable-trait';
import { PositionBasedObservatorTrait } from 'engine/modules/vision/model/observator-traits/position-based-observator-trait';
import { TerrainObjectKnownLocationObservatorTrait } from 'engine/modules/vision/model/observator-traits/terrain-object-known-location-observator-trait';
import type { TranslatableText } from 'i18n/translatable-text';
import { ManyToManyCollection, OneToManyCollection, OneToManyForeignKey } from 'utils/cache-relationship-utils';

export class ActorsCollection extends OneToManyCollection<Actor, Position> {
  override getForeignKey = (character: Actor) => character.positionFK;
}

class ActorPositionFK extends OneToManyForeignKey<Actor, ActorsCollection, Position> {
  override getCollection = (position: Position | undefined) => position?.characters;
  override areForeignKeysEqual = Position.areEqual;
}

class ActivitiesCollection extends ManyToManyCollection<Activity, Actor> {
  override getCollection = (activity: Activity) => activity.participants;
}

export class Actor implements TraitOwner, NarrationProviderOwner, InformationOwner {
  readonly name?: string;
  readonly race: Race;
  readonly avatarUrl?: string;
  readonly positionFK: ActorPositionFK = new ActorPositionFK(this);
  readonly traits: Trait[];
  readonly narrationProviders: NarrationProvider[] = [];
  readonly informations: Information[] = [];
  readonly activities: ActivitiesCollection = new ActivitiesCollection(this);
  healthPoints = 100;
  maxHealthPoints = 100;
  damage = 10;
  pendingAction: PendingAction | undefined;

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
      new TerrainObjectKnownLocationObservatorTrait(this),
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

  addKnownLocation(terrainObject: TerrainObject): void {
    InformationUtils.addInformation(this, new TerrainObjectLocationInformation(terrainObject));
  }

  addActivity(activity: Activity): void {
    this.activities.add(activity);
  }

  removeActivity(activity: Activity): void {
    this.activities.remove(activity);
  }
}
