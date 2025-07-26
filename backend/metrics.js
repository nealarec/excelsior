import AWS from "aws-sdk";
const dynamo = new AWS.DynamoDB.DocumentClient();

export const handler = async () => {
  const params = {
    TableName: process.env.TABLE_NAME,
    Limit: 20,
  };

  const data = await dynamo.scan(params).promise();

  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify(data.Items),
  };
};
