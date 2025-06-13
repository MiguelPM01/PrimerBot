// whatsapp-test.js
const token = "EAARuNB2RmpYBOx8DBxCxzc3MEkA6v7oLNLubUMxZB7P0c8oL1X2JtaClbBYDs4eIRA5Ym9T1x5BFJh5DGjZCrQAZBjZA9KIWAZAjn1fl0RcpTNJUMwHI2cAfN9E2ZBz5weoiZBXsekRyRKmRpqWY5pH7MawYH3WwvFxf5uubp8i3oPXasEsy1Xps1cDTkFbICFvWeSrpWdbWaPaIkpvthupqPtMKKL8ieUZD"
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
