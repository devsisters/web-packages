declare const window: {
  gtag: (...args: any[]) => void;
};

export const onRouteUpdate = ({ location }: { location: Location }, pluginOptions: any) => {
  const { trackingId } = pluginOptions;
  if (!trackingId) return;
  window.gtag('config', trackingId, {
    page_path: `${ location.pathname }${ location.search }${ location.hash }`,
  });
};
