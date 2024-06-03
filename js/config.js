// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Sua configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCC7wghNSZwJFgG_fbnAPCzYQ1qIY0x4l8",
  authDomain: "air-locacao.firebaseapp.com",
  databaseURL: "https://air-locacao-default-rtdb.firebaseio.com",
  projectId: "air-locacao",
  storageBucket: "air-locacao.appspot.com",
  messagingSenderId: "405226702922",
  appId: "1:405226702922:web:9bfd511e6f36c36384beb3",
  measurementId: "G-38KQ46F0H4"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta os serviços do Firestore e Storage
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
