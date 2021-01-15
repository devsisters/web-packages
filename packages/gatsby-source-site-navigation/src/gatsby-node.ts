import type { GatsbyNode as _GatsbyNode } from 'gatsby';
import type { ThemeOptions } from './types';
import { normalizeLanguage, normalizeSocialServiceName } from './lib';

type NormalizeGatsbyNodeAPI<T extends keyof _GatsbyNode> = _GatsbyNode[T] extends infer U
  ? U extends ((...args: infer Params) => infer Return)
  ? ((...args: Params) => Return)
  : never
  : never;

type GatsbyNode = {
  [K in keyof _GatsbyNode]: NormalizeGatsbyNodeAPI<K>;
}

type ValidPluginOptions = {
  navigationId: string,
  [key: string]: unknown,
};

export const onCreateNode: GatsbyNode['onCreateNode'] = ({
  node,
  actions,
  createNodeId,
  createContentDigest,
}, pluginOptions) => {
    // Validated by Gatsby API
  const options = pluginOptions as unknown as ValidPluginOptions;

  if (node.internal.type !== 'PrismicSiteNavigation') {
    return;
  }

  if (node.uid !== options.navigationId) {
    return;
  }

  type Link = {
    url: string,
  };
  type NodeData = {
    trailerId: string,
    terms: { url: string },
    privacy: { url: string },
    cs: { url: string },
    socialtype: string,
    address: string,
    tel: string,
    fax: string,
    items: Array<{ label: string, link: Link}>,
    socials: Array<{ symbol: string, label: string, link: Link}>,
    appInformation: { googleAppId?: string, appleAppId?: string, onestoreAppId?: string, onelink: Link },
  };
  const body = {
    language: normalizeLanguage(node.lang as string),
    trailerId: (node.data as NodeData).trailerId,
    terms: (node.data as NodeData).terms.url,
    privacy: (node.data as NodeData).privacy.url,
    cs: (node.data as NodeData).cs.url,
    socialType: (node.data as NodeData).socialtype,
    company: {
      address: (node.data as NodeData).address,
      tel: (node.data as NodeData).tel,
      fax: (node.data as NodeData).fax,
    },
    entries: (node.data as NodeData).items.map((item) => ({
      label: item.label,
      url: item.link.url,
    })),
    socials: (node.data as NodeData).socials.map((social) => ({
      service: normalizeSocialServiceName(social.symbol),
      entry: {
        label: social.label,
        url: social.link.url,
      },
    })),
    appInformation:
    (node.data as NodeData).appInformation.onelink ?
    {
      ...(node.data as NodeData).appInformation,
      onelink: (node.data as NodeData).appInformation.onelink.url,
    }
    : (node.data as NodeData).appInformation,
  };

  actions.createNode({
    id: createNodeId(`${node.id} >>> SiteNavigation`),
    parent: node.id,
    ...body,
    internal: {
      type: 'SiteNavigation',
      contentDigest: createContentDigest(body),
    },
  });
};

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = ({
  actions,
}) => {
  const gql = String.raw;

  actions.createTypes(gql`
    type SiteNavigationEntry {
      label: String!
      url: String!
    }

    enum SiteNavigationSocialService {
      FORUM
      DISCORD
      YOUTUBE
      REDDIT
      FACEBOOK
      TWITTER
      INSTAGRAM
      WEIBO
      BILIBILI
      NAVER_CAFE
    }

    enum MainSocialType {
      TWITTER
      FACEBOOK
      NAVER_CAFE
    }

    type SiteNavigationSocial {
      service: SiteNavigationSocialService!
      entry: SiteNavigationEntry!
    }

    type CompanyInfo {
      address: String!
      tel: String!
      fax: String!
    }

    type AppInformation {
      googleAppId: String
      appleAppId: String
      onestoreAppId: String
      onelink: String!
    }

    type SiteNavigation implements Node @dontInfer {
      language: String!
      trailerId: String!
      terms: String!
      privacy: String!
      cs: String!
      socialType: MainSocialType!
      company: CompanyInfo!
      entries: [SiteNavigationEntry!]!
      socials: [SiteNavigationSocial!]!
      appInformation: AppInformation!
    }
  `);
};

export const pluginOptionsSchema: GatsbyNode['pluginOptionsSchema'] = ({
  Joi,
}) => {
  return Joi.object({
    repositoryName: Joi.string().required(),
    accessToken: Joi.string().required(),
  });
};
