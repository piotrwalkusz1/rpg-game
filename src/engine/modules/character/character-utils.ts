import { Engine, EntityProvider } from 'engine/core/ecs';
import { isLiteral } from 'i18n/translatable-text';
import { requireNotNull } from 'utils';
import { Character } from './character';

export const getCharacter = (entityProvider: EntityProvider): Character => EntityProvider.requireComponent(entityProvider, Character);

export const getCharacterByName = (engine: Engine, name: string): Character =>
  requireNotNull(engine.getComponents(Character).filter((character) => isLiteral(character.name, name))[0]);
