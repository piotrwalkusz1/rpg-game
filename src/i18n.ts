import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      'ACTION.ACTION_TYPE.ENTER_BUILDING': 'Enter the building',
      'ACTION.ACTION_TYPE.ENTER_BUILDING.DIALOGUE_001_YOU_CANNOT_ENTER': 'You cannot enter!',
      'ACTION.ACTION_TYPE.GO': 'Go',
      'ACTION.CHOOSE_ACTION': 'Choose action',
      'MAP.FIELD.EMPTY': 'Empty field',
      'MAP.FIELD.EMPTY.DESCRIPTION': 'There is nothing here.',
      'MAP.FIELD.GRASS': 'Grass',
      'MAP.FIELD.GRASS.DESCRIPTION': 'The land is covered with grass.',
      'BUILDING.CHARACTER_PLACEMENT_ON_FIELD_WITH_BUILDING.OUTSIDE.CHARACTER_DESCRIPTION': `<character/> is outside of the building.`,
      'BUILDING.CHARACTER_PLACEMENT_ON_FIELD_WITH_BUILDING.INSIDE.CHARACTER_DESCRIPTION': `<character/> is inside the building.`
    }
  },
  pl: {
    translation: {
      'ACTION.ACTION_TYPE.ENTER_BUILDING': 'Wejdź do budynku',
      'ACTION.ACTION_TYPE.ENTER_BUILDING.DIALOGUE_001_YOU_CANNOT_ENTER': 'Nie możesz wejść!',
      'ACTION.ACTION_TYPE.GO': 'Idź',
      'ACTION.CHOOSE_ACTION': 'Wybierz akcję',
      'MAP.FIELD.EMPTY': 'Puste pole',
      'MAP.FIELD.EMPTY.DESCRIPTION': 'Nic tutaj nie ma.',
      'MAP.FIELD.GRASS': 'Trawa',
      'MAP.FIELD.GRASS.DESCRIPTION': 'Teren porośnięty trawą.',
      'BUILDING.CHARACTER_PLACEMENT_ON_FIELD_WITH_BUILDING.OUTSIDE.CHARACTER_DESCRIPTION': `<character/> jest na zewnątrz budynku.`,
      'BUILDING.CHARACTER_PLACEMENT_ON_FIELD_WITH_BUILDING.INSIDE.CHARACTER_DESCRIPTION': `<character/> jest wewnątrz budynku.`
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false // react already safes from xss
  }
});

export default i18n;
