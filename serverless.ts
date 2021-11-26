import type { AWS } from "@serverless/typescript";

import createDocument from "@functions/createDocument";
import updateDocument from "@functions/updateDocument";
import deleteDocument from "@functions/deleteDocument";
import getDocument from "@functions/getDocument";

const serverlessConfiguration: AWS = {
  service: "serverlesswithtypescript",
  frameworkVersion: "2",
  plugins: [
    "serverless-esbuild",
    "serverless-offline",
    "serverless-dynamodb-local",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
    lambdaHashingVersion: "20201221",
  },
  // import the function via paths
  functions: { createDocument, updateDocument, deleteDocument, getDocument },
  package: { individually: true },
  custom: {
    dynamodb: {
      stages: ["dev"],
      start: {
        port: 8000,
        migrate: true,
        seed: true,
      },
    },
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
  resources: {
    Resources: {
      TypesciptTable: {
        Type: "AWS::DynamoDB::Table",

        Properties: {
          TableName: "HamzaTable",

          AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],

          KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],

          BillingMode: "PAY_PER_REQUEST",
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
