import { initializeApp } from "firebase/app"

const firebaseConfig = {
    apiKey: "AIzaSyApYJtxkiMSuBnRcTtqu_-Hn3Zr2PUORnc",
    authDomain: "neutron-link-0.firebaseapp.com",
    projectId: "neutron-link-0",
    storageBucket: "neutron-link-0.appspot.com",
    messagingSenderId: "1075824436182",
    appId: "1:1075824436182:web:a1e5afe54e4b122d85ba77"
  };

const app = initializeApp(firebaseConfig);

export default app