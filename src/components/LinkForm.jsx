import { useState } from 'react'
import app from '../../firebase-config';
import { getFirestore, addDoc, collection } from 'firebase/firestore';

// initialize firestore
const db = getFirestore(app);

function LinkForm() {

  // state to store the input url
  const [url, setUrl] = useState(''); 

  // state to store the shortened link
  const [shortenedLink, setShortenedLink] = useState('');

  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  const generateShortId = () => {
    // simple way to generate a 6 character string
    // it can be improve within the database
    return Math.random().toString(36).substring(2, 8);
  };

  // function to handle form submissions
  const handleSubmit = async (e) => {
    e.preventDefault();

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
            placeholder="Put here the url you'll make shorter"
            value={url}
            onChange={handleInputChange}
          />
          <button type="submit">Shorten</button>
        </div>
      </form>
      {shortenedLink && <p>Shortened Link: <a href={shortenedLink}>{shortenedLink}</a></p>}
    </div>
  );
}
  
export default LinkForm