import { } from 'react'
import neutronLinkImage from '../assets/images/neutron-link.png';

function Info() {
  function clearInputFields() {
    document.querySelectorAll('input').forEach(input => input.value = '');
  }

    return (
      <div className="info">
        <p className="steps">3. SHARE & ENJOY</p>
        <div>
          <img src={neutronLinkImage} alt="this is a neutron" className="neutron-image" />
        </div>
        <div>
          <button onClick={clearInputFields}>repeat</button>
        </div>
      </div>
    )
  }
  
  export default Info