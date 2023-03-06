# Serverless - AWS Node.js Typescript

This project is template for serverless compose using typescript.

Some personal modifications are:

- Git hooks with [Husky](https://typicode.github.io/husky/), running ESLint, Prettier and Tests on every commit.
- Open API documentation with [redoc-cli](https://github.com/Redocly/redoc).
- Packaging using esbuild [serverless-esbuild](https://github.com/floydspace/serverless-esbuild)
- Publish ssm with reference from stack resources[serverless-ssm-publish](https://github.com/mysense-ai/ServerlessPlugin-SSMPublish)
- Prune of Old Lambda Versions with [serverless-prune-plugin](https://github.com/claygregory/serverless-prune-plugin).

## Installation/deployment instructions

- Run `yarn` to install the project dependencies
- Run `yarn sls deploy` to deploy this stack to AWS

## Test your service

This template contains 2 services stack with a single lambda function in each stack triggered by an HTTP request made on the provisioned API Gateway REST API `/hello` route with `GET` method.

- requesting any other path than `/hello` with any other method than `GET` will result in API Gateway returning a `403` HTTP error code
- sending a `GET` request to `/hello` will result in API Gateway returning a `200` HTTP status code with a message saluting the provided name and the detailed event processed by the lambda

> :warning: As is, this template, once deployed, opens a **public** endpoint within your AWS account resources. Anybody with the URL can actively execute the API Gateway endpoint and the corresponding lambda. You should protect this endpoint with the authentication method of your choice.

### Remotely

Copy and replace your `url` - found in Serverless `deploy` command output - and `name` parameter in the following `curl` command in your terminal or in Postman to test your newly deployed application.

```
curl --location --request GET 'https://myApiEndpoint/dev/hello' \
--header 'Content-Type: application/json'
```

## Template features
It uses serverless-ssm-publish package, which publishes current environment name to SSM as a example.
You can publish any kind of refs to ARN or resources name to SSM after deployment and use those SSM in your code. 

Other feature is you can output variables from one stack to another and use it using ${param:name_of_outputed_param}

### Project structure

The project code base is mainly located within the `src` folder. This folder is divided in:

- `functions` - containing code base and configuration for your lambda functions
- `libs` - containing shared code base between your lambdas

```
.
├──serviceA
│   ├── src
│   │   ├── functions            # Lambda configuration and source code folder
│   │   │   ├── hello
│   │   │   │   ├── handler.ts   # `Hello` lambda source code
│   │   │   │   ├── index.ts     # `Hello` lambda Serverless configuration
│   │   │   │   ├── mock.json    # `Hello` lambda input parameter, if any, for local invocation
│   │   │   │   └── schema.ts    # `Hello` lambda input event JSON-Schema
│   │   │   │
│   │   │   └── index.ts         # Import/export of all lambda configurations
│   │   │
│   │   └── libs                 # Lambda shared code
│   │       └── apiGateway.ts    # API Gateway specific helpers
│   │
│   ├── package.json
│   ├── serverless.ts            # Serverless service file
│   └── tsconfig.json            # Typescript compiler configuration
├──serviceB
│   
├──serverless-compose.ts
├──package.json
├──yarn.lock
├──docs  
│
```

### 3rd party librairies

- [json-schema-to-ts](https://github.com/ThomasAribart/json-schema-to-ts) - uses JSON-Schema definitions used by API Gateway for HTTP request validation to statically generate TypeScript types in your lambda's handler code base
- [middy](https://github.com/middyjs/middy) - middleware engine for Node.Js lambda. This template uses [http-json-body-parser](https://github.com/middyjs/middy/tree/master/packages/http-json-body-parser) to convert API Gateway `event.body` property, originally passed as a stringified JSON, to its corresponding parsed object
- [@serverless/typescript](https://github.com/serverless/typescript) - provides up-to-date TypeScript definitions for your `serverless.ts` service file
- [redoc-cli](https://github.com/Redocly/redoc) - provides a tool to configure and write our documentation using [OpenAPI Specification](https://swagger.io/specification).
- [serverless-prune-plugin](https://github.com/claygregory/serverless-prune-plugin) - prunes old lambda versions.
- [serverless-ssm-publish](https://github.com/mysense-ai/ServerlessPlugin-SSMPublish) - Publish custom data to AWS SSM Parameter Store from serverless.yaml or Cloud Formation Output
- [serverless-esbuild](https://github.com/floydspace/serverless-esbuild) - Serverless Framework plugin for zero-config JavaScript and TypeScript code bundling using promising fast & furious esbuild bundler and minifier
