import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import { ActionPanel } from './action/component/ActionPanel';
import { ActionContext } from './action/model/ActionContext';
import { ActionExecutionContext } from './action/model/ActionExecutionContext';
import { MapFieldActionTrigger } from './action/model/MapFieldActionTrigger';
import { getActionContextByActionTrigger } from './action/service/ActionService';
import './App.css';
import { CharacterProfileView } from './character/component/CharacterProfileView';
import { Character } from './character/model/Character';
import { CharacterPosition } from './character/model/CharacterPosition';
import { Race } from './character/model/Race';
import { GameState } from './game/model/GameState';
import { Player } from './game/model/Player';
import { LocationView } from './map/component/LocationVIiew';
import { MapField } from './map/model/MapField';
import { MapFieldType } from './map/model/MapFieldType';
import { MapLocation } from './map/model/MapLocation';
import { TerrainObject } from './map/terrain-object/TerrainObject';
import { TerrainObjectPlacementType } from './map/terrain-object/TerrainObjectPlacementType';
import { TerrainObjectType } from './map/terrain-object/TerrainObjectType';

const humanRace = new Race('HUMAN');
const world = new MapLocation({ name: "Alice's parcel", width: 3, height: 3, fieldType: MapFieldType.GRASS });
const character = new Character({
  name: 'Piotr',
  race: humanRace,
  avatarUrl: 'images/character_001_avatar.png',
  field: world.fields[1][1]
});
const character_002 = new Character({
  name: 'Alice',
  race: humanRace,
  avatarUrl: 'images/character_002_avatar.png',
  field: world.fields[1][1]
});
const player = new Player(character);
const buildingType = new TerrainObjectType({
  id: 'HOUSE',
  imageUrl: 'images/house.png',
  placements: [TerrainObjectPlacementType.OUTSIDE, TerrainObjectPlacementType.INSIDE],
  defaultCharacterPlacement: TerrainObjectPlacementType.OUTSIDE
});
const building = new TerrainObject({ type: buildingType });
building.guards.push(character_002);
world.fields[1][1].terrainObject = building;

const gameState = new GameState(player, world, [character]);

function App() {
  useEffect(() => {
    i18next.addResourceBundle('en', 'translation', {
      'CHARACTER.RACE.HUMAN': 'Human',
      'MAP.TERRAIN_OBJECT.HOUSE': 'House',
      'MAP.TERRAIN_OBJECT.HOUSE.DESCRIPTION': 'The house seems normal.'
    });
    i18next.addResourceBundle('pl', 'translation', {
      'CHARACTER.RACE.HUMAN': 'Człowiek',
      'MAP.TERRAIN_OBJECT.HOUSE': 'Dom',
      'MAP.TERRAIN_OBJECT.HOUSE.DESCRIPTION': 'Do wygląda normalnie.'
    });
  }, []);

  const [actionContext, setActionContext] = useState<ActionContext | undefined>(undefined);
  const actionExecutionContext = new ActionExecutionContext(
    () => setActionContext(undefined),
    (actionContext) => setActionContext(actionContext),
    (field) => {
      character.position = new CharacterPosition({ field: field });
      setActionContext(undefined);
    }
  );

  const displayActionPanelForField = (field: MapField) => {
    const actionTrigger = new MapFieldActionTrigger(field);
    const actionContext = getActionContextByActionTrigger(actionTrigger, gameState);
    setActionContext(actionContext);
  };

  return (
    <div className="border-2 border-black divide-y-[2px] divide-black h-full flex flex-col">
      <CharacterProfileView character={character}></CharacterProfileView>
      <div className="grow overflow-hidden">
        <LocationView location={world} player={player} onFieldClick={({ field }) => displayActionPanelForField(field)} />
      </div>
      {actionContext && <ActionPanel actionContext={actionContext} actionExecutionContext={actionExecutionContext}></ActionPanel>}
    </div>
  );
}

export default App;
