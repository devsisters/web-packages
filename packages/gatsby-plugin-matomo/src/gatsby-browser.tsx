declare const window: {
  Piwik: any;
  piwik: any;
};

export const onClientEntry = (_: any, pluginOptions: any) => {
  const { trackerUrl, siteId } = pluginOptions;
  if (!trackerUrl || !siteId) return;
  window.piwik = window.Piwik.getTracker(trackerUrl, siteId);
};

export const onRouteUpdate = ({ location }: { location: Location }, pluginOptions: any) => {
  const { trackerUrl, siteId } = pluginOptions;
  if (!trackerUrl || !siteId) return;
  window.piwik.trackPageView();
};
