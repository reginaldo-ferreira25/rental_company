// storageCrud.js
import { storage } from './firebaseConfig';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

// Função para fazer upload de um arquivo
async function uploadFile(filePath, file) {
    const storageRef = ref(storage, filePath);
    try {
        const snapshot = await uploadBytes(storageRef, file);
        console.log("Arquivo enviado com sucesso!", snapshot);
        return snapshot;
    } catch (e) {
        console.error("Erro ao fazer upload do arquivo: ", e);
    }
}

// Função para obter a URL de download de um arquivo
async function getFileURL(filePath) {
    const storageRef = ref(storage, filePath);
    try {
        const url = await getDownloadURL(storageRef);
        console.log("Arquivo disponível em", url);
        return url;
    } catch (e) {
        console.error("Erro ao obter URL do arquivo: ", e);
    }
}

// Função para excluir um arquivo
async function deleteFile(filePath) {
    const storageRef = ref(storage, filePath);
    try {
        await deleteObject(storageRef);
        console.log("Arquivo excluído com sucesso!");
    } catch (e) {
        console.error("Erro ao excluir arquivo: ", e);
    }
}

export { uploadFile, getFileURL, deleteFile };
