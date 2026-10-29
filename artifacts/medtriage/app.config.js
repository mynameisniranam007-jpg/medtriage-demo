module.exports = ({ config }) => ({
  ...config,
  web: {
    ...config.web,
    output: 'single',
  },
  experiments: {
    ...config.experiments,
    baseUrl: process.env.EXPO_BASE_URL ?? '',
  },
});
