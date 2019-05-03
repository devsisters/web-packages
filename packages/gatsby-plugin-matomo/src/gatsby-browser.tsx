declare const window: {
  piwik: any;
};

export const onRouteUpdate = ({ location }: { location: Location }, pluginOptions: any) => {
  const { trackerUrl, siteId } = pluginOptions;
  if (!trackerUrl || !siteId) return;
  window.piwik.trackPageView();
};
