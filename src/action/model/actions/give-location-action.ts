import type { Character } from '../../../character/model/character';
import type { GameContext } from '../../../game/model/game-context';
import { Position, TerrainObjectPosition } from '../../../map/model/position';
import { PositionSet } from '../../../map/model/position-set';
import type { TraitOwner } from '../../../trait/model/trait-owner';
import { CharacterAction, CharacterActionResultEvent, CharacterActionScheduledEvent } from '../character-action';

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
  readonly location: TraitOwner;
  readonly position: Position;

  constructor({ character, locationReceiver, location }: { character: Character; locationReceiver: Character; location: TraitOwner }) {
    super({ character: character });
    if (!character.position) {
      throw new Error('Location giver must have position');
    }
    this.locationReceiver = locationReceiver;
    this.location = location;
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
    context.addKnownLocation(this.locationReceiver, this.location);
    return new GiveLocationActionResultEvent({ position: this.position, character: this.character });
  }

  override getActionScheduledEvent(): CharacterActionScheduledEvent | undefined {
    return new GiveLocationActionScheduledEvent({ position: this.position, character: this.character });
  }
}
