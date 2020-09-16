const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    nome: String,
    preco: Number,
    descricao: String,
    categoria: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        require: true
    }
});

module.exports = mongoose.model("Product", productSchema);