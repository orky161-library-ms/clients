const axios = require("axios")
const clientDal = require('../dal/clients')
const {sendEmail, addAuth} = require("../queue/rabbit/producers/publish")

async function addClient({name, email, client}) {
    await clientDal.addClient({name, authId: client})
    await sendEmail(email)
}

async function login({email, password}) {
    const {data} = await axios.post(`http://${process.env.AUTH_SERVICE}/api/auth/login`, {
        email, password
    })
    return data.token
}

function getClient(id) {
    return clientDal.getClientById(id)
}

function updateClient(id, client) {
    return clientDal.updateClient(id, client)
}

function getClients() {
    return clientDal.getClients()
}

function removeBook(clientId, bookId) {
    return clientDal.removeBook(clientId, bookId)
}

function addBook(clientId, bookId) {
    return clientDal.addBook(clientId, bookId)
}

module.exports = {
    addClient,
    login,
    getClient,
    updateClient,
    getClients,
    removeBook,
    addBook,
}
