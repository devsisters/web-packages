import {
  Env,
  GetEnvOptions,
  getEnv, GetEnvError,
} from '.';

export const onCreateWebpackConfig = ({ stage, actions, plugins }: any, pluginOptions: GetEnvOptions) => {
  let env: Env;
  try { env = getEnv(pluginOptions); } catch (err) {
    /**
     * stage 종류는 4가지가 있는데 각각
     * `develop`, `develop-html`, `build-javascript`, `build-html`입니다.
     * 앞의 두 개는 `gatsby develop`, 뒤의 두 개는 `gatsby build`시에 사용되는 단계입니다.
     * 에러 메세지가 한 번만 출력되도록 하기 위해
     * `-html`로 끝나는 stage에서만 에러를 출력하도록 하였습니다.
     */
    if (!(stage as string).endsWith('-html')) return;
    for (const message of (err as GetEnvError).errors) console.error(`\x1b[41m\x1b[37m${message}\x1b[0m`);
    return;
  }
  actions.setWebpackConfig({
    plugins: [
      plugins.define(Object.assign({}, ...Object.entries(env).map(
        ([key, value]) => ({ [`process.env.${key}`]: JSON.stringify(value) })
      ))),
    ],
  });
};
