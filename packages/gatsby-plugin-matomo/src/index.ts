export const Piwik: Piwik =
  (typeof window !== 'undefined') ?
  (window as any).Piwik :
  null as any;

export const piwik: PiwikTracker =
  (typeof window !== 'undefined') ?
  (window as any).piwik :
  null as any;

// https://developer.matomo.org/api-reference/tracking-javascript
export interface Piwik {
  getTracker(trackerUrl: string, siteId: string): PiwikTracker;
}

export interface PiwikTracker {
  trackEvent(category: string, action: string, name?: string, value?: string): void;
  trackPageView(customTitle?: string): void;
  trackSiteSearch(keyword: string, category?: string, resultsCount?: number): void;
  trackGoal(idGoal?: string, customRevenue?: number): void;
  trackLink(url: string, linkType: 'link' | 'download'): void;
  trackAllContentImpressions(): void;
}
