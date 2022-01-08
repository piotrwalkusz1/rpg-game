import { Character } from '../../character/model/character';
import { Race } from '../../character/model/race';
import { AttemptGoToPositionDetector } from '../../detector/service/detector-types/attempt-go-to-position-detector';
import { Dialogue } from '../../dialogue/model/dialogue';
import { DialogueOption } from '../../dialogue/model/dialogue-option';
import { Law } from '../../law/model/law';
import { MapFieldType } from '../../map/model/map-field-type';
import { MapLocation } from '../../map/model/map-location';
import { FieldPosition, TerrainObjectPosition } from '../../map/model/position';
import { TerrainObject } from '../../map/terrain-object/model/terrain-object';
import { TerrainObjectType } from '../../map/terrain-object/model/terrain-object-type';
import { GameState } from '../model/game-state';
import { Player } from '../model/player';

export namespace MockedGame {
  export const createGameState = () => {
    const createRegion = (): MapLocation => new MapLocation({ name: 'Region', width: 10, height: 10, fieldType: MapFieldType.MEADOW });
    const createWorld = (): MapLocation => {
      const world = new MapLocation({ name: 'World', width: 10, height: 10, fieldType: MapFieldType.LOWLANDS });
      world.fields.forEach((row) => row.forEach((field) => field.subLocations.add(createRegion())));
      return world;
    };
    const world = createWorld();

    const locations = {
      REGION_WHERE_ALICE_LIVE: world.fields[0][0].subLocations.get(0)
    };

    const terrainObjects = {
      ALICE_HOUSE: new TerrainObject({ type: TerrainObjectType.HOUSE, field: locations.REGION_WHERE_ALICE_LIVE.fields[1][1] }),
      CAVE_NEAR_ALICE_HOUSE: new TerrainObject({ type: TerrainObjectType.CAVE, field: locations.REGION_WHERE_ALICE_LIVE.fields[2][1] })
    };

    const characters = {
      PIOTR: new Character({
        name: 'Piotr',
        race: Race.HUMAN,
        avatarUrl: 'images/character_001_avatar.png',
        position: new FieldPosition(locations.REGION_WHERE_ALICE_LIVE.fields[2][2])
      }),
      ALICE: new Character({
        name: 'Alice',
        race: Race.HUMAN,
        avatarUrl: 'images/character_002_avatar.png',
        position: new TerrainObjectPosition(terrainObjects.ALICE_HOUSE),
        dialogues: [
          new DialogueOption(
            'DIALOGUE.TEXT.10001_DO_YOU_KNOW_ANYTHING_INTERESTING_ABOUT_THIS_AREA',
            new Dialogue({
              text: 'DIALOGUE.TEXT.10002_THERE_IS_BURIED_TREASURE',
              options: [
                new DialogueOption(
                  'DIALOGUE.TEXT.00001_YES',
                  new Dialogue({
                    text: 'DIALOGUE.TEXT.10003_JUST_DONT_FORGET_TO_SHARE_IT'
                  })
                ),
                new DialogueOption(
                  'DIALOGUE.TEXT.00002_NO',
                  new Dialogue({
                    text: 'DIALOGUE.TEXT.10004_NO_ONE_HAS_FOUND_IT_YET_ANYWAY'
                  })
                )
              ]
            })
          )
        ]
      })
    };

    terrainObjects.ALICE_HOUSE.laws.push(
      new Law({
        detector: new AttemptGoToPositionDetector({
          terrainObject: terrainObjects.ALICE_HOUSE,
          terrainObjectPlacementOtherThanDefault: true
        }),
        guards: [characters.ALICE],
        lawViolationPreventionDialogue: { translationKey: 'LAW.LAW_VIOLATION_PREVENTION.DIALOGUE.YOU_CANNOT_ENTER' }
      })
    );

    const player = new Player(characters.PIOTR);

    return new GameState({ player: player, world: world });
  };
}
