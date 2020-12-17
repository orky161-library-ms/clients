
const checkConnectionQuery = "DO 1"

const addClientQuery = 'INSERT INTO clients (name) VALUES (?)'
const getClientByIdQuery = 'SELECT * FROM clients WHERE id = (?)'
const updateClientQuery =  'UPDATE clients SET ' +
                           'name = (?) ' +
                           'WHERE id = (?)'
const getClientsQuery = 'SELECT * FROM clients'
const addBookQuery = 'INSERT INTO client_books (clientId, bookId) VALUES (?,?)'
const removeBookQuery = 'DELETE FROM authors WHERE clientId = (?), bookId = (?),'


module.exports ={
    checkConnectionQuery,
    addClientQuery,
    getClientByIdQuery,
    updateClientQuery,
    getClientsQuery,
    addBookQuery,
    removeBookQuery
}
