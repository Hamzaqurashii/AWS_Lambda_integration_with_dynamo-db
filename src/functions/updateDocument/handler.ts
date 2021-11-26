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
    .update({
      TableName: "HamzaTable",
      Key: { id: event.body.id },
      UpdateExpression:
        "set age= :age, email= :email, address= :address, firstName= :firstName, lastName= :lastName",
      ExpressionAttributeValues: {
        ":age": event.body.age,
        ":email": event.body.email,
        ":address": event.body.address,
        ":firstName": event.body.firstName,
        ":lastName": event.body.lastName,
      },
    })
    .promise();

  return formatJSONResponse({
    message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
    event,
  });
};

export const main = middyfy(hello);
