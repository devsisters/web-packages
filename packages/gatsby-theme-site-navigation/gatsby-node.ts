import type { GatsbyNode as _GatsbyNode } from 'gatsby';

import { mustValidOptions, normalizeLanguage } from './lib';

type NormalizeGatsbyNodeAPI<T extends keyof _GatsbyNode> = _GatsbyNode[T] extends infer U
  ? U extends ((...args: infer Params) => any)
  ? ((...args: Params) => (void | Promise<void>))
  : never
  : never;

type GatsbyNode = {
  [K in keyof _GatsbyNode]: NormalizeGatsbyNodeAPI<K>;
}

const gql = String.raw;

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = ({
  actions,
}) => {
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
      entries: [SiteNavigationEntry!]!
      socials: [SiteNavigationSocial!]!
    }
  `);
};

export const onCreateNode: GatsbyNode['onCreateNode'] = ({
  node,
  actions,
  createNodeId,
  createContentDigest,
}, pluginOptions) => {
  const options = mustValidOptions(pluginOptions);

  if (node.internal.type !== 'PrismicSiteNavigation') {
    return;
  }

  if (node.uid !== options.navigationId) {
    return;
  }

  type $FIXME = any;
  const body = {
    language: normalizeLanguage(node.lang as string),
    entries: (node.data as $FIXME).items.map((item: $FIXME) => ({
      label: item.label,
      url: item.link.url,
    })),
    socials: (node.data as $FIXME).socials.map((social: $FIXME) => ({
      service: social.symbol.toUpperCase(),
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
