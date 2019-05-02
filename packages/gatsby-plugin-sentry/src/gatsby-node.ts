export function onCreateBabelConfig({ actions }: any) {
  actions.setBabelPlugin({
    name: '@babel/plugin-proposal-decorators',
    options: { legacy: true },
  });
}
