import { Character } from '../model/Character';
import { CharacterDisplayNameView } from './CharacterDisplayNameView';
import { CharacterAvatarView } from './CharacterAvatarView';

export const CharacterProfileView = ({ character }: { character: Character }) => {
  return (
    <div className="flex divide-x-[2px] divide-black">
      <CharacterAvatarView character={character} />
      <div className="pl-[8px] pt-[3px]">
        <CharacterDisplayNameView character={character} />
      </div>
    </div>
  );
};
