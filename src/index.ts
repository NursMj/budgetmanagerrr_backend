import express from "express"
import routes from '@/routes'
import knexConfig from "../knexfile"
import Knex from 'knex'
import { Model } from 'objection'
import config from "@/config"
import cookieParser from 'cookie-parser'

const knex = Knex(knexConfig)

Model.knex(knex)

const app = express()

app.use(express.json())

app.use(cookieParser())

app.use(routes)

const PORT = config.port || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
