const {pool} = require('../config/index')
const {addClientQuery,
    getClientByIdQuery,
    updateClientQuery,
    getClientsQuery,
    addBookQuery,
    removeBookQuery,} = require("../query_builder/queries")

class clientsDal {
    async addClient({name, email}) {
        const client = await pool.query(addClientQuery, [name, email])
        return client[0].insertId
    }

    async getClientById(id) {
        const client = await pool.query(getClientByIdQuery, [id])
        return client[0][0]
    }

    async updateClient(id, {name}) {
        await pool.query(updateClientQuery, [name, id])
    }

    async getClients() {
        const clients = await pool.query(getClientsQuery)
        return clients[0]
    }

    async addBook(clientId, bookId) {
        await pool.query(addBookQuery, [clientId, bookId])
    }
    async removeBook(clientId, bookId) {
        await pool.query(removeBookQuery, [clientId, bookId])
    }
}

module.exports = clientsDal
