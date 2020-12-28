const {pool} = require('../config/index')
const {addClientQuery, getClientByIdQuery, updateClientQuery, getClientsQuery, addBookQuery, removeBookQuery,checkConnectionQuery} = require("./query_builder/queries")

async function addClient({name, authId}) {
    const client = await pool.query(addClientQuery, [name, authId])
    return client[0].insertId
}

async function getClientById(id) {
    const client = await pool.query(getClientByIdQuery, [id])
    return client[0][0]
}

async function updateClient(id, {name}) {
    await pool.query(updateClientQuery, [name, id])
}

async function getClients() {
    const clients = await pool.query(getClientsQuery)
    return clients[0]
}

async function addBook(clientId, bookId) {
    await pool.query(addBookQuery, [clientId, bookId])
}

async function removeBook(clientId, bookId) {
    await pool.query(removeBookQuery, [clientId, bookId])
}

function checkConnection() {
    return pool.query(checkConnectionQuery)
}

module.exports = {
    addClient,
    getClientById,
    updateClient,
    getClients,
    addBook,
    removeBook,
    checkConnection
}
