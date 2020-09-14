const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    nome: String,
    preco: Number,
    descricao: String
});

module.exports = mongoose.model("produto", productSchema);