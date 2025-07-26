import { useState } from "react";

type Message = {
  role: "user" | "bot";
  content: string;
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  const API_URL =
    "https://5lx8hizre0.execute-api.us-east-2.amazonaws.com/v1/chat";

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const botMsg: Message = {
        role: "bot",
        content: data.reply || "Error en la respuesta",
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Error de conexión" },
      ]);
    }
  };

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 w-14 h-14 rounded-full bg-blue-600 text-white text-2xl shadow-lg hover:bg-blue-700"
      >
        💬
      </button>

      {open && (
        <div className="fixed bottom-24 right-5 w-80 bg-white border rounded-xl shadow-xl flex flex-col">
          <div className="bg-blue-600 text-white p-3 rounded-t-xl font-semibold">
            Chat IngeLean
          </div>

          <div className="flex-1 p-3 overflow-y-auto max-h-64">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`my-1 ${
                  msg.role === "user" ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`inline-block px-2 py-1 rounded-lg max-w-[75%] text-sm ${
                    msg.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.content}
                </span>
              </div>
            ))}
          </div>

          <div className="flex gap-2 p-3 border-t">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Escribe un mensaje..."
              className="flex-1 border rounded px-3 py-1 text-sm"
            />
            <button
              onClick={sendMessage}
              className="bg-green-600 text-white px-3 rounded hover:bg-green-700"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
