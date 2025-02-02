const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

exports.addCard = functions.https.onRequest(async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const {imageUrl, summary, link} = req.body;

  try {
    const docRef = await db.collection("cards").add({
      imageUrl,
      summary,
      link,
    });
    res.status(200).send(`Card added with ID: ${docRef.id}`);
  } catch (error) {
    console.error("Error adding card:", error); // Añadir registro de error
    res.status(500).send(`Error adding card: ${error.message}`);
  }
});

// Añadir una nueva línea en blanco aquí