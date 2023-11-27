import { } from 'react'
import PropTypes from 'prop-types'

function ShortenedLink({ shortenedLink }) {
  console.log("Received shortened link:", shortenedLink);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortenedLink).then(() => {
      alert('Link copied');
    }, (err) => {
      console.error('Could not copy: ', err)
    });
  };

  return (
    <div className="shortened">
      <p>2. COPY THE NEUTRON LINK</p>
      <div>
        <input value={shortenedLink} readOnly id="urlOutput" />
      </div>
      <button onClick={copyToClipboard}>copy</button>
    </div>
  );
}

ShortenedLink.propTypes = {
  shortenedLink: PropTypes.string.isRequired,
};

export default ShortenedLink