const axios = require("axios")
const clientDal = new (require('../dal/clients'))()
const {sendEmail} = require("../queue/rabbit/norify")

class clientsLogic{
    async addClient({name, email, password}) {
        const client = await clientDal.addClient({name})
        await axios.post(`http://${process.env.AUTH_SERVICE}/api/auth/client`,{
            email, password, clientId: client
        })
        await sendEmail(email)
    }
    async login({email, password}) {
        const {data} = await axios.post(`http://${process.env.AUTH_SERVICE}/api/auth/login`,{
            email, password
        })
        return data.token
    }

    getClient(id) {
        return clientDal.getClientById(id)
    }

    updateClient(id, client) {
        return clientDal.updateClient(id, client)
    }

    getClients() {
        return clientDal.getClients()
    }
    removeBook(clientId, bookId) {
        return clientDal.removeBook(clientId, bookId)
    }
    addBook(clientId, bookId) {
        return clientDal.addBook(clientId, bookId)
    }

}

module.exports = clientsLogic
