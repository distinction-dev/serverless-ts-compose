import { formatJSONResponse } from '@/libs/apiGateway';
import { middyfy } from '@/libs/lambda';
import { APIGatewayProxyResult } from 'aws-lambda';

const hello = async (event: APIGatewayProxyResult) => {
  console.log('outputed var: ', process.env.CURRENT_STAGE);
  return formatJSONResponse({
    message: `Hello serviceA, welcome to the exciting Serverless world!`,
    event,
  });
};

export const main = middyfy(hello);
