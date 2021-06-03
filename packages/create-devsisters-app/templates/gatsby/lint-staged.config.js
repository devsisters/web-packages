module.exports = {
  'src/**/*.{ts,tsx}': () => 'yarn check-types',
  'src/**/*.{js,jsx,ts,tsx}': ['eslint --fix'],
};
