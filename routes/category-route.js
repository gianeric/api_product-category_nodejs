const express = require('express');
const router = express.Router();
const Category = require('../app/models/category');

//Post
router.post('/', function (req, res) {
    const category = new Category();
    category.nome = req.body.nome;
    category.descricao = req.body.descricao;

    category.save(function (error) {
        if (error)
            res.send("Erro ao salvar", error)
        res.status(201).json({ message: 'Categoria inserido com sucesso' });
    })
})


router.get('/', async (req, res) => {
    categoryByProduct = await Category.find().populate('produto');
    res.status(200).json(categoryByProduct);
});


//Get ID
router.get('/:categoryId',  async (req, res) => {
    const id = req.params.categoryId;
    produtoByCategoria = await Category.findById(id).populate('produto');
    res.status(200).json(produtoByCategoria);
});

router.put('/:categoryId', async (req, res) => {
    const id = req.params.categoryId;

    await Category.findById(id, function (err, categoria) {
        if (err) {
            res.status(500).json({
                message: "Erro ao tentar encontrar a categoria; ID mal formado"
            });
        } else if (categoria == null) {
            res.status(400).json({
                message: "Categoria não encontrada para o id passado"
            });
        } else {
            categoria.nome = req.body.nome;
            categoria.preco = req.body.preco;
            categoria.descricao = req.body.descricao;
            categoria.produto = req.body.produto;

            categoria.save(function (error) {
                if (error)
                    res.send("Erro ao tentar atualizar o categoria", error);

                res.status(200).json({
                    message: "categoria atualizado com sucesso"
                });
            });
        }
    });
});

router.delete('/:categoryId', function (req, res) {
    Category.findByIdAndRemove(req.params.categoryId, (err, categoria) => {
        if (err)
            res.status(500).send("Erro ao deletar ", err)

        const response = {
            message: "Categoria removida com sucesso",
            id: categoria.id
        };
        return res.status(200).send(response);
    });
});

module.exports = router;