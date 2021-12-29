import { useTranslation } from 'react-i18next';
import { Character } from '../model/Character';

export const CharacterDisplayNameView = ({ character }: { character: Character }) => {
  const { t } = useTranslation();
  return <span className="font-bold">{character.name || t(character.race.getTranslationKey())}</span>;
};
