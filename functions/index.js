const functions = require("firebase-functions");
const admin = require("firebase-admin");
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
    await shortUrlRef.set({originalUrl});
    const newShortenedLink = `https://${process.env.REACT_APP_PROJECT_ID}.web.app/${shortId}`;
    return res.status(200).send(newShortenedLink);
  } catch (error) {
    console.error("Error creating short URL: ", error);
    return res.status(500).send("Internal Server Error");
  }
});

/**
 * it generates a short random ID for the pasted url
 * @return {string} short random ID
 */
function generateShortId() {
  // the length of the ID can be adjusted here
  return Math.random().toString(36).substring(2, 9);
}
