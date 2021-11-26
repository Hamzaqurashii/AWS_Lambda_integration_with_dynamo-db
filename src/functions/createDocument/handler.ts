import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import * as AWS from "aws-sdk";
import schema from "./schema";

const randomString = (length, chars) => {
  var result = "";
  for (var i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const dynamo = new AWS.DynamoDB.DocumentClient({
    region: "localhost",

    endpoint: "http://localhost:8000",
  });
  await dynamo
    .put({
      TableName: "HamzaTable",
      Item: {...event.body, id:randomString(100, 'abcdefghigjklmnopqrstuvwxyzAbcdefgh12364839847#$^&(*(&%$#`')},
    })
    .promise();
  // let body = await dynamo.scan({ TableName: "HamzaTable" }).promise();

  return formatJSONResponse({
    message: `Hello ${event.body.firstName}, welcome to the exciting Serverless world!`,
    event,
  });
};

export const main = middyfy(hello);
