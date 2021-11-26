import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import * as AWS from "aws-sdk";
import schema from "./schema";

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const dynamo = new AWS.DynamoDB.DocumentClient({
    region: "localhost",

    endpoint: "http://localhost:8000",
  });
  const data = await dynamo
    .get({
      TableName: "HamzaTable",
      Key: { id: event.body.id },
    })
    .promise();
  // let body = await dynamo.scan({ TableName: "HamzaTable" }).promise();

  return formatJSONResponse({
    data,
    event,
  });
};

export const main = middyfy(hello);
