import * as React from 'react';
import * as Sentry from '@sentry/browser';

export const onClientEntry = (_: any, pluginOptions: any) => {
  const { dsn } = pluginOptions;
  if (!dsn) return;
  Sentry.init({ dsn });
};

export const wrapRootElement = ({ element }: any, pluginOptions: any) => (
  pluginOptions.dsn ?
  <SentryBoundary>{ element }</SentryBoundary> :
  element
);

// https://docs.sentry.io/platforms/javascript/react/
class SentryBoundary extends React.Component {
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
