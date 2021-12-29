import { Character } from '../model/Character';

export const CharacterAvatarView = ({ character }: { character: Character }) => {
  return character.avatarUrl ? <img src={character.avatarUrl} width={64} height={64} /> : <div className="w-[64px] h-[64px]"></div>;
};
