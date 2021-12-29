import { Player } from '../../game/model/Player';
import { MapField } from '../model/MapField';
import { MapLocation } from '../model/MapLocation';
import { FieldView } from './FieldView';

export const LocationView = ({
  location,
  player,
  onFieldClick
}: {
  location: MapLocation;
  player: Player;
  onFieldClick?: ({}: { field: MapField }) => void;
}) => {
  const getFieldStyle = (field: MapField) => {
    if (player.character.field === field) {
      return 'w-[64px] h-[64px] outline outline-[2px] outline-offset-[-2px] outline-blue-500 hover:outline-white';
    } else {
      return 'w-[64px] h-[64px] hover:outline outline-[2px] outline-offset-[-2px] outline-white';
    }
  };

  return (
    <div>
      {location.fields.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="flex flex-row">
            {row.map((field, fieldIndex) => {
              return (
                <div key={fieldIndex} className={getFieldStyle(field)} onClick={() => onFieldClick && onFieldClick({ field: field })}>
                  <FieldView field={field} />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
