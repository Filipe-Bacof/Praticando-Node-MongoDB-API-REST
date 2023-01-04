// config inicial
const express = require('express');
const app = express();

// forma de ler JSON ---- MIDDLEWARES: recursos executados entre requisições e respostas
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json());

// rota inicial / endpoint
app.get('/', (req, res) => {

    //mostrar requisição

    res.json({message: "oi express"})

})

// entregar uma porta
app.listen(3000)