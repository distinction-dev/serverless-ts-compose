/* eslint-disable no-template-curly-in-string */
import type { ServerlessFrameworkConfiguration } from 'serverless-schema';

import { functions } from './src/functions';

const serverlessConfiguration: ServerlessFrameworkConfiguration = {
  service: 'sls-ts-serviceA',
  useDotenv: true,
  custom: {
    esbuild: {
      bundle: true,
      minify: true,
      sourcemap: true,
    },
    stage: '${opt:stage, self:provider.stage}',
    stages: ['uat', 'prod'],
    prune: {
      automatic: true,
      number: 3,
    },
    ssmPublish: {
      enabled: true,
      params: [
        {
          path: '/slsTs/stage',
          value: '${self:provider.stage}',
        },
      ],
    },
  },
  plugins: [
    'serverless-esbuild',
    'serverless-offline',
    'serverless-stage-manager',
    'serverless-prune-plugin',
    'serverless-ssm-publish',
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
    region: 'us-east-1',
    stage: '${opt:stage, self:provider.stage}',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
      metrics: false, // activate to see CacheHits and Misses
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
  },
  functions,
  package: {
    individually: true,
  },
  resources: {
    Outputs: {
      stageName: {
        Value: '${self:provider.stage}',
      },
    },
  },
};

module.exports = serverlessConfiguration;
