import React from 'react';
import { GatsbyBrowser } from 'gatsby';
import Sentry from '@sentry/browser';

import { PluginOptions } from './types';

export const onClientEntry: GatsbyBrowser['onClientEntry'] = (_, pluginOptions) => {
  const { dsn, ...extraProps } = pluginOptions as PluginOptions || {};
  if (!dsn) return;
  Sentry.init({ dsn, ...extraProps });
};

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({ element }, pluginOptions) => (
  pluginOptions.dsn
    ? <SentryBoundary>{element}</SentryBoundary>
    : element
);

// https://docs.sentry.io/platforms/javascript/react/
class SentryBoundary extends React.PureComponent {
  componentDidCatch(error: any, errorInfo: any) {
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });
      Sentry.captureException(error);
    });
  }
  render() {
    return this.props.children;
  }
}
