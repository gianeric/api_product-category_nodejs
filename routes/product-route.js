const express = require('express');
const router = express.Router();
const Produto = require('../app/models/product');

//Post
router.post('/', async (req, res) => {
    id = req.body.categoria;
    const { nome, preco, descricao } = req.body;
    const produto = await Produto.create({
        nome,
        preco,
        descricao,
        categoria:id
    });

    await produto.save((error) => {
        if(error)
            res.status(500).json(
                {
                    message: "Error ao tentar salvar um novo produto " + error
                }
            );

        res.status(201).json({message: 'Produto inserido com sucesso'});
    });
});

//Get ALL
router.get('/', async (req, res) => {
    produtoByCategoria = await Produto.find().populate('categoria');
    res.status(200).json(produtoByCategoria);
});


//Get ID
router.get('/:productId',  async (req, res) => {
    const id = req.params.productId;
    produtoByCategoria = await Produto.findById(id).populate('categoria');
    res.status(200).json(produtoByCategoria);
});

router.put('/:productId', async (req, res) => {
    const id = req.params.productId;

    await Produto.findById(id, function (err, produto) {
        if (err) {
            res.status(500).json({
                message: "Erro ao tentar encontrar produto; ID mal formado"
            });
        } else if (produto == null) {
            res.status(400).json({
                message: "produto não encontrado para o id passado"
            });
        } else {
            produto.nome = req.body.nome;
            produto.preco = req.body.preco;
            produto.descricao = req.body.descricao;
            produto.categoria = req.body.categoria;

            produto.save(function (error) {
                if (error)
                    res.send("Erro ao tentar atualizar o produto", error);

                res.status(200).json({
                    message: "produto atualizado com sucesso"
                });
            });
        }
    });
});

router.delete('/:productId', function (req, res) {
    Produto.findByIdAndRemove(req.params.productId, (err, produto) => {
        if (err)
            res.status(500).send("Erro ao deletar ", err)

        const response = {
            message: "Produto removido com sucesso",
            id: produto.id
        };
        return res.status(200).send(response);
    });
});

module.exports = router;