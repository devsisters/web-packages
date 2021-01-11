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
    terms: { link: Link },
    privacy: { link: Link },
    cs: { link: Link },
    items: Array<{ label: string, link: Link}>,
    socials: Array<{ symbol: string, label: string, link: Link}>,
  };
  const body = {
    language: normalizeLanguage(node.lang as string),
    terms: (node.data as NodeData).terms.link.url,
    privacy: (node.data as NodeData).privacy.link.url,
    cs: (node.data as NodeData).cs.link.url,
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

    type SiteNavigationSocial {
      service: SiteNavigationSocialService!
      entry: SiteNavigationEntry!
    }

    type SiteNavigation implements Node @dontInfer {
      language: String!
      terms: String!
      privacy: String!
      cs: String!
      entries: [SiteNavigationEntry!]!
      socials: [SiteNavigationSocial!]!
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
