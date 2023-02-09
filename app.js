//dotenv
import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
const app = express()
const port = process.env.PORT || '3000'
const DATABASE_URL = process.env.DATABASE_URL
import { connectDB } from './db/connectdb.js'
import { router } from './routes/web.js'


//database connection
connectDB(DATABASE_URL)

//middleware for req.body
app.use(express.urlencoded({extended:true}))

app.use('/',router)

app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
})