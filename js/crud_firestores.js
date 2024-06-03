import { db } from './firebaseConfig';
import { collection, addDoc, getDocs, getDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

// Função para adicionar um documento
async function addDocument(collectionName, data) {
    try {
        const docRef = await addDoc(collection(db, collectionName), data);
        console.log("Documento adicionado com ID: ", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Erro ao adicionar documento: ", e);
    }
}

// Função para obter todos os documentos
async function getDocuments(collectionName) {
    try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const documents = [];
        querySnapshot.forEach((doc) => {
            documents.push({ id: doc.id, ...doc.data() });
        });
        return documents;
    } catch (e) {
        console.error("Erro ao obter documentos: ", e);
    }
}

// Função para obter um documento por ID
async function getDocumentById(collectionName, docId) {
    try {
        const docRef = doc(db, collectionName, docId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            console.log("Nenhum documento encontrado!");
        }
    } catch (e) {
        console.error("Erro ao obter documento: ", e);
    }
}

// Função para atualizar um documento
async function updateDocument(collectionName, docId, data) {
    try {
        const docRef = doc(db, collectionName, docId);
        await updateDoc(docRef, data);
        console.log("Documento atualizado com sucesso!");
    } catch (e) {
        console.error("Erro ao atualizar documento: ", e);
    }
}

// Função para excluir um documento
async function deleteDocument(collectionName, docId) {
    try {
        const docRef = doc(db, collectionName, docId);
        await deleteDoc(docRef);
        console.log("Documento excluído com sucesso!");
    } catch (e) {
        console.error("Erro ao excluir documento: ", e);
    }
}

export { addDocument, getDocuments, getDocumentById, updateDocument, deleteDocument };