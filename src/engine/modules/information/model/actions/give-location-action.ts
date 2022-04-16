import { CharacterAction, CharacterActionResultEvent, CharacterActionScheduledEvent } from '../../../../core/action/model/character-action';
import type { Character } from '../../../../core/character/model/character';
import type { GameContext } from '../../../../core/game/model/game-context';
import { Position, TerrainObjectPosition } from '../../../../core/map/model/position';
import { PositionSet } from '../../../../core/map/model/position-set';
import type { TerrainObject } from '../../../../core/map/model/terrain-object';

export class GiveLocationActionScheduledEvent extends CharacterActionScheduledEvent {
  readonly position: Position;

  constructor({ position, character }: { position: Position; character: Character }) {
    super({ visibilityPositions: PositionSet.create(), character });
    this.position = position;
  }

  override get detectablePositions(): Position[] {
    return [this.position];
  }
}

export class GiveLocationActionResultEvent extends CharacterActionResultEvent {
  readonly position: Position;

  constructor({ position, character }: { position: Position; character: Character }) {
    super({ visibilityPositions: PositionSet.create(), character });
    this.position = position;
  }

  override get detectablePositions(): Position[] {
    return [this.position];
  }
}

export class GiveLocationAction extends CharacterAction {
  readonly locationReceiver: Character;
  readonly terrainObject: TerrainObject;
  readonly position: Position;

  constructor({
    character,
    locationReceiver,
    terrainObject
  }: {
    character: Character;
    locationReceiver: Character;
    terrainObject: TerrainObject;
  }) {
    super({ character: character });
    if (!character.position) {
      throw new Error('Location giver must have position');
    }
    this.locationReceiver = locationReceiver;
    this.terrainObject = terrainObject;
    this.position = character.position;
  }

  get duration(): Duration {
    return { seconds: 10 };
  }

  override canExecute(): boolean {
    return (
      this.character.healthPoints > 0 &&
      this.locationReceiver.healthPoints > 0 &&
      this.character.position instanceof TerrainObjectPosition &&
      Position.areEqual(this.character.position, this.locationReceiver.position)
    );
  }

  override async execute(context: GameContext): Promise<GiveLocationActionResultEvent> {
    context.addKnownLocation(this.locationReceiver, this.terrainObject);
    return new GiveLocationActionResultEvent({ position: this.position, character: this.character });
  }

  override getActionScheduledEvent(): CharacterActionScheduledEvent | undefined {
    return new GiveLocationActionScheduledEvent({ position: this.position, character: this.character });
  }
}
