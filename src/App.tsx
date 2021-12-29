import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import { ActionPanel } from './action/component/ActionPanel';
import { ActionContext } from './action/model/ActionContext';
import { ActionExecutionContext } from './action/model/ActionExecutionContext';
import { MapFieldActionTrigger } from './action/model/MapFieldActionTrigger';
import { getActionContextByActionTrigger } from './action/service/ActionService';
import './App.css';
import { Building } from './building/model/Building';
import { BuildingType } from './building/model/BuildingType';
import { CharacterProfileView } from './character/component/CharacterProfileView';
import { Character } from './character/model/Character';
import { Race } from './character/model/Race';
import { GameState } from './game/model/GameState';
import { Player } from './game/model/Player';
import { LocationView } from './map/component/LocationVIiew';
import { MapBuilding } from './map/model/MapBuilding';
import { MapField } from './map/model/MapField';
import { MapFieldType } from './map/model/MapFieldType';
import { MapLocation } from './map/model/MapLocation';

const humanRace = new Race('HUMAN');
const world = new MapLocation(10, 10, MapFieldType.GRASS);
const character = new Character(humanRace);
character.name = 'Piotr';
character.field = world.fields[1][3];
character.avatarUrl = 'images/character_001_avatar.png';
const character_002 = new Character(humanRace);
character_002.name = 'Alice';
character_002.field = world.fields[3][4];
character_002.avatarUrl = 'images/character_002_avatar.png';
const player = new Player(character);
const buildingType = new BuildingType('HOUSE', 'images/house.png');
buildingType.canEnter = true;
const building = new Building(buildingType);
const mapBuilding = new MapBuilding(building);
mapBuilding.guards.push(character_002);
world.fields[3][4].setObject(mapBuilding);

const gameState = new GameState(player, world, [character]);

function App() {
  useEffect(() => {
    i18next.addResourceBundle('en', 'translation', {
      'CHARACTER.RACE.HUMAN': 'Human',
      'BUILDING.BUILDING_TYPE.HOUSE': 'House',
      'BUILDING.BUILDING_TYPE.HOUSE.DESCRIPTION': 'Just a house.',
      'BUILDING.BUILDING_TYPE.HOUSE.INSIDE.DESCRIPTION': 'The design of the house is average.'
    });
    i18next.addResourceBundle('pl', 'translation', {
      'CHARACTER.RACE.HUMAN': 'Człowiek',
      'BUILDING.BUILDING_TYPE.HOUSE': 'Dom',
      'BUILDING.BUILDING_TYPE.HOUSE.DESCRIPTION': 'Po prostu dom.',
      'BUILDING.BUILDING_TYPE.HOUSE.INSIDE.DESCRIPTION': 'Wystruj domu jest przeciętny.'
    });
  }, []);

  const [actionContext, setActionContext] = useState<ActionContext | undefined>(undefined);
  const actionExecutionContext = new ActionExecutionContext(
    () => setActionContext(undefined),
    (actionContext) => setActionContext(actionContext),
    (field) => {
      character.field = field;
      setActionContext(undefined);
    }
  );

  const displayActionPanelForField = (field: MapField) => {
    const actionTrigger = new MapFieldActionTrigger(field);
    const actionContext = getActionContextByActionTrigger(actionTrigger, gameState);
    setActionContext(actionContext);
  };

  return (
    <div className="border-2 border-black divide-y-[2px] divide-black h-full">
      <CharacterProfileView character={character}></CharacterProfileView>
      <LocationView location={world} player={player} onFieldClick={({ field }) => displayActionPanelForField(field)} />
      {actionContext && <ActionPanel actionContext={actionContext} actionExecutionContext={actionExecutionContext}></ActionPanel>}
    </div>
  );
}

export default App;
