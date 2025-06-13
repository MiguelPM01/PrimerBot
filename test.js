// whatsapp-test.js
const token = "EAARuNB2RmpYBOZB2USYwGf18a4mZAGhKcYl1jFnaGjilZCGcsResmsRApFwWMDE1YuYOzpyZAIseFqjJJGQtI05HpqNwvD9fGK6PUbsKJZAQniFDuv7UjGAOjD1bjeZCiIbc2cpTOrz5MLUUXld6rKWv7muyjsZBbUEX5ZCoQNQ0z4CqWw74lVGZB5oMZCWdXYqA3bJZBonM1WHQsW0rH8r8PQW397YJKKdB4IZD"
const recipient = "525530103559";

const url = `https://graph.facebook.com/v22.0/655218471013271/messages`;

const body = {
  messaging_product: "whatsapp",
  to: recipient,
  type: "text",
  text: {
    body: "✅ ¡Hola! Este mensaje fue enviado usando JavaScript y la API de WhatsApp Cloud 🎉",
  },
};

fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(body),
})
  .then((res) => res.json())
  .then((data) => console.log("📨 Respuesta de WhatsApp API:", data))
  .catch((err) => console.error("❌ Error al enviar mensaje:", err));
