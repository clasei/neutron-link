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
      <p className="steps">2. COPY YOUR NEUTRON LINK</p>
      <div>
        <input value={shortenedLink} readOnly id="urlOutput" />
      <button onClick={copyToClipboard}>copy</button>
      </div>
    </div>
  );
}

ShortenedLink.propTypes = {
  shortenedLink: PropTypes.string.isRequired,
};

export default ShortenedLink