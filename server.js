import express from 'express'     //usename: luiz | password: 4mlrgL9zoBSvyeqv 
import { PrismaClient } from './prisma/generated/client/index.js'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())

app.post('/users', async (req, res) => {

    // users.push(req.body)
    await prisma.user.create({
        data: {
            email:req.body.email,
            name: req.body.name,
            age: req.body.age
        } 
    })

    res.status(201).json(req.body)
})

app.get('/users', async (req, res) => {

    let users = []

    if (req.query) {
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age 
            }
        })
    } else {
        users = await prisma.user.findMany()
    }

    res.status(200).json(users)
})

app.put('/users/:id', async (req, res) => {

    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email:req.body.email,
            name: req.body.name,
            age: req.body.age
        } 
    })

    res.status(201).json(req.body)
})

app.delete('/users/:id', async (req, res) => {
    try {
        await prisma.user.delete({
            where: {
                id: req.params.id
            },
        })

        res.status(200).json({ message: 'Usuário foi deletado com sucesso!'})
    } catch (error) {
        res.status(404).json({ error: 'Usuário não encontrado.' })
    }
})

app.listen(3000)    