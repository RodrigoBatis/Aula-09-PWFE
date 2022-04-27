"use strict"

import {openModal, closeModal} from './modal.js'
import { readClients, createClient} from './clients.js'

const createRow = (client) =>{
    const row = document.createElement('tr')
    row.innerHTML =`
        <td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.celular}</td>
        <td>${client.cidade}</td>
        <td>
            <button type="button" class="button green" id="editar-${client.id}">editar</button>
            <button type="button" class="button red" id="excluir-${client.id}">excluir</button>
        </td>
    `
    return row
}

const updateTable = async () =>{
    const clientsContainer = document.getElementById('clients-container')
    //ler a Api e armazenar o resultado em uma vareavel
    const clients = await readClients()
    //Preencher a tabela com as informações 
    const rows = clients.map(createRow)
    clientsContainer.replaceChildren(...rows)
}

const saveClient = async () =>{
    // Criar um json com as informações do cliente 
    const client = {
        "id": "",
        "nome": document.getElementById('nome').value,
        "email": document.getElementById('email').value,
        "celular": document.getElementById('celular').value,
        "cidade": document.getElementById('cidade').value
    }
    // Eviar o json para o servidor "API"
    await createClient(client)
    // Fechar a modal
    closeModal()
    // Atualizar a tabela 
    updateTable()
}

const deleteClient = (codigo) () =>{
    
}


const actionCliente = (event) => {
    if (event.target.type == 'button')
    {
       const [action, codigo] = event.target.id.split('-')
       if(action == "editar"){

       }else if(action == 'excluir'){
           deleteClient(codigo)
       }
    }
}


updateTable()

// Eventos
document.getElementById('cadastrarCliente').addEventListener('click', openModal)
document.getElementById('salvar').addEventListener('click', saveClient)
document.getElementById('clients-container').addEventListener('click', actionCliente)