import * as React from 'react';
import { GatsbyBrowser } from 'gatsby';
import * as Sentry from '@sentry/browser';
import { ErrorBoundary as SentryErrorBoundary } from '@sentry/react';
import { Integrations as TracingIntegrations } from '@sentry/tracing';

import { PluginOptions } from './types';

export const onClientEntry: GatsbyBrowser['onClientEntry'] = (_, pluginOptions) => {
  const { dsn, tracesSampleRate = 0.5, ...extraProps } = pluginOptions as PluginOptions || {};
  if (!dsn) return;
  Sentry.init({
    dsn,
    integrations: [
      new TracingIntegrations.BrowserTracing(),
    ],
    tracesSampleRate,
    ...extraProps
  });
};

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({ element }, pluginOptions) => (
  pluginOptions.dsn
    ? <SentryErrorBoundary>{element}</SentryErrorBoundary>
    : element
);
