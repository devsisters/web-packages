import { GatsbyNode, Node } from 'gatsby';
import path from 'path';
import YAML from 'yaml';
import readdir from 'recursive-readdir';

import {
  GatsbyI18nPluginOptions,
  LocalizationData,
  LocalizedResources,
  Translations,
} from './types';

function mustValidOptions(options: unknown): GatsbyI18nPluginOptions {
  const {
    pagesPath = 'src/@pages',
    translationsPath = 'src/translations',
  } = options as GatsbyI18nPluginOptions
  // Add future validations here
  return {
    pagesPath: path.resolve(process.cwd(), pagesPath),
    translationsPath: path.resolve(process.cwd(), translationsPath),
  };
}

export const onCreateNode: GatsbyNode['onCreateNode'] = async ({
  node,
  actions,
  loadNodeContent,
  createNodeId,
  createContentDigest,
}, options) => {
  const i18nOptions = mustValidOptions(options);
  const { createNode, createParentChildLink } = actions;

  if (node.internal.mediaType !== 'text/yaml'
    && node.dir !== i18nOptions.translationsPath) {
    return
  }

  const content = await loadNodeContent(node);
  const parsedContent = YAML.parse(content) as LocalizationData;

  type LocalizationNode = Node & LocalizationData
  const localizationNode: LocalizationNode = {
    locale: node.name!,
    translations: Object.entries(parsedContent).map(([key, value]) => ({ key, value })),
    id: createNodeId(`${node.id} >>> Localization`),
    parent: node.id,
    children: [],
    internal: {
      contentDigest: createContentDigest(parsedContent),
      type: 'Localization',
    } as any,
  }

  createNode(localizationNode)
  createParentChildLink({ parent: node, child: localizationNode })
};

export const createPages: GatsbyNode['createPages'] = async ({ actions, graphql }, options) => {
  const i18nOptions = mustValidOptions(options);
  const { createPage } = actions;

  const { data, errors } = await graphql(`
    {
      allLocalization {
        nodes {
          locale
          translations {
            key
            value
          }
        }
      }
    }
  `)
  if (errors) {
    throw new Error('Failed to query for allLocalizations');
  }

  const filePaths = await readdir(i18nOptions.pagesPath);
  const l10ns: LocalizationData[] = data.allLocalization.nodes
  const translations = Object.fromEntries(
    l10ns.map(({locale, translations}) => [
      locale,
      Object.fromEntries(
        translations.map(({key, value}) => [key, value])
      ) as LocalizedResources,
    ])
  ) as Translations;

  l10ns
    .map(l10n => l10n.locale)
    .map(locale => filePaths.map(filePath => [locale, filePath]))
    .flat()
    .map(([locale, filePath]) => {
      const [name] = path.basename(filePath).split('.');

      let slug = `/${locale}`;
      if (name !== 'index') {
        slug += `/${name}`
      }

      return {
        path: slug,
        component: filePath,
        context: { locale, translations },
      }
    })
    .forEach(pageProp => createPage(pageProp))
};
