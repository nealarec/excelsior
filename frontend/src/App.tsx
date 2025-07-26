function App() {
  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 text-center">
      <img
        src="/excelsior/favicon.svg"
        className="mx-auto w-100 h-100 mb-6"
        alt=""
      />
      <h1 className="text-4xl font-bold text-blue-700 mb-4">
        Bienvenido al Chatbot de INGELEAN
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Este proyecto es un asistente virtual diseñado para responder preguntas
        frecuentes sobre los servicios de <b>INGELEAN</b>. Puedes interactuar
        con el chatbot para conocer más sobre automatización industrial,
        desarrollo de hardware, software con inteligencia artificial y
        mantenimiento industrial.
      </p>
      <div className="flex justify-center gap-4">
        <div className="bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-md w-64">
          <h2 className="text-xl font-semibold mb-2">🤖 ¿Qué hace?</h2>
          <p className="text-gray-600 text-sm">
            Responde preguntas frecuentes y ayuda a los clientes a encontrar
            información útil.
          </p>
        </div>
        <div className="bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-md w-64">
          <h2 className="text-xl font-semibold mb-2">⚡ ¿Cómo funciona?</h2>
          <p className="text-gray-600 text-sm">
            Usa inteligencia artificial con el modelo GPT-4.1-nano para generar
            respuestas claras y rápidas.
          </p>
        </div>
        <div className="bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-md w-64">
          <h2 className="text-xl font-semibold mb-2">📊 ¿Qué ofrece?</h2>
          <p className="text-gray-600 text-sm">
            Atención 24/7, respuestas inmediatas y conexión con el equipo de
            soporte de INGELEAN.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
