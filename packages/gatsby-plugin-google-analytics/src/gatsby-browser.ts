declare const window: {
  ga: (...args: any[]) => void;
};

export const onRouteUpdate = ({ location }: { location: Location }, pluginOptions: any) => {
  const { trackingId } = pluginOptions;
  if (!trackingId) return;
  const { pathname, search, hash } = location;
  window.ga('send', 'pageview', pathname + search + hash);
};
