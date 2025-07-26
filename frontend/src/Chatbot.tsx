import { useEffect, useRef, useState } from "react";

type Message = {
  role: "user" | "bot";
  content: string;
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const API_URL =
    "https://5lx8hizre0.execute-api.us-east-2.amazonaws.com/v1/chat";

  const sendMessage = async () => {
    if (!input.trim()) return;

    setLoading(true);
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
      setLoading(false);
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setLoading(false);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Error de conexión" },
      ]);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 w-14 h-14 rounded-full bg-blue-600 text-white text-2xl shadow-lg hover:bg-blue-700"
      >
        💬
      </button>

      {open && (
        <div className="fixed bottom-24 right-5 w-100 bg-white border rounded-xl shadow-xl flex flex-col">
          <div className="bg-blue-600 text-white p-3 rounded-t-xl font-semibold">
            Chat IngeLean
          </div>

          <div className="flex-1 p-3 overflow-y-auto max-h-140 min-h-60 relative">
            <div
              className="absolute top-0 right-0 left-0 bottom-0 opacity-30 z--1 bg-no-repeat bg-contain bg-center"
              style={{ backgroundImage: "url(/excelsior/favicon.svg)" }}
            />
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
                      ? "bg-blue-500/70 text-gray-900"
                      : "bg-gray-200/70 text-gray-800"
                  }`}
                >
                  {msg.content}
                </span>
              </div>
            ))}

            {loading && (
              <div className="my-1 text-left">
                <span className="inline-block px-2 py-1 rounded-lg max-w-25 text-sm bg-gray-200/50 text-gray-800">
                  ...
                </span>
              </div>
            )}
            <div ref={scrollRef} />
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
              disabled={loading}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
