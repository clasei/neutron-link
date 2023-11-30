import { } from 'react'
import PropTypes from 'prop-types'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function ShortenedLink({ shortenedLink }) {
  console.log("Received shortened link:", shortenedLink);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortenedLink).then(() => {
      toast.success('Neutron Link copied!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }, (err) => {
      toast.error('Failed to copy link. Try again!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error('Could not copy: ', err);
    });
  };

  return (
    <div className="shortened">
      <p className="steps">2. COPY YOUR NEUTRON LINK</p>
      <div>
        <input className="copy-output" value={shortenedLink} readOnly id="urlOutput" />
      <button onClick={copyToClipboard}>copy</button>
      <ToastContainer />
      </div>
    </div>
  );
}

ShortenedLink.propTypes = {
  shortenedLink: PropTypes.string.isRequired,
};

export default ShortenedLink