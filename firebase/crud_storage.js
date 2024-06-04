import { storage } from './config.js';
import { child, getDownloadURL,  } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js';

const storageRef = storage.ref();


// Função para fazer upload de arquivo e obter o URL de download
async function uploadFileAndGetDownloadUrl(file) {
    const filename = file.name;
    const fileRef = storageRef.child(filename);

    try {
        const snapshot = await fileRef.put(file);
        const downloadUrl = await snapshot.ref.getDownloadURL();
        return downloadUrl;
    } catch (error) {
        console.error('Erro ao enviar arquivo:', error);
        throw error;
    }
}

// Função para baixar arquivo
function downloadFile(filename) {
    const fileRef = storageRef.child(filename);
    return fileRef.getDownloadURL();
}

// Função para deletar arquivo
function deleteFile(filename) {
    const fileRef = storageRef.child(filename);
    return fileRef.delete();
}
