
const checkConnectionQuery = "DO 1"

const addClientQuery = 'INSERT INTO clients (name, authId) VALUES (?, ?)'
const getClientByIdQuery = 'SELECT * FROM clients WHERE id = (?)'
const updateClientQuery =  'UPDATE clients SET ' +
                           'name = (?) ' +
                           'WHERE id = (?)'
const getClientsQuery = 'SELECT * FROM clients'
const addBookQuery = 'INSERT INTO client_books (clientId, bookId) VALUES (?,?)'
const getClientBookQuery = 'SELECT bookId from client_books WHERE clientId = (?)'
const removeBookQuery = 'DELETE FROM client_books WHERE clientId = (?) AND bookId = (?)'


module.exports ={
    checkConnectionQuery,
    addClientQuery,
    getClientByIdQuery,
    updateClientQuery,
    getClientsQuery,
    addBookQuery,
    removeBookQuery,
    getClientBookQuery
}
