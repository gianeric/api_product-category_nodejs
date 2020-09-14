const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const port = process.env.PORT || 3000;

const mongoose = require('mongoose');
const connectionString = "mongodb+srv://XQUpPhzwTOjgnE62:XQUpPhzwTOjgnE62@cluster0.tzukg.mongodb.net/bdpos?retryWrites=true&w=majority"
mongoose.connect(connectionString, {useNewUrlParser:true, useUnifiedTopology: true, useFindAndModify: false });

const router = express.Router();

const productRoute = require('./routes/product-route');

router.use(function(req,res,next){
    console.log("Interceptação pelo Middleware ok");
    next();
});

router.get('/', (req, res)=> res.send("Rota teste ok"));

//vincula a aplicação com o motor de rotas, /api é a rota padrão
app.use('/api', router);

app.use('/api/produtos/', productRoute);

app.listen(port, ()=>{
    console.log("Server up !!!", port)
});