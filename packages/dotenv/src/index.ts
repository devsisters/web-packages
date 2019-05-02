import * as fs from 'fs';
import * as path from 'path';

import * as shell from 'shelljs';

export interface Env { [key: string]: string; }
export interface Parser { (envText: string): IterableIterator<[string, string]>; }
export interface Evaluator { (valueText: string, env: Env): string; }

const envRegex = /^\s*(?:export\s+)?([\w\.]+)[ \t]*(?:=|:)[ \t]*('(?:\\'|[^'])*'|"(?:\\"|[^"])*"|[^#\r\n]+?)?\s*(?:#.*?)?$|^.+?$|\n/gm;
//                |______________________________________________________________________________________________________| |______|
//                    |____________||_______|      |_____|  |   |___________________________________________|   |_______|      |
//       optional export ___|  key ___| separator_____|     |____ key value pair     |___ value          comment ___|   etc ___|

export function* parser(text: string): IterableIterator<[string, string]> {
  envRegex.lastIndex = 0;
  while (true) {
    const execResult = envRegex.exec(text);
    if (!execResult) break;
    const [_, key, value = ''] = execResult;
    if (!key) continue;
    yield [key, value];
  }
}

export interface CreateEvaluatorOption {
  variableSubstitution?: boolean;
  commandSubstitution?: boolean;
}
const defaultCreateEvaluatorOption: CreateEvaluatorOption = {
  variableSubstitution: true,
  commandSubstitution: true,
}
export function createEvaluator(option: CreateEvaluatorOption = defaultCreateEvaluatorOption) {
  return function evaluateValue(text: string, env: Env): string {
    const firstChar = text[0];
    if (firstChar === '\'') return text.slice(1, text.length - 1);
    let value = text;
    if (firstChar === '\"') {
      value = text.slice(1, text.length - 1);
      value = value.replace(/\\r/g, '\r').replace(/\\n/g, '\n');
      value = value.replace(/\\([^$])/g, '$1');
    }
    if (option.variableSubstitution) {
      value = value.replace(
        /\\?\$(?:\{([A-Z0-9_]+)\}|([A-Z0-9_]+))/gi,
        (_, key1, key2) => (key1 || key2) && env[key1 || key2] || '',
      );
    }
    if (option.commandSubstitution) {
      value = value.replace(
        /\\?\$(?:\(([^()]+?)\))/gi,
        (_, command) => command && shell.exec(command, { silent: true }).stdout as string || '',
      );
    }
    return value;
  };
}

export const evaluator = createEvaluator();

export class GetEnvError extends Error {
  constructor(public errors: string[]) { super(errors.join('\n')); }
}

export interface GetEnvOptions {
  profile?: string;
  dir?: string;
  requiredKeys?: string[];
  env?: Env | typeof process.env;
  parser?: Parser;
  evaluator?: Evaluator;
}

/**
 * 사용하고자 하는 환경변수들을 반환합니다.
 * 파일을 읽는 것 외의 부수효과를 발생시키지 않습니다.
 * @param options
 */
export function getEnv(options: GetEnvOptions = {}): Env {
  const profile = (('profile' in options) ? options.profile : process.env.DOTENV) || '';
  const dir = (('dir' in options) ? options.dir : process.env.DOTENV_DIR) || '.env';
  const requiredKeys = options.requiredKeys || [];
  const parserImpl = options.parser || parser;
  const evaluatorImpl = options.evaluator || evaluator;
  const errors: string[] = [];
  const logError = (message: string) => errors.push(message);
  const panic = (message?: string) => {
    message && logError(message);
    return new GetEnvError(errors);
  };
  if (!profile) throw panic('DOTENV 프로필을 설정해주세요 (dev, stage, production, ...etc)');
  let envDir: string[];
  try { envDir = fs.readdirSync(path.resolve(dir)); } catch { throw panic(`${dir} 폴더를 만들어주세요.`); }
  try {
    // https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
    const filenames = [
      `.env.${profile}.local`, // 1st
      (profile !== 'test') && '.env.local', // 2nd
      `.env.${profile}`, // 3rd
      '.env', // last
    ].filter(x => x) as string[];
    const env = Object.assign({}, options.env || process.env) as Env;
    const result: Env = {};
    (env as any).__proto__ = result;
    filenames.reduceRight((result, envFilename) => {
      if (!envDir.includes(envFilename)) return result;
      const envFile = fs.readFileSync(path.resolve(dir, envFilename), 'utf8');
      for (const [key, value] of parserImpl(envFile)) result[key] = evaluatorImpl(value, env);
      return result;
    }, result);
    for (const requiredKey of requiredKeys) {
      if (!(requiredKey in result)) logError(`키가 누락되었습니다: ${requiredKey}`);
    }
    return result;
  } finally {
    if (errors.length) throw panic();
  }
}

/**
 * `process.env`로 환경변수들을 불러옵니다.
 * @param options
 */
export function loadEnv(options: GetEnvOptions) {
  return Object.assign(process.env, getEnv(options));
}
