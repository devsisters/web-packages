import * as React from 'react';
import memoize = require('lodash.memoize');

import { i18nContext, I18nContext, Locale, Translations, I18nPageContext } from './index';

type Props = {
  element: React.ReactNode;
  props: I18nPageContext & {
    location: Location;
  };
}
const defaultLocaleObject = { language: 'ko', script: null, region: null };
const emptyObject = {};
const getState = memoize(
  (locale: Locale, translations: Translations): I18nContext => ({
    locale,
    translations,
  })
);
const wrapPageElement: React.FC<Props> = ({ element, props: { pageContext } }) => {
  const {
    locale = defaultLocaleObject,
    translations = emptyObject,
  } = pageContext || (emptyObject as any);
  return (
    <i18nContext.Provider value={getState(locale, translations)}>
      {element}
    </i18nContext.Provider>
  );
}

export default wrapPageElement;
