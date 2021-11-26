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
    .delete({
      TableName: "HamzaTable",
      Key:{id:event.body.id},
    })
    .promise();
  // let body = await dynamo.scan({ TableName: "HamzaTable" }).promise();

  return formatJSONResponse({
    message: `Document with ${event.body.id} has been deleted`,
    event,
  });
};

export const main = middyfy(hello);
