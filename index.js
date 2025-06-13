const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

// Verificación del webhook
app.get('/webhook', (req, res) => {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token && mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log("WEBHOOK_VERIFIED");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Recepción de mensajes entrantes
app.post('/webhook', async (req, res) => {
  const body = req.body;

  if (body.object) {
    const entry = body.entry?.[0];
    const changes = entry?.changes?.[0]?.value?.messages;

    if (changes) {
      const message = changes[0];
      const phoneNumberId = entry.changes[0].value.metadata.phone_number_id;
      const from = message.from;

      if (message.type === 'audio' || message.type === 'voice') {
        const mediaId = message.audio?.id || message.voice?.id;
        const accessToken = process.env.WHATSAPP_TOKEN;

        try {
          // Obtener URL del audio
          const mediaRes = await axios.get(
            `https://graph.facebook.com/v18.0/${mediaId}`,
            {
              headers: { Authorization: `Bearer ${accessToken}` }
            }
          );
          const mediaUrl = mediaRes.data.url;

          // Descargar el audio
          const audioRes = await axios.get(mediaUrl, {
            headers: { Authorization: `Bearer ${accessToken}` },
            responseType: 'arraybuffer'
          });

          // Aquí guardarías el audio en disco o lo enviarías al STT
          console.log(`Audio recibido de ${from}`);

          // Responder al cliente (opcional)
          await axios.post(
            ` https://graph.facebook.com/v22.0/655218471013271/messages`,
            {
              messaging_product: 'whatsapp',
              to: from,
              type: 'text',
              text: { body: 'Recibimos tu nota de voz. Estamos procesándola.' }
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
              }
            }
          );
        } catch (err) {
          console.error('Error procesando audio:', err.response?.data || err.message);
        }
      }
    }
  }

  res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Bot corriendo en puerto ${PORT}`));
