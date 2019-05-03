// Element#closest polyfill
require('element-closest')();

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    piwik: { trackEvent(category: string, action: string, name?: string, value?: string): void; };
  }
}

function trackEvent(category: string, action: string, name?: string) {
  const { gtag, piwik } = window;
  if (gtag) {
    gtag('event', 'click', Object.assign({
      event_category: category,
      event_action: action,
    }, name && {
      event_label: name,
    }));
  }
  if (piwik) {
    piwik.trackEvent(category, action, name);
  }
}

export const onClientEntry = () => {
  trackEvent('autotrack-entry', 'entry');
  window.addEventListener('click', e => {
    const target = e.target as Element;
    if (!target || !target.closest) return;
    const elementThatHasId = target.closest('[id]');
    if (!elementThatHasId) return;
    trackEvent('autotrack-click', 'click', elementThatHasId.id);
  }, true);
};

interface OnRouteUpdate {
  (
    { location, prevLocation }: { location: Location, prevLocation: Location },
    pluginOptions: any
  ): void;
  visitedHashs: Set<string>;
}
export const onRouteUpdate: OnRouteUpdate = ({ location, prevLocation }) => {
  const { visitedHashs } = onRouteUpdate;
  // 어차피 pageview는 gatsby-plugin-google-analytics와 gatsby-plugin-matomo 에서 전용 api를 따로 호출함.
  // 그래서 따로 트래킹할 필요는 없으나 편의상 이벤트로도 넣음.
  if (location.pathname !== prevLocation.pathname) {
    trackEvent('autotrack-pageview', 'pageview');
    visitedHashs.clear();
  }
  // 페이지의 어디까지 방문했는지 확인하기 위해서 location.hash 변동을 추적함.
  if (!location.hash) return;
  if (!visitedHashs.size || location.hash !== prevLocation.hash) {
    if (visitedHashs.has(location.hash)) return;
    visitedHashs.add(location.hash);
    trackEvent('autotrack-visit', 'hash', location.hash);
  }
};
onRouteUpdate.visitedHashs = new Set();
