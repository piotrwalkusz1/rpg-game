import type { FieldPlacementId } from 'engine/core/field';

export type DialogueId =
  | '00001_YES'
  | '00002_NO'
  | '10001_DO_YOU_KNOW_ANYTHING_INTERESTING_ABOUT_THIS_AREA'
  | '10002_THERE_IS_BURIED_TREASURE'
  | '10003_JUST_DONT_FORGET_TO_SHARE_IT'
  | '10004_NO_ONE_HAS_FOUND_IT_YET_ANYWAY'
  | '10005_I_KNOW_NOTHING'
  | '10006_ON_SECOND_THOUGHT_I_WANT_TO_KNOW_THE_LOCATION_OF_THE_TREASURE';

export type DialogueTranslationKey = `DIALOGUE.TEXT.${DialogueId}`;

type RequiredTranslationKey =
  | `MAP.TERRAIN_OBJECT_PLACEMENT.${FieldPlacementId}.CHARACTER_DESCRIPTION`
  | `MAP.TERRAIN_OBJECT_PLACEMENT.${FieldPlacementId}.MOVEMENT_ACTIVITY`
  | DialogueTranslationKey;

type DefaultTranslations = { [key in RequiredTranslationKey]: string } & { [key: string]: string };
export type TranslationKey = keyof typeof defaultTranslations;
type Translations = { [key in TranslationKey]: string };

const defaultTranslations = {
  'FIELD.GRASS.NAME': 'Grass',
  'FIELD.GRASS.DESCRIPTION': 'Flat ground covered with grass',
  'COMMAND.MOVE.NAME': 'Move',
  'INTERACTION.TALK.NAME': 'Talk',
  'JOURNAL.ENTRY.TALK_END': 'The talk ended.',
  'DIALOGUE.00001_WHERE_IS_BURIED_TREASURE': '"Where is buried treasure?"',
  'DIALOGUE.00002_I_WILL_TELL_YOU_WHERE_TREASURE_IS_BURIED': "I'll tell you where the treasure is buried.",
  // Translations below are to remove
  'NARRATION.COMMON.OK': 'Ok',
  'NARRATION.WAITING_FOR_END_OF_ACTION': 'Waiting for the end of the action...',
  'NARRATION.ACTION_CANNOT_BE_PERFORMED': 'The action cannot be performed.',
  'NARRATION.ACTION.GO_TO_TERRAIN_OBJECT': 'Go',
  'NARRATION.ACTION.GO_TO_FIELD': 'Go',
  'NARRATION.ACTION.LEAVE_TERRAIN_OBJECT': 'Leave',
  'NARRATION.ACTION.SEE_LOCATION': 'See location',
  'NARRATION.ACTION.CHANGE_TERRAIN_OBJECT_PLACEMENT': '{{terrainObjectPlacementMovementActivity}}',
  'NARRATION.ACTION.ATTACK_CHARACTER': 'Attack',
  'MAP.FIELD.EMPTY': 'Empty field',
  'MAP.FIELD.EMPTY.DESCRIPTION': 'There is nothing here.',
  'MAP.FIELD.GRASS': 'Grass',
  'MAP.FIELD.GRASS.DESCRIPTION': 'The land is covered with grass.',
  'MAP.FIELD.MEADOW': 'Meadow',
  'MAP.FIELD.MEADOW.DESCRIPTION': 'The meadow is covered with grass.',
  'MAP.FIELD.LOWLANDS': 'Lowlands',
  'MAP.FIELD.LOWLANDS.DESCRIPTION': 'Lowlands.',
  'MAP.TERRAIN_OBJECT_PLACEMENT.OUTSIDE.CHARACTER_DESCRIPTION': `{{characterName}} is outside.`,
  'MAP.TERRAIN_OBJECT_PLACEMENT.OUTSIDE.MOVEMENT_ACTIVITY': `Go outside`,
  'MAP.TERRAIN_OBJECT_PLACEMENT.INSIDE.CHARACTER_DESCRIPTION': `{{characterName}} is inside.`,
  'MAP.TERRAIN_OBJECT_PLACEMENT.INSIDE.MOVEMENT_ACTIVITY': `Go inside`,
  'MAP.TERRAIN_OBJECT_PLACEMENT.NEAR.CHARACTER_DESCRIPTION': `{{characterName}} is near.`,
  'MAP.TERRAIN_OBJECT_PLACEMENT.NEAR.MOVEMENT_ACTIVITY': `Go near`,
  'MAP.TERRAIN_OBJECT.HOUSE': 'House',
  'MAP.TERRAIN_OBJECT.HOUSE.DESCRIPTION': 'The house seems normal.',
  'MAP.TERRAIN_OBJECT.CAVE': 'Cave',
  'MAP.TERRAIN_OBJECT.CAVE.DESCRIPTION': 'The cave seems normal.',
  'MAP.TERRAIN_OBJECT.HIDDEN_TREASURE': 'Hidden treasure',
  'MAP.TERRAIN_OBJECT.HIDDEN_TREASURE.DESCRIPTION': 'The treasure was hidden here.',
  'CHARACTER.RACE.HUMAN': 'Human',
  'LAW.LAW_VIOLATION_PREVENTION.THIS_IS_ILLEGAL': 'This is illegal.',
  'LAW.LAW_VIOLATION_PREVENTION.DIALOGUE.YOU_CANNOT_ENTER': '"You cannot enter!"',
  'GAME.MESSAGE.YOU_ARE_DEAD': 'You are dead',
  'GAME.BUTTON.REPEAT': 'Repeat',
  'DIALOGUE.COMMON.EXIT': 'Exit',
  'DIALOGUE.TEXT.00001_YES': '"Yes"',
  'DIALOGUE.TEXT.00002_NO': '"No"',
  'DIALOGUE.TEXT.10001_DO_YOU_KNOW_ANYTHING_INTERESTING_ABOUT_THIS_AREA': 'Do you know anything interesting about this area?',
  'DIALOGUE.TEXT.10002_THERE_IS_BURIED_TREASURE':
    'Hmm... I recall that there is buried treasure near the cave south of here. Shall I point it out to you on the map?',
  'DIALOGUE.TEXT.10003_JUST_DONT_FORGET_TO_SHARE_IT': `Just don't forget to share it when you find it.`,
  'DIALOGUE.TEXT.10004_NO_ONE_HAS_FOUND_IT_YET_ANYWAY': 'Reasonably. No one has found it yet anyway.',
  'DIALOGUE.TEXT.10005_I_KNOW_NOTHING': `Unfortunately. I don't know anything about that.`,
  'DIALOGUE.TEXT.10006_ON_SECOND_THOUGHT_I_WANT_TO_KNOW_THE_LOCATION_OF_THE_TREASURE':
    'On second thought, I want to know the location of the treasure.',
  'DIALOGUE.TEXT.10007_IT_IS_TOO_BAD_YOU_FOUND_THIS_PLACE': `It's too bad you found this place. Apparently, fate is not in your favor.`
};
const enTranslations: DefaultTranslations = defaultTranslations;
const plTranslations: Translations = {
  'FIELD.GRASS.NAME': 'Trawy',
  'FIELD.GRASS.DESCRIPTION': 'P??aski teren poro??ni??ty traw??',
  'COMMAND.MOVE.NAME': 'Id??',
  'INTERACTION.TALK.NAME': 'Rozmawiaj',
  'JOURNAL.ENTRY.TALK_END': 'Rozmowa si?? zako??czy??a.',
  'DIALOGUE.00001_WHERE_IS_BURIED_TREASURE': '"Gdzie jest zakopany skarb?"',
  'DIALOGUE.00002_I_WILL_TELL_YOU_WHERE_TREASURE_IS_BURIED': 'Powiem ci, gdzie jest zakopany skarb.',
  // Translations below are to remove
  'NARRATION.COMMON.OK': 'Ok',
  'NARRATION.WAITING_FOR_END_OF_ACTION': 'Oczekiwanie na zako??czenie akcji...',
  'NARRATION.ACTION_CANNOT_BE_PERFORMED': 'Nie mo??na wykona?? akcji.',
  'NARRATION.ACTION.GO_TO_TERRAIN_OBJECT': 'Id??',
  'NARRATION.ACTION.GO_TO_FIELD': 'Id??',
  'NARRATION.ACTION.LEAVE_TERRAIN_OBJECT': 'Opu????',
  'NARRATION.ACTION.SEE_LOCATION': 'Zobacz lokacj??',
  'NARRATION.ACTION.CHANGE_TERRAIN_OBJECT_PLACEMENT': '{{terrainObjectPlacementMovementActivity}}',
  'NARRATION.ACTION.ATTACK_CHARACTER': 'Atakuj',
  'MAP.FIELD.EMPTY': 'Puste pole',
  'MAP.FIELD.EMPTY.DESCRIPTION': 'Nic tutaj nie ma.',
  'MAP.FIELD.GRASS': 'Trawa',
  'MAP.FIELD.GRASS.DESCRIPTION': 'Teren poro??ni??ty traw??.',
  'MAP.FIELD.MEADOW': '????ka',
  'MAP.FIELD.MEADOW.DESCRIPTION': '????ka jest poro??ni??ta traw??',
  'MAP.FIELD.LOWLANDS': 'Niziny',
  'MAP.FIELD.LOWLANDS.DESCRIPTION': 'Niziny.',
  'MAP.TERRAIN_OBJECT_PLACEMENT.OUTSIDE.CHARACTER_DESCRIPTION': `{{characterName}} jest na zewn??trz.`,
  'MAP.TERRAIN_OBJECT_PLACEMENT.OUTSIDE.MOVEMENT_ACTIVITY': `Wejd?? do ??rodka`,
  'MAP.TERRAIN_OBJECT_PLACEMENT.INSIDE.CHARACTER_DESCRIPTION': `{{characterName}} jest wewn??trz.`,
  'MAP.TERRAIN_OBJECT_PLACEMENT.INSIDE.MOVEMENT_ACTIVITY': `Wyjd?? na zewn??trz`,
  'MAP.TERRAIN_OBJECT_PLACEMENT.NEAR.CHARACTER_DESCRIPTION': `{{characterName}} jest niedaleko.`,
  'MAP.TERRAIN_OBJECT_PLACEMENT.NEAR.MOVEMENT_ACTIVITY': `Zbli?? si??`,
  'MAP.TERRAIN_OBJECT.HOUSE': 'Dom',
  'MAP.TERRAIN_OBJECT.HOUSE.DESCRIPTION': 'Dom wygl??da normalnie.',
  'MAP.TERRAIN_OBJECT.CAVE': 'Jaskinia',
  'MAP.TERRAIN_OBJECT.CAVE.DESCRIPTION': 'Jaskinia wygl??da normalnie.',
  'MAP.TERRAIN_OBJECT.HIDDEN_TREASURE': 'Ukryty skarb',
  'MAP.TERRAIN_OBJECT.HIDDEN_TREASURE.DESCRIPTION': 'Zosta?? tutaj ukryty skarb.',
  'CHARACTER.RACE.HUMAN': 'Cz??owiek',
  'LAW.LAW_VIOLATION_PREVENTION.THIS_IS_ILLEGAL': 'To jest nielegalne.',
  'LAW.LAW_VIOLATION_PREVENTION.DIALOGUE.YOU_CANNOT_ENTER': '"Nie mo??esz wej????!"',
  'GAME.MESSAGE.YOU_ARE_DEAD': 'Jeste?? martwy',
  'GAME.BUTTON.REPEAT': 'Powt??rz',
  'DIALOGUE.COMMON.EXIT': 'Zako??cz',
  'DIALOGUE.TEXT.00001_YES': '"Tak"',
  'DIALOGUE.TEXT.00002_NO': '"Nie"',
  'DIALOGUE.TEXT.10001_DO_YOU_KNOW_ANYTHING_INTERESTING_ABOUT_THIS_AREA': 'Czy wiesz co?? ciekawego na temat tej okolicy?',
  'DIALOGUE.TEXT.10002_THERE_IS_BURIED_TREASURE':
    'Hmm... Kojarz??, ??e nieopodal jaskini na po??udnie st??d znajdue si?? zakopany skarb. Czy wskaza?? ci go na mapie?',
  'DIALOGUE.TEXT.10003_JUST_DONT_FORGET_TO_SHARE_IT': `Tylko nie zapomnij si?? nim podzieli??, gdy ju?? go znajdziesz.`,
  'DIALOGUE.TEXT.10004_NO_ONE_HAS_FOUND_IT_YET_ANYWAY': 'Rozs??dnie. I tak go jeszcze nikt nie znalaz??.',
  'DIALOGUE.TEXT.10005_I_KNOW_NOTHING': 'Niestety. Nic nie wiem na ten temat.',
  'DIALOGUE.TEXT.10006_ON_SECOND_THOUGHT_I_WANT_TO_KNOW_THE_LOCATION_OF_THE_TREASURE': 'Po namy??le, chc?? pozna?? lokalizacj?? skarbu.',
  'DIALOGUE.TEXT.10007_IT_IS_TOO_BAD_YOU_FOUND_THIS_PLACE': `??le si?? sta??o, ??e znalaz??e?? to miejsce. Widocznie los tobie nie sprzyja.`
};

export default {
  en: {
    common: enTranslations
  },
  pl: {
    common: plTranslations
  }
};
