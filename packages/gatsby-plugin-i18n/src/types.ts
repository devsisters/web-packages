export interface PageInput {
  path: string;
  component: string;
  layout?: string;
  context?: any;
}

export interface Actions {
  createNode: (options: {
    id: string;
    parent: string | null;
    children: string[];
    internal: {
      mediaType?: string;
      type: string;
      content?: string;
      contentDigest: string;
      description?: string;
    };
  }) => void;
  createPage: (page: PageInput) => void;
  deletePage: (page: PageInput) => void;
  createRedirect: (
    opts: {
      fromPath: string;
      isPermanent?: boolean;
      redirectInBrowser?: boolean;
      toPath: string;
    }
  ) => void;
  setWebpackConfig: any;
}

export interface PluginOptions {
  pagesPath?: string;
  translationsPath?: string;
  languages: string[];
}

type GatsbyHook<T> = (fns: T & { actions: Actions }, options: PluginOptions, done: any) => Promise<any>;

export type GatsbyCreatePagesStatefully = GatsbyHook<{ store: any }>;

export type GatsbyOnCreatePage = GatsbyHook<{ page: PageInput }>;
