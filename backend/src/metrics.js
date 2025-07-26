import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

export const handler = async () => {
  const params = {
    TableName: process.env.TABLE_NAME,
    Limit: 20,
  };

  const data = await dynamo.send(new ScanCommand(params));

  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify(data.Items),
  };
};
