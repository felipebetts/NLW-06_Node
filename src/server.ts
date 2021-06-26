import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'

import { router } from './routes'

import './database'
import { treatErrors } from './middlewares/treatErrors'

const app = express()

app.use(express.json())

app.use(router)

// middleware para tratamento de erros:
app.use(treatErrors)

app.listen(4000, () => {
    console.log('servidor rodando na porta 4000')
})