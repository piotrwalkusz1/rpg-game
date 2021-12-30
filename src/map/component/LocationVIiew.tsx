import { TranslatableRichTextView } from '../../common/component/TranslatableRichTextView';
import { Player } from '../../game/model/Player';
import { MapField } from '../model/MapField';
import { MapLocation } from '../model/MapLocation';
import { TerrainView } from './TerrainView';

export const LocationView = ({
  location,
  player,
  onFieldClick
}: {
  location: MapLocation;
  player: Player;
  onFieldClick?: ({}: { field: MapField }) => void;
}) => {
  return (
    <div className="flex flex-col divide-y-[2px] divide-black h-full ">
      <div className="text-center font-bold py-[5px]">
        <TranslatableRichTextView text={location.name} />
      </div>
      <div className="grow overflow-auto flex">
        <div className="grow"></div>
        <div className="flex flex-col">
          <div className="grow"></div>
          <div>
            <TerrainView location={location} player={player} onFieldClick={onFieldClick} />
          </div>
          <div className="grow"></div>
        </div>
        <div className="grow"></div>
      </div>
    </div>
  );
};
