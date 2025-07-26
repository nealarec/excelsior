import fetch from "node-fetch";
import { v4 as uuidv4 } from "uuid";
import AWS from "aws-sdk";

const dynamo = new AWS.DynamoDB.DocumentClient();

export const handler = async (event) => {
  const body = JSON.parse(event.body || "{}");
  const userMessage = body.message || "";

  // Llamada a OpenAI API
  const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: userMessage }]
    })
  });

  const data = await openaiRes.json();
  const reply = data.choices?.[0]?.message?.content || "Lo siento, no entendí eso.";

  // Guardar en DynamoDB
  await dynamo.put({
    TableName: process.env.TABLE_NAME,
    Item: {
      id: uuidv4(),
      message: userMessage,
      response: reply,
      timestamp: Date.now()
    }
  }).promise();

  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify({ reply }),
  };
};
