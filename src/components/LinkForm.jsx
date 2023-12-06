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
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  return (
    <div className="input-link">
      <p className="steps">PASTE THE LONG URL</p>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="url"
            placeholder="the link you'll make shorter"
            value={url}
            onChange={handleInputChange}
            id="inputLink"
          />
          <button type="submit">shorten</button>
        </div>
      </form>
    </div>
  );
}

LinkForm.propTypes = {
  onShorten: PropTypes.func.isRequired,
};

export default LinkForm