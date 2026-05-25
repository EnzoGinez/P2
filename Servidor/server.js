const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const methodOverride = require("method-override")

const app = express()

const Quarto = require("./models/Quarto")

mongoose.connect("mongodb://127.0.0.1:27017/hotel")

app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride("_method"))

app.use(express.static("public"))

app.get("/", (req, res) => {

    res.redirect("/quartos")

})

app.get("/cadastro", (req, res) => {

    res.render("cadastrar")

})

app.post("/quartos", async (req, res) => {

    await Quarto.create({

        numero: req.body.numero,
        tipo: req.body.tipo,
        preco: req.body.preco,
        quantidade: req.body.quantidade

    })

    res.redirect("/quartos")

})

app.get("/quartos", async (req, res) => {

    const quartos = await Quarto.find()

    res.render("quartos", { quartos })

})

app.get("/editar/:id", async (req, res) => {

    const quarto = await Quarto.findById(req.params.id)

    res.render("editar", { quarto })

})

app.put("/quartos/:id", async (req, res) => {

    await Quarto.findByIdAndUpdate(req.params.id, {

        numero: req.body.numero,
        tipo: req.body.tipo,
        preco: req.body.preco,
        quantidade: req.body.quantidade

    })

    res.redirect("/quartos")

})

app.delete("/quartos/:id", async (req, res) => {

    await Quarto.findByIdAndDelete(req.params.id)

    res.redirect("/quartos")

})

app.post("/reservar/:id", async (req, res) => {

    const quarto = await Quarto.findById(req.params.id)

    if(quarto.quantidade > 0){

        quarto.quantidade--

        await quarto.save()

    }

    res.redirect("/quartos")

})

app.listen(80, () => {

    console.log("Servidor rodando")

})