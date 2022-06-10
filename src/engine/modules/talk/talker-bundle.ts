import { ActivityParticipant } from 'engine/core/activity';
import { Entity, EntityProvider } from 'engine/core/ecs';
import { Character } from '../character';
import { OfferParty } from '../offer';

export interface TalkerBundle {
  entity: Entity;
  offerParty: OfferParty;
  activityParticipant: ActivityParticipant;
  character: Character;
}

export const getTalkerBundle = (entityProvider: EntityProvider): TalkerBundle => {
  return {
    entity: EntityProvider.requireEntity(entityProvider),
    offerParty: EntityProvider.requireComponent(entityProvider, OfferParty),
    activityParticipant: EntityProvider.requireComponent(entityProvider, ActivityParticipant),
    character: EntityProvider.requireComponent(entityProvider, Character)
  };
};
