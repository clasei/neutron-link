import { } from 'react'
import neutronLinkImage from '../assets/images/neutron-link.png';

function Info() {
    return (
      <div className="info">
        <p>3. SHARE YOUR NEUTRON LINK</p>
        <img src={neutronLinkImage} alt="this is a neutron" className="neutron-image" />
        <button>repeat</button>
      </div>
    )
  }
  
  export default Info