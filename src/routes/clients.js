require("express-async-errors")
const express = require('express')
const {login, getClient, updateClient, getClients, removeBook, addBook,} = require("../controller/clients")
const {permission_mw, auth_mw, equalId_mw} = require("../auth")


const router = express.Router()

router.get("/", [auth_mw, permission_mw("ADMIN")], (async (req, res) => {
    const clients = await getClients()
    res.status(200).json({clients})
}))

router.post("/login", (async (req, res) => {
    const token = await login(req.body)
    res.status(200).json({token})
}))

router.get("/:id", [auth_mw, permission_mw("ADMIN"), equalId_mw()], (async (req, res) => {
    const client = await getClient(req.params.id)
    res.status(200).json({client})
}))

router.put("/:id", [auth_mw, permission_mw("ADMIN"), equalId_mw()], (async (req, res) => {
    await updateClient(req.params.id, req.body)
    res.status(202).json({message: "success"})
}))

router.post("/:id/book/:bookId", [auth_mw, permission_mw("ADMIN"), equalId_mw()], (async (req, res) => {
    await addBook(req.params.id, req.params.bookId)
    res.status(202).json({message: "success"})
}))

router.delete("/:id/book/:bookId", [auth_mw, permission_mw("ADMIN"), equalId_mw()], (async (req, res) => {
    await removeBook(req.params.id, req.params.bookId)
    res.status(202).json({message: "success"})
}))

module.exports = router

