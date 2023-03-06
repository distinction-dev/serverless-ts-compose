const serverlessComposeConfiguration = {
  services: {
    serviceA: {
      path: './serviceA',
    },
    serviceB: {
      path: './serviceB',
      params: {
        stageName: '${serviceA.stageName}',
      },
      dependsOn: ['serviceA'],
    },
  },
};

module.exports = serverlessComposeConfiguration;
