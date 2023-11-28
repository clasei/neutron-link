const functions = require("firebase-functions");
const admin = require("firebase-admin");
const {v4: uuidv4} = require("uuid");

admin.initializeApp();

exports.shortenUrl = functions.https.onRequest(async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const originalUrl = req.body.url;
  if (!originalUrl) {
    return res.status(400).send("No URL provided");
  }

  const shortId = generateShortId();

  try {
    const shortUrlRef = admin.firestore().collection("shortUrls").doc(shortId);
    await shortUrlRef.set({originalUrl, shortId});
    const newShortenedLink = `https://${process.env.REACT_APP_PROJECT_ID}.web.app/${shortId}`;
    return res.status(200).send(newShortenedLink);
  } catch (error) {
    console.error("Error creating short URL: ", error);
    return res.status(500).send("Internal Server Error");
  }
});

/**
 * generates a unique short ID using the uuid package
 * @return {string} a unique string ID.
 */
function generateShortId() {
  return uuidv4();
}
