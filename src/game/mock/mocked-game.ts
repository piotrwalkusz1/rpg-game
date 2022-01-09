import { GiveLocationAction } from '../../action/model/actions/give-location-action';
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
import { VisionService } from '../../trait/vision/service/vision-service';
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
      CAVE_NEAR_ALICE_HOUSE: new TerrainObject({ type: TerrainObjectType.CAVE, field: locations.REGION_WHERE_ALICE_LIVE.fields[2][1] }),
      HIDDEN_TREASURE_NEAR_ALICE_HOUSE: new TerrainObject({
        type: TerrainObjectType.HIDDEN_TREASURE,
        field: locations.REGION_WHERE_ALICE_LIVE.fields[2][1],
        hidden: true
      })
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
        position: new TerrainObjectPosition(terrainObjects.ALICE_HOUSE)
      })
    };

    characters.ALICE.dialogues.push(
      new DialogueOption({
        prompt: 'DIALOGUE.TEXT.10001_DO_YOU_KNOW_ANYTHING_INTERESTING_ABOUT_THIS_AREA',
        dialogue: () =>
          VisionService.isLocatable(terrainObjects.HIDDEN_TREASURE_NEAR_ALICE_HOUSE, characters.ALICE)
            ? new Dialogue({
                text: 'DIALOGUE.TEXT.10002_THERE_IS_BURIED_TREASURE',
                options: [
                  new DialogueOption({
                    prompt: 'DIALOGUE.TEXT.00001_YES',
                    dialogue: new Dialogue({
                      text: 'DIALOGUE.TEXT.10003_JUST_DONT_FORGET_TO_SHARE_IT'
                    }),
                    actions: (gameState) => [
                      new GiveLocationAction({
                        locationGiver: characters.ALICE,
                        locationReceiver: gameState.player.character,
                        location: terrainObjects.HIDDEN_TREASURE_NEAR_ALICE_HOUSE
                      })
                    ]
                  }),
                  new DialogueOption({
                    prompt: 'DIALOGUE.TEXT.00002_NO',
                    dialogue: new Dialogue({
                      text: 'DIALOGUE.TEXT.10004_NO_ONE_HAS_FOUND_IT_YET_ANYWAY'
                    })
                  })
                ]
              })
            : new Dialogue({ text: 'DIALOGUE.TEXT.10005_I_KNOW_NOTHING' })
      })
    );

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

    characters.ALICE.addKnownLocation(terrainObjects.HIDDEN_TREASURE_NEAR_ALICE_HOUSE);

    const player = new Player(characters.PIOTR);

    return new GameState({ player: player, world: world });
  };
}
