const pool = require('../db')

class clientsDal {
    async addClient({name, email}) {
        const client = await pool.query('INSERT INTO clients (name, email) VALUES (?,?)',
            [name, email])
        return client[0].insertId
    }

    async getClient(id) {
        const client = await pool.query('SELECT * FROM clients WHERE id = (?)',
            [id])
        return client[0][0]
    }

    async updateClient(id, {name}) {
        await pool.query('UPDATE clients SET ' +
            'name = (?)' +
            'WHERE id = (?)',
            [name, id])
    }

    async getClients() {
        const clients = await pool.query('SELECT * FROM clients')
        return clients[0]
    }

    async addBook(clientId, bookId) {
        await pool.query('INSERT INTO client_books (clientId, bookId) VALUES (?,?)',
            [clientId, bookId])
    }
    async removeBook(clientId, bookId) {
        await pool.query('DELETE FROM authors WHERE clientId = (?), bookId = (?),',
            [clientId, bookId])
    }
}

module.exports = clientsDal
