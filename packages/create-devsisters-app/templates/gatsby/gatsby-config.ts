import type { GatsbyConfig, IPluginRefObject } from "gatsby";
import type { FileSystemOptions } from "gatsby-source-filesystem";
import type { PluginOptions as TypegenPlugionOptions } from "gatsby-plugin-typegen/types";
import type { PluginOptions as ModuleResolverOptions } from "gatsby-plugin-module-resolver/types";
import type { S3PluginOptions } from "gatsby-plugin-s3/types";

type OverrideProps<TBaseProps, TNewProps> = Omit<TBaseProps, keyof TNewProps> &
  TNewProps;

if (!process.env.PUBLIC_URL) {
  throw new Error("PUBLIC_URL 환경변수를 세팅해주세요");
}

if (!process.env.S3_BUCKET_NAME) {
  throw new Error("S3_BUCKET_NAME 환경변수를 세팅해주세요");
}

const publicURL = new URL(process.env.PUBLIC_URL);
const bucketName = process.env.S3_BUCKET_NAME;

type PluginRef<Resolve extends string, Options = unknown> = OverrideProps<
  IPluginRefObject,
  {
    resolve: Resolve;
    options: Options;
  }
>;

type PluginConfig =
  | string
  | PluginRef<"gatsby-plugin-manifest">
  | PluginRef<"gatsby-source-filesystem", FileSystemOptions>
  | PluginRef<"gatsby-plugin-typegen", TypegenPlugionOptions>
  | PluginRef<"gatsby-plugin-module-resolver", ModuleResolverOptions>
  | PluginRef<"gatsby-plugin-s3", S3PluginOptions>;

export const siteMetadata: GatsbyConfig["siteMetadata"] = {
  siteUrl: publicURL.origin,
  title: "create-devsisters-app",
  description: "create-devsisters-app",
};

export const plugins: PluginConfig[] = [
  "gatsby-plugin-sharp",
  "gatsby-transformer-sharp",
  "gatsby-plugin-svgr",
  {
    resolve: "gatsby-plugin-module-resolver",
    options: {
      root: "./",
      aliases: {
        "~": ".",
      },
    },
  },
  {
    resolve: "gatsby-source-filesystem",
    options: {
      name: "images",
      path: `${__dirname}/src/images`,
    },
  },
  {
    resolve: "gatsby-plugin-typegen",
    options: {
      emitSchema: {
        "src/__generated__/gatsby-schema.graphql": true,
        "src/__generated__/gatsby-schema.json": true,
      },
      emitPluginDocuments: {
        "src/__generated__/gatsby-plugin-documents.graphql": true,
      },
    },
  },
  {
    resolve: "gatsby-plugin-manifest",
    options: {
      name: "create-devsisters-app",
      short_name: "create-devsisters-app",
      description: "create-devsisters-app",
      start_url: "/",
      lang: "ko",
      background_color: "#FFFFFF",
      theme_color: "#FFFFFF",
      display: "minimal-ui",
      icon: "src/images/icon.svg",
    },
  },
  {
    resolve: "gatsby-plugin-s3",
    options: {
      bucketName,
      protocol: publicURL.protocol.slice(0, -1) as "https",
      hostname: publicURL.hostname,
    },
  },
];
