// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

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

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

// FIRESTORE

// Criar um documento
function criarDocumento(colecao, dados) {
  return firebase.firestore().collection(colecao).add(dados);
}

// Ler todos os documentos de uma coleção
function lerDocumentos(colecao) {
  return firebase.firestore().collection(colecao).get()
    .then(snapshot => {
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    });
}

// Ler um documento específico
function lerDocumento(colecao, documentoId) {
  return firebase.firestore().collection(colecao).doc(documentoId).get()
    .then(doc => {
      if (doc.exists) {
        return { id: doc.id, ...doc.data() };
      } else {
        return null;
      }
    });
}

// Atualizar um documento
function atualizarDocumento(colecao, documentoId, novosDados) {
  return firebase.firestore().collection(colecao).doc(documentoId).update(novosDados);
}

// Deletar um documento
function deletarDocumento(colecao, documentoId) {
  return firebase.firestore().collection(colecao).doc(documentoId).delete();
}

// EXEMPLO DE USO DO FIRESTORE

// Criar um novo documento na coleção "usuarios"
// criarDocumento("usuarios", { nome: "John Doe", email: "john@example.com" })
//   .then(docRef => {
//     console.log("Documento criado com ID:", docRef.id);
//   });

// Ler todos os documentos da coleção "usuarios"
// lerDocumentos("usuarios")
//   .then(documentos => {
//     console.log("Documentos de usuários:", documentos);
//   });

// Ler um documento específico da coleção "usuarios" (supondo que você tenha o ID do documento)
// lerDocumento("usuarios", "ID_DO_DOCUMENTO")
//   .then(documento => {
//     console.log("Documento específico:", documento);
//   });

// Atualizar um documento na coleção "usuarios" (supondo que você tenha o ID do documento)
// atualizarDocumento("usuarios", "ID_DO_DOCUMENTO", { nome: "Novo Nome", email: "novoemail@example.com" });

// Deletar um documento na coleção "usuarios" (supondo que você tenha o ID do documento)
// deletarDocumento("usuarios", "ID_DO_DOCUMENTO");

// STORAGE

// Fazer upload de um arquivo
function uploadArquivo(nome, arquivo) {
  return firebase.storage().ref().child(nome).put(arquivo);
}

// Obter URL do arquivo
function obterURLArquivo(nome) {
  return firebase.storage().ref().child(nome).getDownloadURL();
}

// Deletar um arquivo
function deletarArquivo(nome) {
  return firebase.storage().ref().child(nome).delete();
}


// Fazer upload de um arquivo chamado "arquivo.txt"
// const arquivo = /* Seu arquivo */;
// uploadArquivo("arquivo.txt", arquivo)
//   .then(snapshot => {
//     console.log("Arquivo enviado com sucesso!");
//   });

// Obter URL do arquivo "arquivo.txt"
// obterURLArquivo("arquivo.txt")
//   .then(url => {
//     console.log("URL do arquivo:", url);
//   });

// Deletar o arquivo "arquivo.txt"
// deletarArquivo("arquivo.txt")
//   .then(() => {
//     console.log("Arquivo deletado com sucesso!");
//   });

