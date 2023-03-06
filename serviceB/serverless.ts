/* eslint-disable no-template-curly-in-string */
import type { ServerlessFrameworkConfiguration } from 'serverless-schema';

import { functions } from './src/functions';

const serverlessConfiguration: ServerlessFrameworkConfiguration = {
  service: 'sls-ts-serviceB',
  useDotenv: true,
  custom: {
    esbuild: {
      bundle: true,
      minify: true,
      sourcemap: true,
    },
    stage: '${param:stageName}',
    stages: ['uat', 'prod'],
    prune: {
      automatic: true,
      number: 3,
    },
  },
  plugins: [
    'serverless-esbuild',
    'serverless-offline',
    'serverless-stage-manager',
    'serverless-prune-plugin',
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
    region: 'us-east-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
      metrics: false, // activate to see CacheHits and Misses
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      CURRENT_STAGE: '${param:stageName}',
    },
  },
  package: {
    individually: true,
  },
  functions,
};

module.exports = serverlessConfiguration;
