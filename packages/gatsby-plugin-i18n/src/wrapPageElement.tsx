import React from 'react';
import { GatsbyBrowser, GatsbySSR } from 'gatsby';

import { i18nContext, I18nContext } from './index';

type WrapPageElement =
  | GatsbyBrowser['wrapPageElement']
  | GatsbySSR['wrapPageElement']

interface PageWrapperProps {
  pageContext: I18nContext;
}

const wrapPageElement: WrapPageElement = ({ element, props }) => {
  const { pageContext } = props as PageWrapperProps;
  const { locale, translations } = pageContext;

  return locale && translations ? (
    <i18nContext.Provider value={{ locale, translations }}>
      {element}
    </i18nContext.Provider>
  ) : element;
}

export default wrapPageElement;
