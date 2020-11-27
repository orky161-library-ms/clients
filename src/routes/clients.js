require("express-async-errors")
const express = require('express')
const clientsLogic = new (require("../bl/clients"))()

const router = express.Router()

router.get("/",(async (req, res) => {
    const clients = await clientsLogic.getClients()
    res.status(200).json({clients})
}))

router.post("/",(async (req, res) => {
    const client = await clientsLogic.addClient(req.body)
    res.status(200).json({client})
}))
router.post("/login",(async (req, res) => {
    const token = await clientsLogic.login(req.body)
    res.status(200).json({token})
}))

router.get("/:id",(async (req, res) => {
    const client = await clientsLogic.getClient(req.params.id)
    res.status(200).json({client})
}))

router.put("/:id",(async (req, res) => {
    await clientsLogic.updateClient(req.params.id, req.body)
    res.status(202).json({message: "success"})
}))

router.post("/:id/book/:bookId",(async (req, res) => {
    await clientsLogic.addBook(req.params.id, req.params.bookId)
    res.status(202).json({message: "success"})
}))

router.delete("/:id/book/:bookId",(async (req, res) => {
    await clientsLogic.removeBook(req.params.id, req.params.bookId)
    res.status(202).json({message: "success"})
}))

module.exports = router

