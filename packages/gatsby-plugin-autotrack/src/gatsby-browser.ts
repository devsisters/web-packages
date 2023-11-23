// Element#closest polyfill
import polyfill from 'element-closest';
if (typeof window !== 'undefined') polyfill(window);

import { onhashchange } from '.';

declare global {
  interface Window {
    ga: (...args: any[]) => void;
    piwik: { trackEvent(category: string, action: string, name?: string, value?: string): void; };
  }
}

function trackEvent(category: string, action: string, name?: string) {
  const { ga, piwik } = window;
  if (ga) {
    ga('send', 'event', category, action, name);
  }
  if (piwik) {
    piwik.trackEvent(category, action, name);
  }
}

export const onClientEntry = () => {
  { // 사이트 접속 추적
    // pathname이 변경된 것은 사이트 접속으로 보지 않음.
    trackEvent('autotrack-entry', 'entry', location.pathname);
  }
  window.addEventListener('click', e => {
    const target = e.target as Element;
    if (!target || !target.closest) return;
    const element = target.closest('a[id], button[id], input[id]');
    if (!element) return;
    trackEvent('autotrack-click', 'click', element.id);
  }, true);
  { // 페이지의 어디까지 방문했는지 확인하기 위해서 location.hash 변동을 추적함.
    let timerId: number;
    onhashchange(hash => {
      window.clearTimeout(timerId);
      if (!hash) return;
      // hash가 변경되고 0.5초 이상 그대로 유지될 경우 사용자가 유의미하게 해당 화면을 방문했다고 간주함.
      timerId = window.setTimeout(() => {
        trackEvent('autotrack-visit', 'hash', hash);
      }, 500);
    });
  }
};

interface OnRouteUpdate {
  (
    { location, prevLocation }: { location: Location, prevLocation: Location },
    pluginOptions: any
  ): void;
}
export const onRouteUpdate: OnRouteUpdate = ({ location, prevLocation }) => {
  // 어차피 pageview는 gatsby-plugin-google-analytics와 gatsby-plugin-matomo 에서 전용 api를 따로 호출함.
  // 그래서 따로 트래킹할 필요는 없으나 편의상 이벤트로도 넣음.
  if (!prevLocation || location.pathname !== prevLocation.pathname) {
    trackEvent('autotrack-pageview', 'pageview', location.pathname);
  }
};
