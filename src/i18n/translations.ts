import type { RaceId } from '../character/model/race';
import type { DialogueTranslationKey } from '../dialogue/model/dialogue';
import type { FieldTypeId } from '../map/model/map-field-type';
import type { TerrainObjectPlacementId } from '../map/terrain-object/model/terrain-object-placement';
import type { TerrainObjectTypeId } from '../map/terrain-object/model/terrain-object-type';
import type { NarrationActionId } from '../narration/model/narration-actions/template-narration-action';

type RequiredTranslationKey =
  | `NARRATION.ACTION.${NarrationActionId}`
  | `MAP.FIELD.${FieldTypeId}`
  | `MAP.FIELD.${FieldTypeId}.DESCRIPTION`
  | `MAP.TERRAIN_OBJECT.${TerrainObjectTypeId}`
  | `MAP.TERRAIN_OBJECT.${TerrainObjectTypeId}.DESCRIPTION`
  | `MAP.TERRAIN_OBJECT_PLACEMENT.${TerrainObjectPlacementId}.CHARACTER_DESCRIPTION`
  | `MAP.TERRAIN_OBJECT_PLACEMENT.${TerrainObjectPlacementId}.MOVEMENT_ACTIVITY`
  | `CHARACTER.RACE.${RaceId}`
  | DialogueTranslationKey;

type DefaultTranslations = { [key in RequiredTranslationKey]: string } & { [key: string]: string };
export type TranslationKey = keyof typeof defaultTranslations;
type Translations = { [key in TranslationKey]: string };

const defaultTranslations = {
  'NARRATION.COMMON.OK': 'Ok',
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
  'MAP.TERRAIN_OBJECT_PLACEMENT.OUTSIDE.CHARACTER_DESCRIPTION': `{{characterName}} is outside of the building.`,
  'MAP.TERRAIN_OBJECT_PLACEMENT.OUTSIDE.MOVEMENT_ACTIVITY': `Go outside`,
  'MAP.TERRAIN_OBJECT_PLACEMENT.INSIDE.CHARACTER_DESCRIPTION': `{{characterName}} is inside the building.`,
  'MAP.TERRAIN_OBJECT_PLACEMENT.INSIDE.MOVEMENT_ACTIVITY': `Go inside`,
  'MAP.TERRAIN_OBJECT.HOUSE': 'House',
  'MAP.TERRAIN_OBJECT.HOUSE.DESCRIPTION': 'The house seems normal.',
  'MAP.TERRAIN_OBJECT.CAVE': 'Cave',
  'MAP.TERRAIN_OBJECT.CAVE.DESCRIPTION': 'The cave seems normal.',
  'CHARACTER.RACE.HUMAN': 'Human',
  'LAW.LAW_VIOLATION_PREVENTION.THIS_IS_ILLEGAL': 'This is illegal.',
  'LAW.LAW_VIOLATION_PREVENTION.DIALOGUE.YOU_CANNOT_ENTER': '"You cannot enter"!',
  'GAME.MESSAGE.YOU_ARE_DEAD': 'You are dead',
  'GAME.BUTTON.REPEAT': 'Repeat',
  'DIALOGUE.COMMON.EXIT': 'Exit',
  'DIALOGUE.TEXT.00001_YES': '"Yes"',
  'DIALOGUE.TEXT.00002_NO': '"No"',
  'DIALOGUE.TEXT.10001_DO_YOU_KNOW_ANYTHING_INTERESTING_ABOUT_THIS_AREA': '"Do you know anything interesting about this area?"',
  'DIALOGUE.TEXT.10002_THERE_IS_BURIED_TREASURE':
    '"Hmm... I recall that there is buried treasure near the cave south of here. Shall I point it out to you on the map?"',
  'DIALOGUE.TEXT.10003_JUST_DONT_FORGET_TO_SHARE_IT': `"Just don't forget to share it when you find it."`,
  'DIALOGUE.TEXT.10004_NO_ONE_HAS_FOUND_IT_YET_ANYWAY': '"Reasonably. No one has found it yet anyway."'
};
const enTranslations: DefaultTranslations = defaultTranslations;
const plTranslations: Translations = {
  'NARRATION.COMMON.OK': 'Ok',
  'NARRATION.ACTION.GO_TO_TERRAIN_OBJECT': 'Idź',
  'NARRATION.ACTION.GO_TO_FIELD': 'Idź',
  'NARRATION.ACTION.LEAVE_TERRAIN_OBJECT': 'Opuść',
  'NARRATION.ACTION.SEE_LOCATION': 'Zobacz lokację',
  'NARRATION.ACTION.CHANGE_TERRAIN_OBJECT_PLACEMENT': '{{terrainObjectPlacementMovementActivity}}',
  'NARRATION.ACTION.ATTACK_CHARACTER': 'Atakuj',
  'MAP.FIELD.EMPTY': 'Puste pole',
  'MAP.FIELD.EMPTY.DESCRIPTION': 'Nic tutaj nie ma.',
  'MAP.FIELD.GRASS': 'Trawa',
  'MAP.FIELD.GRASS.DESCRIPTION': 'Teren porośnięty trawą.',
  'MAP.FIELD.MEADOW': 'Łąka',
  'MAP.FIELD.MEADOW.DESCRIPTION': 'Łąka jest porośnięta trawą',
  'MAP.FIELD.LOWLANDS': 'Niziny',
  'MAP.FIELD.LOWLANDS.DESCRIPTION': 'Niziny.',
  'MAP.TERRAIN_OBJECT_PLACEMENT.OUTSIDE.CHARACTER_DESCRIPTION': `{{characterName}} jest na zewnątrz budynku.`,
  'MAP.TERRAIN_OBJECT_PLACEMENT.OUTSIDE.MOVEMENT_ACTIVITY': `Wejdź do środka`,
  'MAP.TERRAIN_OBJECT_PLACEMENT.INSIDE.CHARACTER_DESCRIPTION': `{{characterName}} jest wewnątrz budynku.`,
  'MAP.TERRAIN_OBJECT_PLACEMENT.INSIDE.MOVEMENT_ACTIVITY': `Wyjdź na zewnątrz`,
  'MAP.TERRAIN_OBJECT.HOUSE': 'Dom',
  'MAP.TERRAIN_OBJECT.HOUSE.DESCRIPTION': 'Dom wygląda normalnie.',
  'MAP.TERRAIN_OBJECT.CAVE': 'Jaskinia',
  'MAP.TERRAIN_OBJECT.CAVE.DESCRIPTION': 'Jaskinia wygląda normalnie.',
  'CHARACTER.RACE.HUMAN': 'Człowiek',
  'LAW.LAW_VIOLATION_PREVENTION.THIS_IS_ILLEGAL': 'To jest nielegalne.',
  'LAW.LAW_VIOLATION_PREVENTION.DIALOGUE.YOU_CANNOT_ENTER': '"Nie możesz wejść!"',
  'GAME.MESSAGE.YOU_ARE_DEAD': 'Jesteś martwy',
  'GAME.BUTTON.REPEAT': 'Powtórz',
  'DIALOGUE.COMMON.EXIT': 'Zakończ',
  'DIALOGUE.TEXT.00001_YES': '"Tak"',
  'DIALOGUE.TEXT.00002_NO': '"Nie"',
  'DIALOGUE.TEXT.10001_DO_YOU_KNOW_ANYTHING_INTERESTING_ABOUT_THIS_AREA': '"Czy wiesz coś ciekawego na temat tej okolicy?"',
  'DIALOGUE.TEXT.10002_THERE_IS_BURIED_TREASURE':
    '"Hmm... Kojarzę, że nieopodal jaskini na południe stąd znajdue się zakopany skarb. Czy wskazać ci go na mapie?"',
  'DIALOGUE.TEXT.10003_JUST_DONT_FORGET_TO_SHARE_IT': `"Tylko nie zapomnij się nim podzielić, gdy już go znajdziesz."`,
  'DIALOGUE.TEXT.10004_NO_ONE_HAS_FOUND_IT_YET_ANYWAY': '"Rozsądnie. I tak go jeszcze nikt nie znalazł."'
};

export default {
  en: {
    common: enTranslations
  },
  pl: {
    common: plTranslations
  }
};
