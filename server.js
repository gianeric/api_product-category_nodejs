const express = require("express");
const app = express();
const bodyParser = require("body-parser");

//Configurar o app para usar o bodyParser e transformar as requisições em json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Definir porta onde o server responderá
const port = process.env.PORT || 3000;

//Conexão MongoDB
const mongoose = require('mongoose');
const connectionString = "mongodb+srv://posgraduacao123:posgraduacao123@cluster0.m6a1r.mongodb.net/bdpos?retryWrites=true&w=majority"
mongoose.connect(connectionString, {useNewUrlParser:true, useUnifiedTopology: true, useFindAndModify: false });

//Definido as rotas
const router = express.Router();
const productRoute = require('./routes/product-route');
const indexRoute = require('./routes/index-route');
const categoryRoute = require('./routes/category-route');

//vincula a aplicação com o motor de rotas, /api é a rota padrão
app.use('/api', indexRoute);

//rota para produtos
app.use('/api/produtos/', productRoute);
app.use('/api/categorias/', categoryRoute);

app.listen(port, () => {
  console.log(`Servidor execuando na porta ${port}`);
});