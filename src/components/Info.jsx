import { } from 'react'
import neutronLinkImage from '../assets/images/neutron-link.png';

function Info() {
    return (
      <info>
        <p>3. SHARE YOUR NEUTRON LINK</p>
        <img src={neutronLinkImage} alt="this is a neutron" className="neutron-image" />
        <p className="hint">[ START AGAIN ]</p>
      </info>
    )
  }
  
  export default Info