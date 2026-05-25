const mongoose = require("mongoose")

const QuartoSchema = new mongoose.Schema({

    numero: Number,
    tipo: String,
    preco: Number,
    quantidade: Number

})

module.exports = mongoose.model("Quarto", QuartoSchema)