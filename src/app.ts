import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { env } from './config/env';

const app:Application = express();

app.use(cors({
    origin:["http://localhost:3000",env.FRONTEND_URL, "http://localhost:8000"],
    credentials: true,
    allowedHeaders:["Content-Type","Authorization"],
    methods:["GET","POST","PUT","DELETE","PATCH", "OPTIONS"],
}))

//middlewere's
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

app.get('/', (req:Request , res:Response)=>{
    res.send({
        message: `Server is running on PORT: ${env.PORT}`
    })
})

export default app;