const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Webhook de verificación (Meta exige esto)
app.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = "mi_token_secreto";

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token && mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("✅ Webhook verificado");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Webhook de mensajes entrantes
app.post("/webhook", (req, res) => {
  console.log("📩 Mensaje recibido:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  app.get('/', (req, res) => {
  res.send('Bot funcionando correctamente');
});

});
