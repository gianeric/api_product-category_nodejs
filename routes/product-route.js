const express = require('express');
const router = express.Router();
const Produto = require('../app/models/product');
const mongoose = require('mongoose');


router.post('/', function(req,res){
    const produto = new Produto();
    produto.nome = req.body.nome;
    produto.preco = req.body.preco;
    produto.descricao = req.body.descricao;

    produto.save(function(error){
        if(error)
            res.send("Erro ao salvar", error)
            res.status(201).json({message: 'produto inserido com sucesso'});
    })
})

router.get('/', function(req,res){
    Produto.find(function(err, prods){
        if(err)
            res.send(err);
        res.status(200).json({
            message:"retorno ok de todos os produtos",
            allProducts:prods
        });
    });
});

module.exports = router;