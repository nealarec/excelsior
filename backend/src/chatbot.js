import { v4 as uuidv4 } from "uuid";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  const userMessage = event.message || "";

  const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4.1-nano",
      messages: [
        { role: "system", content: require("./SYSTEM.txt") },
        { role: "user", content: userMessage },
      ],
    }),
  });

  const data = await openaiRes.json();
  const reply =
    data.choices?.[0]?.message?.content || "Lo siento, no entendí eso.";

  // Guardar en DynamoDB con DocumentClient v3
  await dynamo.send(
    new PutCommand({
      TableName: process.env.TABLE_NAME,
      Item: {
        id: uuidv4(),
        message: userMessage,
        response: reply,
        timestamp: Date.now(),
      },
    })
  );

  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify({
      message: userMessage,
      reply,
    }),
  };
};
