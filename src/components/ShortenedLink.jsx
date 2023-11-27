import { } from 'react'
import PropTypes from 'prop-types'

function ShortenedLink({ shortenedLink }) {
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
        <input value={ShortenedLink} readOnly />
      </div>
      <button onClick={copyToClipboard}>copy</button>
    </div>
  );
}

ShortenedLink.propTypes = {
  shortenedLink: PropTypes.string.isRequired,
};

export default ShortenedLink