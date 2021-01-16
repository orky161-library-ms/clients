require("express-async-errors")
const express = require('express')
const {login, getClient, updateClient, getClients, removeBook, addBook, getClientBooks} = require("../controller/clients")
const {libraryAuth} = require("../config/index")
const {verifyPermission, decodeToken, equalField} = libraryAuth
const {LibraryRoles} = require("../../../library.io-libs/dist/roles");

const router = express.Router()

router.get("/", [decodeToken, verifyPermission(LibraryRoles.ADMIN)], (async (req, res) => {
    const clients = await getClients()
    res.status(200).json({clients})
}))

router.get("/:id", [decodeToken, verifyPermission(LibraryRoles.ADMIN), equalField("id")], (async (req, res) => {
    const client = await getClient(req.params.id)
    res.status(200).json({client})
}))

router.get("/:id/books", (async (req, res) => {
    const books = await getClientBooks(req.params.id)
    res.status(200).json({books})
}))

router.put("/:id", [decodeToken, verifyPermission(LibraryRoles.ADMIN), equalField("id")], (async (req, res) => {
    await updateClient(req.params.id, req.body)
    res.status(202).json({message: "success"})
}))

router.post("/:id/book/:bookId", (async (req, res) => {
    await addBook(req.params.id, req.params.bookId)
    res.status(202).json({message: "success"})
}))

router.delete("/:id/book/:bookId", [decodeToken, verifyPermission(LibraryRoles.ADMIN), equalField("id")], (async (req, res) => {
    await removeBook(req.params.id, req.params.bookId)
    res.status(202).json({message: "success"})
}))

module.exports = router

