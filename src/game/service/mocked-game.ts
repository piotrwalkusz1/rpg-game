import { AttackAction } from '../../action/model/actions/attack-action';
import { GiveLocationAction } from '../../action/model/actions/give-location-action';
import { Character } from '../../character/model/character';
import { Race } from '../../character/model/race';
import { Detector } from '../../detector/model/detector';
import { AttemptGoToPositionDetector } from '../../detector/model/detector-types/attempt-go-to-position-detector';
import { GoToPositionDetector } from '../../detector/model/detector-types/go-to-position-detector';
import { Law } from '../../law/model/law';
import { MapFieldType } from '../../map/model/map-field-type';
import { MapLocation } from '../../map/model/map-location';
import { FieldPosition, TerrainObjectPosition } from '../../map/model/position';
import { TerrainObject } from '../../map/terrain-object/model/terrain-object';
import { TerrainObjectType } from '../../map/terrain-object/model/terrain-object-type';
import { ActionNarrationSequenceStage } from '../../narration/model/narration-sequence/narration-sequence-stages/action-narration-sequence-stage';
import { CheckpointNarrationSequenceStage } from '../../narration/model/narration-sequence/narration-sequence-stages/checkpoint-narration-sequence-stage';
import { HookNarrationSequenceStage } from '../../narration/model/narration-sequence/narration-sequence-stages/hook-narration-sequence-stage';
import { SceneNarrationSequenceStage } from '../../narration/model/narration-sequence/narration-sequence-stages/scene-narration-sequence-stage';
import { CustomStory } from '../../story/model/stories/custom-story';
import { DialogueStory } from '../../story/model/stories/dialogue-story';
import { GameState } from '../model/game-state';

export namespace MockedGame {
  export const createGameState = (): GameState => {
    const createRegion = (): MapLocation =>
      new MapLocation({ name: { literal: 'Region' }, width: 10, height: 10, fieldType: MapFieldType.MEADOW });
    const createWorld = (): MapLocation => {
      const world = new MapLocation({ name: { literal: 'World' }, width: 10, height: 10, fieldType: MapFieldType.LOWLANDS });
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
      }),
      ANASTASIA: new Character({
        name: 'Anastasia',
        race: Race.HUMAN,
        avatarUrl: 'images/character_003_avatar.jpeg',
        position: new TerrainObjectPosition(terrainObjects.HIDDEN_TREASURE_NEAR_ALICE_HOUSE)
      })
    };

    const dialogueWithAlice = new DialogueStory({
      character: characters.ALICE,
      prompt: 'DIALOGUE.TEXT.10001_DO_YOU_KNOW_ANYTHING_INTERESTING_ABOUT_THIS_AREA',
      narrationStages: ({ setPrompt, finish, createNarrationAction, createNarrationDescription }) => {
        const learningAboutLocationOfTreasure = [
          new SceneNarrationSequenceStage(createNarrationDescription('DIALOGUE.TEXT.10003_JUST_DONT_FORGET_TO_SHARE_IT')),
          new ActionNarrationSequenceStage(
            (gameState) =>
              new GiveLocationAction({
                character: characters.ALICE,
                locationReceiver: gameState.player,
                location: terrainObjects.HIDDEN_TREASURE_NEAR_ALICE_HOUSE
              })
          ),
          new HookNarrationSequenceStage(() => finish()),
          new CheckpointNarrationSequenceStage({
            nextStages: [],
            checkpointStages: []
          })
        ];

        return [
          new SceneNarrationSequenceStage(createNarrationDescription('DIALOGUE.TEXT.10002_THERE_IS_BURIED_TREASURE'), [
            createNarrationAction({
              name: 'DIALOGUE.TEXT.00001_YES',
              narrationStages: learningAboutLocationOfTreasure
            }),
            createNarrationAction({
              name: 'DIALOGUE.TEXT.00002_NO',
              narrationStages: [
                new SceneNarrationSequenceStage(createNarrationDescription('DIALOGUE.TEXT.10004_NO_ONE_HAS_FOUND_IT_YET_ANYWAY')),
                new HookNarrationSequenceStage(() =>
                  setPrompt('DIALOGUE.TEXT.10006_ON_SECOND_THOUGHT_I_WANT_TO_KNOW_THE_LOCATION_OF_THE_TREASURE')
                ),
                new CheckpointNarrationSequenceStage({
                  nextStages: [],
                  checkpointStages: learningAboutLocationOfTreasure
                })
              ]
            })
          ])
        ];
      }
    });

    const anastasiaDialoague = new DialogueStory({
      character: characters.ANASTASIA,
      narrationStages: ({ createNarrationDescription }) => [
        new SceneNarrationSequenceStage(createNarrationDescription('DIALOGUE.TEXT.10007_IT_IS_TOO_BAD_YOU_FOUND_THIS_PLACE')),
        new ActionNarrationSequenceStage((gameState) => new AttackAction({ character: characters.ANASTASIA, target: gameState.player }))
      ]
    });

    const cannotNearTreasureStory = new CustomStory({
      detectors: () => {
        return [
          {
            detectorContext: terrainObjects.HIDDEN_TREASURE_NEAR_ALICE_HOUSE,
            detector: new Detector(
              new GoToPositionDetector({ terrainObject: terrainObjects.HIDDEN_TREASURE_NEAR_ALICE_HOUSE }),
              (_event, context) => {
                const narrationSequence = anastasiaDialoague.getNarrationSequenceIfPossibleToExecute(context.gameState);
                if (narrationSequence) {
                  gameState.scheduledNarrationSequences.push(narrationSequence);
                }
              }
            )
          }
        ];
      }
    });

    terrainObjects.ALICE_HOUSE.laws.push(
      new Law({
        detector: new AttemptGoToPositionDetector({
          terrainObject: terrainObjects.ALICE_HOUSE,
          terrainObjectPlacementOtherThanDefault: true
        }),
        guards: [characters.ALICE],
        lawViolationPreventionDialogue: 'LAW.LAW_VIOLATION_PREVENTION.DIALOGUE.YOU_CANNOT_ENTER'
      })
    );

    characters.ALICE.addKnownLocation(terrainObjects.HIDDEN_TREASURE_NEAR_ALICE_HOUSE);

    const gameState = new GameState({ player: characters.PIOTR, world });
    gameState.addStory(dialogueWithAlice);
    gameState.addStory(cannotNearTreasureStory);

    return gameState;
  };
}
