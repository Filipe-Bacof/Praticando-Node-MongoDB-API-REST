const router = require('express').Router()

const Person = require('../models/Person')

// create - CRIAÇÃO DE DADOS
router.post('/', async (req, res) => {
    const {name, salary, approved} = req.body
    
    // duvida: ISSO É UM MIDDLEWARE?
    if (!name) {
        res.status(422).json({ error: "o nome é obrigatório" })
        return
    }
    if (!salary) {
        res.status(422).json({ error: "o salário é obrigatório" })
        return
    }
    if (approved != true && approved != false) {
        res.status(422).json({ error: "é necessário informar se foi aprovado" })
        return
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

// Read - Leitura de Dados
router.get('/', async (_req, res) => {
    try {
        const people = await Person.find()
        res.status(200).json(people)
    }
    catch (error) {
        res.status(500).json({ error: error })
    }
})

router.get('/:id', async (req, res) => {
    // console.log(req)
    // extrair o dado da requisição --- pela URL = req.params
    const id = req.params.id
    try {
        const person = await Person.findOne({_id: id})
        if (!person) {
            res.status(422).json({message: 'o usuário não foi encontrado!'})
            return
        }
        
        res.status(200).json(person)
    }
    catch (error) {
        res.status(500).json({ error: error })
    }
})

// Update --- atualização de dados (PUT, PATCH)
// patch = atualização parcial ;)
router.patch('/:id', async (req, res) => {
    const id = req.params.id
    const {name, salary, approved} = req.body
    

    const person = {
        name,
        salary,
        approved
    }

    try {
        const updatedPerson = await Person.updateOne({_id: id}, person)
        
        if (updatedPerson.matchedCount === 0) {
            res.status(422).json({ error: "o nome é obrigatório" })
            return
        }

        res.status(200).json(person)
    }
    catch (error) {
        res.status(500).json({ error: error })
    }
})

module.exports = router