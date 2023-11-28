import { } from 'react'
import neutronLinkImage from '../assets/images/neutron-link.png';

function Info() {
  function refreshPage() {
    window.location.reload(false);
  }

    return (
      <div className="info">
        <p>3. SHARE YOUR NEUTRON LINK</p>
        <img src={neutronLinkImage} alt="this is a neutron" className="neutron-image" />
        <button onClick={refreshPage}>repeat</button>
      </div>
    )
  }
  
  export default Info