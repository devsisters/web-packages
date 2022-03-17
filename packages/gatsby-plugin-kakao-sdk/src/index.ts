export const Kakao: KakaoSDK =
  (typeof window !== 'undefined') ?
  (window as any).Kakao :
  null as any;

interface KakaoSDK {
  Link: KakaoTalkLinkV2;
}

interface KakaoTalkLinkV2 {
  createDefaultButton(options: KakaoTalkLinkV2CreateButtonOptions<KakaoTalkLinkV2DefaultOptions>): void;
  sendDefault(options: KakaoTalkLinkV2DefaultOptions): void;
  createScrapButton(options: KakaoTalkLinkV2CreateButtonOptions<KakaoTalkLinkV2ScrapOptions>): void;
  sendScrap(options: KakaoTalkLinkV2ScrapOptions): void;
  createCustomButton(options: KakaoTalkLinkV2CreateButtonOptions<KakaoTalkLinkV2CustomOptions>): void;
  sendCustom(options: KakaoTalkLinkV2CustomOptions): void;
}

interface KakaoTalkLinkV2Link {
  mobileWebUrl: string;
  webUrl: string;
}

type KakaoTalkLinkV2CreateButtonOptions<T> = T & {
  container: string;
};

interface KakaoTalkLinkV2Content {
  title: string;
  description: string;
  imageUrl: string;
  link: KakaoTalkLinkV2Link;
}

interface KakaoTalkLinkV2Social {
  likeCount: number;
  commentCount: number;
  sharedCount: number;
}

type KakaoTalkLinkV2DefaultOptions =
  KakaoTalkLinkV2DefaultOptionsFeedType |
  KakaoTalkLinkV2DefaultOptionsListType |
  KakaoTalkLinkV2DefaultOptionsLocationType |
  KakaoTalkLinkV2DefaultOptionsCommerceType |
  KakaoTalkLinkV2DefaultOptionsTextType;

interface KakaoTalkLinkV2DefaultOptionsBase {
  buttonTitle?: string;
  buttons?: {
    title: string;
    link: KakaoTalkLinkV2Link;
  }[];
}

interface KakaoTalkLinkV2DefaultOptionsFeedType extends KakaoTalkLinkV2DefaultOptionsBase {
  objectType: 'feed';
  content: KakaoTalkLinkV2Content;
  social?: KakaoTalkLinkV2Social;
}

interface KakaoTalkLinkV2DefaultOptionsListType extends KakaoTalkLinkV2DefaultOptionsBase {
  objectType: 'list';
  headerTitle: string;
  headerLink: KakaoTalkLinkV2Link;
  contents: KakaoTalkLinkV2Content[];
  headerImageUrl?: string;
  headerImageWidth?: number;
  headerImageHeight?: number;
}

interface KakaoTalkLinkV2DefaultOptionsLocationType extends KakaoTalkLinkV2DefaultOptionsBase {
  objectType: 'location';
  content: KakaoTalkLinkV2Content;
  address: string;
  addressTitle?: string;
  social?: KakaoTalkLinkV2Social;
}

interface KakaoTalkLinkV2DefaultOptionsCommerceType extends KakaoTalkLinkV2DefaultOptionsBase {
  objectType: 'commerce';
  content: KakaoTalkLinkV2Content;
  commerce: {
    regularPrice: number;
    discountPrice: number;
    discountRate: number;
  };
}

interface KakaoTalkLinkV2DefaultOptionsTextType extends KakaoTalkLinkV2DefaultOptionsBase {
  objectType: 'text';
  text: string;
  link: KakaoTalkLinkV2Link;
}

interface KakaoTalkLinkV2ScrapOptions {
  requestUrl: string;
  installTalk: boolean;
}

interface KakaoTalkLinkV2CustomOptions {
  templateId: string;
  templateArgs: { [arg: string]: string };
}
