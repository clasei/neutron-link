const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});

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

exports.redirect = functions.https.onRequest(async (req, res) => {
  const shortId = req.path.split("/")[1];

  try {
    const docRef = admin.firestore().collection("shortUrls").doc(shortId);
    const docSnapshot = await docRef.get();

    if (!docSnapshot.exists) {
      return res.status(404).send("Short link does not exist");
    }

    const {originalUrl} = docSnapshot.data();
    return res.redirect(301, originalUrl);
  } catch (error) {
    console.error("Error redirecting to the original URL:", error);
    return res.status(500).send("Error processing your request");
  }
});

/**
 * generates a unique short ID
 * @param {number} length
 * @return {string}
 */
function generateShortId(length = 7) {
  // eslint-disable-next-line max-len
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
