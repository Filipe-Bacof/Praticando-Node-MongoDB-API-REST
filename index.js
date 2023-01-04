// config inicial
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const app = express();

// forma de ler JSON ---- MIDDLEWARES: recursos executados entre requisições e respostas
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json());

// rotas da API
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)


// rota inicial / endpoint
app.get('/', (req, res) => {

    //mostrar requisição

    res.json({message: "oi express"})

})

// entregar uma porta
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@apiresthoradecodarestud.y3iwnrl.mongodb.net/rammstein?retryWrites=true&w=majority`)
.then(() => {
    console.log ("conectado ao banco")
    app.listen(3000)
})
.catch((err) => console.log(err))



