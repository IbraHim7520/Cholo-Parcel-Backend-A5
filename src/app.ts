import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { env } from './config/env';
import { notFoundRoute } from './global/notFound';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth';
import userRoute from './modules/UserModel/user.route';
import GlobalError from './middlewere/handleGlobalErrors';
import dotenv from 'dotenv';
import adminRoute from './modules/AdminModels/admin.route';
import merchentRoute from './modules/MerchentModule/merchent.route';
dotenv.config()
const app: Application = express();



app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
    origin: env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
    
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
}))

app.use("/api/auth", toNodeHandler(auth));
//middlewere's
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req: Request, res: Response) => {
    res.send({
        message: `Server is running on PORT: ${env.PORT}`
    })
})





app.use("/api/v1/users", userRoute);
app.use("/api/v1/admins", adminRoute);
app.use("/api/v1/merchent", merchentRoute);


app.use(notFoundRoute);
app.use(GlobalError);

export default app;