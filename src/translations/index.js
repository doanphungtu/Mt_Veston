import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as resources from './resources';
import {store} from '~/store';

i18n.use(initReactI18next).init({
  resources: {
    ...Object.entries(resources).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: {
          translation: value,
        },
      }),
      {},
    ),
  },
  lng: store.getState().session.language,
  compatibilityJSON: 'v3',
});

export default i18n;
