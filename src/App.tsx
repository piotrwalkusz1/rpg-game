import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import { ActionPanel } from './action/component/ActionPanel';
import { ActionContext } from './action/model/ActionContext';
import { ActionExecutionContext } from './action/model/ActionExecutionContext';
import { MapFieldActionTrigger } from './action/model/MapFieldActionTrigger';
import { getActionContextByActionTrigger } from './action/service/ActionService';
import './App.css';
import { CharacterProfileView } from './character/component/CharacterProfileView';
import { CharacterPosition } from './character/model/CharacterPosition';
import * as MockedGame from './game/mock/MockedGame';
import { LocationView } from './map/component/LocationVIiew';
import { MapField } from './map/model/MapField';

function App() {
  const [gameState, setGameState] = useState(MockedGame.gameState);
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
      gameState.player.character.position = new CharacterPosition({ field: field });
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
      <CharacterProfileView character={gameState.player.character}></CharacterProfileView>
      <div className="grow overflow-hidden">
        <LocationView
          gameState={gameState}
          onGameStateChange={setGameState}
          onFieldClick={({ field }) => displayActionPanelForField(field)}
        />
      </div>
      {actionContext && <ActionPanel actionContext={actionContext} actionExecutionContext={actionExecutionContext}></ActionPanel>}
    </div>
  );
}

export default App;
