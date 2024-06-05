import { db } from './config.js';
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc, getDoc } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

// Referencia a colecao location
const collectionLocationRef = collection(db, "location");

// Referencia a colecao user
const collectionUserRef = collection(db, "users");

// Referencia formulario de criacao/atualizacao de carros
const carForm = document.getElementById('car-form')

// Referencia formulario de criacao/atualizacao de usuarios
const userForm = document.getElementById('user-form')

// Variavel que armazena os dados do firestore
let firestoreData = [];

// Funcao para criacao/atualizacao de documentos
async function addOrUpdateDocument(collectionName, documentId, data) {
    const submitButton = document.getElementById('submit-button');

    try {
        if (!documentId) {
            // Adiciona um novo documento se documentId for null ou vazio
            const docRef = await addDoc(collection(db, collectionName), data);
            submitButton.textContent = 'Salvar';
            console.log("Documento adicionado com ID: ", docRef.id);
        } else {
            const docRef = doc(db, collectionName, documentId);
            const docSnapshot = await getDoc(docRef);

            if (docSnapshot.exists()) {
                // Documento existe, atualiza-o
                await updateDoc(docRef, data);
                submitButton.textContent = 'Salvar';
                console.log("Documento atualizado com ID: ", documentId);
            } else {
                // Documento não existe, adiciona-o
                await setDoc(docRef, data);
                submitButton.textContent = 'Salvar';
                console.log("Documento adicionado com ID: ", documentId);
            }
        }
    } catch (error) {
        console.error("Erro ao adicionar ou atualizar documento:", error);
    }
}

// Funcao que escuta os eventos do formulario car 
function handleFormSubmit(event) {

    event.preventDefault();
    let carId = "";
    carId = document.getElementById('documentId').value;
    const brand = event.target.brand.value;
    const model = event.target.model.value;
    const year = event.target.year.value;
    const status = event.target.statusCheckbox.checked;
    const description = event.target.description.value;
    const car = { "brand": brand, "model": model, "year": year, "description": description, "status": status };
    addOrUpdateDocument("location", carId, car);
    event.target.reset();
}
if (carForm) {
    carForm.addEventListener('submit', handleFormSubmit);
}

// Funcao que escuta os eventos do formulario de usuario 
function handleFormSubmitUser(event) {

    event.preventDefault();
    let userId = "";
    userId = document.getElementById('documentIdUser').value;
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const status = event.target.statusCheckboxUser.checked;
    const user = { "name": name, "email": email, "password": password, "status": status };
    addOrUpdateDocument("users", userId, user);
    event.target.reset();
}
if (userForm) {
    userForm.addEventListener('submit', handleFormSubmitUser);
}

// Funcao que escuta os eventos da colecao location, gera a tabela com os dados e eventos do checkbox
async function setupRealtimeUpdatesCars() {

    // Funcao que escuta os eventos do checkbox do formulario cars
    document.addEventListener('DOMContentLoaded', function () {
        if(carForm) {
        const checkbox = document.getElementById('statusCheckbox');
        const label = document.getElementById('statusLabel');

        // Função para atualizar o rótulo do checkbox
        function updateCheckboxLabel() {
            if (checkbox.checked) {
                label.textContent = 'Ativo';
            } else {
                label.textContent = 'Inativo';
            }
        }

        // Atualiza o rótulo ao carregar a página
        updateCheckboxLabel();

        // Adiciona um ouvinte de evento para mudar o rótulo ao alterar o estado do checkbox
        checkbox.addEventListener('change', updateCheckboxLabel);
    }
    });
    

    // Funcao que escuta os eventos da colecao cars, gera a tabela com os dados
    onSnapshot(collectionLocationRef, (querySnapshot) => {
        firestoreData = [];
        var numberItem = 0;

        const outputParagraphHome = document.getElementById('output-home');

        const tableBody = document.getElementById('output-cars');

        if(tableBody) {
            tableBody.innerHTML = '';
        }

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            firestoreData.push({ id: doc.id, data: data });
            console.log(doc.id)

            var resultHTMLHome = '';

            numberItem += 1
            
            // Preenche as linhas da tabela

            const row = document.createElement('tr');

            const idCell = document.createElement('td');
            idCell.textContent = numberItem;
            row.appendChild(idCell);

            const brandCell = document.createElement('td');
            brandCell.textContent = data.brand;
            row.appendChild(brandCell);

            const modelCell = document.createElement('td');
            modelCell.textContent = data.model;
            row.appendChild(modelCell);

            const yearCell = document.createElement('td');
            yearCell.textContent = data.year;
            row.appendChild(yearCell);

            const actionsCell = document.createElement('td');
            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.classList.add('btn', 'btn-warning', 'btn-sm', 'mr-2');
            editButton.id = `update-button-car-${doc.id}`
            editButton.onclick = () => populateFormCar(doc.id, data);
            actionsCell.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Excluir';
            deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
            deleteButton.id = `delete-button-car-${doc.id}`
            deleteButton.onclick = () => deleteData('location', doc.id);
            actionsCell.appendChild(deleteButton);

            row.appendChild(actionsCell);            

            if (tableBody) {
                tableBody.appendChild(row);
            }

            // Preenche a lista dos cards
            firestoreData.forEach((item) => {
                
            resultHTMLHome += `
            <div class="card m-4" style="width: 18rem;">
                    <img src="./images/Argo_compact.jpeg" class="card-img-top" alt="...">
            
                    <div class="card-body">
                        <h5 class="card-title font-weight-bold">${item.data.model}</h5>
                        <div>
                            <span><b>Marca:</b> ${item.data.brand}</span><span> - <b>Ano:</b> ${item.data.year}</span>                          
                        </div>                       
                    <p class="card-text font-weight-light">${truncateString(item.data.description, 60)} <span><a class="card-text font-weight-light" href="#">Ler mais</a></span></p>
                    
                    </div>                  
                    <div class="card-footer">
                        <button class="btn btn-sm btn-primary btn-block" type="button">Reserve agora</button>
                    </div>
                </div> 

               
            `;
                if (outputParagraphHome) {
                    outputParagraphHome.innerHTML = resultHTMLHome;
                }
            })

        });
    }, (error) => {
        console.error("Error getting documents: ", error);
        outputParagraphHome.innerHTML = 'Error getting documents';
        outputParagraphCars.innerHTML = 'Error getting documents';
        outputParagraphUsers.innerHTML = 'Error getting documents';
    });
}

// Funcao que escuta os eventos da colecao users, gera a tabela com os dados e eventos do checkbox
async function setupRealtimeUpdatesUsers() {

    document.addEventListener('DOMContentLoaded', function () {
        if(userForm) {
        const checkbox = document.getElementById('statusCheckboxUser');
        const label = document.getElementById('statusLabelUser');

        // Função para atualizar o rótulo do checkbox
        function updateCheckboxLabel() {
            if (checkbox.checked) {
                label.textContent = 'Ativo';
            } else {
                label.textContent = 'Inativo';
            }
        }

        // Atualiza o rótulo ao carregar a página
        updateCheckboxLabel();

        // Adiciona um ouvinte de evento para mudar o rótulo ao alterar o estado do checkbox
        checkbox.addEventListener('change', updateCheckboxLabel);
    }
    });
    
    onSnapshot(collectionUserRef, (querySnapshot) => {
        firestoreData = [];
        var numberItem = 0;
        
        const tableBodyUsers = document.getElementById('output-users');

        if(tableBodyUsers) {
            tableBodyUsers.innerHTML = '';
        }

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            firestoreData.push({ id: doc.id, data: data });
            console.log(doc.id)
            numberItem += 1

           
            // User
            const rowUser = document.createElement('tr');

            const idUserCell = document.createElement('td');
            idUserCell.textContent = numberItem;
            rowUser.appendChild(idUserCell);

            const brandUserCell = document.createElement('td');
            brandUserCell.textContent = data.name;
            rowUser.appendChild(brandUserCell);

            const modelUserCell = document.createElement('td');
            modelUserCell.textContent = data.email;
            rowUser.appendChild(modelUserCell);

            const statusUserCell = document.createElement('td');
            statusUserCell.textContent = data.status;
            rowUser.appendChild(statusUserCell);

            const actionsUserCell = document.createElement('td');
            const editUserButton = document.createElement('button');
            editUserButton.textContent = 'Editar';
            editUserButton.classList.add('btn', 'btn-warning', 'btn-sm', 'mr-2');
            editUserButton.id = `update-button-user-${doc.id}`
            editUserButton.onclick = () => populateFormUser(doc.id, data);
            actionsUserCell.appendChild(editUserButton);

            const deleteUserButton = document.createElement('button');
            deleteUserButton.textContent = 'Excluir';
            deleteUserButton.classList.add('btn', 'btn-danger', 'btn-sm');
            deleteUserButton.id = `delete-button-user-${doc.id}`
            deleteUserButton.onclick = () => deleteData('users', doc.id);
            actionsUserCell.appendChild(deleteUserButton);

            rowUser.appendChild(actionsUserCell);

            if (tableBodyUsers) {
                tableBodyUsers.appendChild(rowUser);
            }
        });

    }, (error) => {
        console.error("Error getting documents: ", error);
        outputParagraphHome.innerHTML = 'Error getting documents';
        outputParagraphCars.innerHTML = 'Error getting documents';
        outputParagraphUsers.innerHTML = 'Error getting documents';
    });
}

// Popula o form car com o evento do botao edit
async function populateFormCar(carId, data) {

    if (data) {
        document.getElementById('documentId').value = carId;
        document.getElementById('brand').value = data.brand;
        document.getElementById('model').value = data.model;
        document.getElementById('year').value = data.year;
        document.getElementById('description').value = data.description;
        document.getElementById('statusCheckbox').checked = data.status;
    }

    const submitButton = document.getElementById('submit-button');

    if (carId) {
        submitButton.textContent = 'Atualizar';
    } else {
        submitButton.textContent = 'Salvar';
    }
}

// Popula o form user com o evento do botao edit
async function populateFormUser(carId, data) {

    if (data) {
        document.getElementById('documentIdUser').value = carId;
        document.getElementById('name').value = data.name;
        document.getElementById('email').value = data.email;
        document.getElementById('password').value = data.password;
        document.getElementById('statusCheckboxUser').checked = data.status;
    }

    const submitButton = document.getElementById('submit-button');

    if (carId) {
        submitButton.textContent = 'Atualizar';
    } else {
        submitButton.textContent = 'Salvar';
    }
}

// Funcao que atualiza o dado no Firebase
async function updateData(docId, newData) {
    const docRef = doc(db, "location", docId);
    await updateDoc(docRef, newData);
}

// Funcao que exclui o dado no Firebase
async function deleteData(collection, docId) {
    await deleteDoc(doc(db, collection, docId));
}

// Funcao que diminui o tamanho da string, usado na descricao do card
function truncateString(str, maxLength) {
    if (str != null && str.length > maxLength) {
        return str.substring(0, maxLength) + '...'; // Retorna os primeiros maxLength caracteres com '...' no final
    } else {
        return str; // Retorna a string original se ela for menor ou igual a maxLength
    }
}

// Chamo as funcionalidades no inicio da aplicacao
setupRealtimeUpdatesCars();
setupRealtimeUpdatesUsers();
