declare module 'gatsby-plugin-module-resolver/types' {
  export type PluginOptions = {
    root: string;
    aliases?: Record<string, string | { root?: string; alias: string }>;
  };
}
