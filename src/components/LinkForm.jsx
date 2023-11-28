import { useState } from 'react'
import PropTypes from 'prop-types'

function LinkForm({ onShorten }) {
  const [url, setUrl] = useState('');

  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // CHECK URL ON FIREBASE FUNCTIONS AFTER DEPLOYMENT AND UPDATE HERE
      const response = await fetch('https://us-central1-neutron-link-0.cloudfunctions.net/shortenUrl', {
        method: 'POST',
        body: JSON.stringify({ url }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.text();
      onShorten(data);
      setUrl('');
    } catch (error) {
      console.error('Error: ', error);
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
          />
          <button type="submit">Shorten</button>
        </div>
      </form>
    </div>
  );
}

LinkForm.propTypes = {
  onShorten: PropTypes.func.isRequired,
};

export default LinkForm