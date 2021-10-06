type Params = {
    actions: { setWebpackConfig: Function },
    plugins: { provide: Function }
}

export const onCreateWebpackConfig = ({
  actions,
  plugins,
}: Params) => {
  actions.setWebpackConfig({
    plugins: [
        plugins.provide({ Buffer: ['buffer', 'Buffer'] })
    ],
  });
};
