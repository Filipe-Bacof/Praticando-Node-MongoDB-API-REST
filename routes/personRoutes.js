const router = require('express').Router()

const Person = require('../models/Person')


router.post('/', async (req, res) => {
    const {name, salary, approved} = req.body
    
    // duvida: ISSO É UM MIDDLEWARE?
    if (!name) {
        res.status(422).json({ error: "o nome é obrigatório" })
    }
    if (!salary) {
        res.status(422).json({ error: "o salário é obrigatório" })
    }
    if (approved != true && approved != false) {
        res.status(422).json({ error: "é necessário informar se foi aprovado" })
    }
    
    const person = {
        name,
        salary,
        approved
    }

    try {
        await Person.create(person)
        res.status(201).json({ message: "pessoa inserida no sistema com sucesso" })
    }
    catch (error) {
        res.status(500).json({ error: error })
    }
})

module.exports = router