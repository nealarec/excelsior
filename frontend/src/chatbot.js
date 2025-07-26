export function initChatbot() {
  const chatButton = document.createElement("button");
  chatButton.textContent = "💬";
  chatButton.className = "btn btn-primary chat-btn";
  document.body.appendChild(chatButton);

  const chatWindow = document.createElement("div");
  chatWindow.className = "chat-window d-none";
  chatWindow.innerHTML = `
    <div class="chat-header bg-primary text-white p-2">Chat IngeLean</div>
    <div id="chatMessages" class="chat-messages p-2"></div>
    <div class="chat-input p-2">
      <input id="userInput" type="text" class="form-control" placeholder="Escribe tu mensaje...">
      <button id="sendBtn" class="btn btn-success mt-2 w-100">Enviar</button>
    </div>
  `;
  document.body.appendChild(chatWindow);

  const messages = chatWindow.querySelector("#chatMessages");
  const input = chatWindow.querySelector("#userInput");
  const sendBtn = chatWindow.querySelector("#sendBtn");

  chatButton.addEventListener("click", () => {
    chatWindow.classList.toggle("d-none");
  });

  sendBtn.addEventListener("click", async () => {
    const msg = input.value.trim();
    if (msg) {
      messages.innerHTML += `<div><strong>Tú:</strong> ${msg}</div>`;
      input.value = "";

      const res = await fetch("YOUR_API_URL", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      });

      const data = await res.json();
      messages.innerHTML += `<div><strong>Bot:</strong> ${data.reply || "Error en la respuesta"}</div>`;
    }
  });
}
