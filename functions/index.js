const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});
const {v4: uuidv4} = require("uuid");

admin.initializeApp();

exports.shortenUrl = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    const originalUrl = req.body.url;
    if (!originalUrl) {
      return res.status(400).send("No URL provided");
    }

    const querySnapshot = await admin.firestore().collection("shortUrls")
        .where("originalUrl", "==", originalUrl)
        .get();

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const existingShortId = doc.id;
      const existingShortenedLink = `https://neutron-link-0.web.app/${existingShortId}`;
      return res.status(200).send(existingShortenedLink);
    }

    const shortId = generateShortId();

    try {
      const db = admin.firestore();
      const shortUrlRef = db.collection("shortUrls").doc(shortId);
      await shortUrlRef.set({originalUrl, shortId});
      const newShortenedLink = `https://neutron-link-0.web.app/${shortId}`;
      return res.status(200).send(newShortenedLink);
    } catch (error) {
      console.error("Error creating short URL: ", error);
      return res.status(500).send("Internal Server Error");
    }
  });
});

/**
 * generates a unique short ID using the uuid package
 * @return {string} a unique string ID.
 */
function generateShortId() {
  return uuidv4();
}
