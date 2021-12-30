import { faSearchMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TranslatableRichTextView } from '../../common/component/TranslatableRichTextView';
import { GameState } from '../../game/model/GameState';
import { MapField } from '../model/MapField';
import { TerrainView } from './TerrainView';

export const LocationView = ({
  gameState,
  onGameStateChange,
  onFieldClick
}: {
  gameState: GameState;
  onGameStateChange: (gameState: GameState) => void;
  onFieldClick: ({}: { field: MapField }) => void;
}) => {
  const zoomOut = () => {
    if (gameState.currentLocationView.parentField) {
      onGameStateChange({ ...gameState, currentLocationView: gameState.currentLocationView.parentField.location });
    }
  };

  return (
    <div className="flex flex-col divide-y-[2px] divide-black h-full ">
      <div className="text-center font-bold py-[5px]">
        <TranslatableRichTextView text={gameState.currentLocationView.name} />
      </div>
      <div className="grow flex divide-x-[2px] divide-black overflow-hidden">
        <div className="min-w-[64px] max-w-[64px] divide-y-[2px] divide-black">
          <div onClick={zoomOut} className="h-[64px] relative text-[48px] cursor-pointer hover:text-blue-300">
            <div className="absolute top-[-5px] left-[6px]">
              <FontAwesomeIcon icon={faSearchMinus}></FontAwesomeIcon>
            </div>
          </div>
          <div></div>
        </div>
        <div className="grow overflow-auto flex">
          <div className="grow"></div>
          <div className="flex flex-col">
            <div className="grow"></div>
            <div>
              <TerrainView gameState={gameState} onFieldClick={onFieldClick} />
            </div>
            <div className="grow"></div>
          </div>
          <div className="grow"></div>
        </div>
      </div>
    </div>
  );
};
