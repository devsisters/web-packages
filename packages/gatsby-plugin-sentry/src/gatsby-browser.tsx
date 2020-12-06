import * as React from 'react';
import { GatsbyBrowser } from 'gatsby';
import * as Sentry from '@sentry/browser';
import { ErrorBoundary as SentryErrorBoundary } from '@sentry/react';

import { PluginOptions } from './types';

export const onClientEntry: GatsbyBrowser['onClientEntry'] = (_, pluginOptions) => {
  const { dsn, ...extraProps } = pluginOptions as PluginOptions || {};
  if (!dsn) return;
  Sentry.init({
    dsn,
    ...extraProps
  });
};

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({ element }, pluginOptions) => (
  pluginOptions.dsn
    ? <SentryErrorBoundary>{element}</SentryErrorBoundary>
    : element
);
