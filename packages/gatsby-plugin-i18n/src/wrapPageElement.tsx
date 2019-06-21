import React from 'react';
import { GatsbyBrowser, GatsbySSR } from 'gatsby';

import { i18nContext, I18nContext } from './index';

interface PageContext extends I18nContext {
  location: Location;
}

type WrapPageElement =
  | GatsbyBrowser['wrapPageElement']
  | GatsbySSR['wrapPageElement']

interface PageWrapperProps {
  pageContext: PageContext;
}

const wrapPageElement: WrapPageElement = ({ element, props }) => {
  const { pageContext } = props as PageWrapperProps;
  // const translations = React.useMemo(() => Object.fromEntries(
  //   data.allLocalization.nodes.map(({locale, translations}) => [
  //     locale,
  //     Object.fromEntries(
  //       translations.map(({key, value}) => [key, value])
  //     ) as LocalizedResources,
  //   ])
  // ) as Translations, [data])

  return (
    <i18nContext.Provider value={{ locale: pageContext.locale, translations: {} }}>
      {element}
    </i18nContext.Provider>
  );
}

export default wrapPageElement;
