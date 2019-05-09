declare module 'bcp-47' {
  export interface Schema {
    language: string;
    extendedLanguageSubtags: string[];
    script: string | null;
    region: string | null;
    variants: string[];
    extensions: string[];
    privateuse: string[];
    irregular: string | null;
    regular: string | null;
  }
  export interface ParseOptions {
    normalize?: boolean;
    forgiving?: boolean;
    warning?: boolean;
  }
  export function parse(string: string, options?: ParseOptions): Schema;
  export function stringify(schema: Schema): string;
}
