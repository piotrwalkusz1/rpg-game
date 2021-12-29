import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      'ACTION.ACTION_TYPE.INVESTIGATE_BUILDING': 'Investigate building',
      'ACTION.ACTION_TYPE.INVESTIGATE_BUILDING.TITLE': 'Investigate building',
      'ACTION.ACTION_TYPE.GO': 'Go',
      'ACTION.CHOOSE_ACTION': 'Choose action',
      'MAP.FIELD.EMPTY': 'Empty field',
      'MAP.FIELD.EMPTY.DESCRIPTION': 'There is nothing here.',
      'MAP.FIELD.GRASS': 'Grass',
      'MAP.FIELD.GRASS.DESCRIPTION': 'The land is covered with grass.'
    }
  },
  pl: {
    translation: {
      'ACTION.ACTION_TYPE.INVESTIGATE_BUILDING': 'Zbadaj budynek',
      'ACTION.ACTION_TYPE.INVESTIGATE_BUILDING.TITLE': 'Zbadaj budynek',
      'ACTION.ACTION_TYPE.GO': 'Idź',
      'ACTION.CHOOSE_ACTION': 'Wybierz akcję',
      'MAP.FIELD.EMPTY': 'Puste pole',
      'MAP.FIELD.EMPTY.DESCRIPTION': 'Nic tutaj nie ma.',
      'MAP.FIELD.GRASS': 'Trawa',
      'MAP.FIELD.GRASS.DESCRIPTION': 'Teren porośnięty trawą.'
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
