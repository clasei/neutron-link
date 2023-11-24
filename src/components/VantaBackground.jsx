import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import FOG from 'vanta/dist/vanta.fog.min.js';

function VantaBackground() {
  const vantaRef = useRef(null);
  useEffect(() => {
    const vantaEffect = FOG({
      el: vantaRef.current,
      THREE: THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      highlightColor: 0x2900ff,
      midtoneColor: 0x5dff,
      lowlightColor: 0x101b6d,
      baseColor: 0xc0c4c,
      speed: 0.70,
      zoom: 1.50
    });
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return <div ref={vantaRef} style={{ width: '100vw', height: '100vh' }} />;
}

export default VantaBackground;
