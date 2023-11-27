import { useState } from 'react'
import { getFirestore, addDoc, collection } from 'firebase/firestore'
import app from '../firebase-config'

// initialize firestore
const db = getFirestore(app);

function LinkForm() {
  const [url, setUrl] = useState('');
  const [shortenedLink, setShortenedLink] = useState('');

  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  const generateShortId = () => {
    // simple way to generate a 7 character string
    // it can be improved within the database
    return Math.random().toString(36).substring(2, 9);
  };

  // function to handle form submissions
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with URL:", url); // debug line
    const shortId = generateShortId();

    if (url) {
      //logic to store the mapping of shortId to the original URL in Firestore
      try {
        await addDoc(collection(db, 'links'), {
          originalUrl: url,
          shortId: shortId,
        });

        // construct the shortened link
        const newShortenedLink = `https://neutron-link-0.firebaseapp.com${shortId}`;
        console.log("New shortened link:", newShortenedLink);
        setShortenedLink(newShortenedLink);

        // reset the input field
        setUrl('');
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    }
  };

    return (
      <div>
      <form onSubmit={handleSubmit}>
        <p>1. PASTE THE LINK YOU WANT TO SHARE</p>
        <div>
          <input
            type="text"
            placeholder="put here the url you'll make shorter"
            value={url}
            onChange={handleInputChange}
            id="urlInput"
            name="url" 
          />
          <button type="submit">Shorten</button>
        </div>
      </form>
      {shortenedLink && <p>Shortened Link: <a href={shortenedLink}>{shortenedLink}</a></p>}
    </div>
  );
}
  
export default LinkForm