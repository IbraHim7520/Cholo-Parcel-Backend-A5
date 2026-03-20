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
import riderRoute from './modules/RiderModel/rider.route';
import marchentRouter from './modules/MarchentModel/marchent.route';
dotenv.config()
const app: Application = express();

app.use(cors({
    origin: ["http://localhost:3000", env.FRONTEND_URL, "http://localhost:8000"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
}))

//middlewere's
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.get('/', (req: Request, res: Response) => {
    res.send({
        message: `Server is running on PORT: ${env.PORT}`
    })
})


app.use("/api/auth", toNodeHandler(auth));


app.use("/api/v1/users", userRoute),
app.use("/api/v1/riders", riderRoute),
app.use("/api/v1/marchents", marchentRouter);
// app.use("/api/v1/admins")


app.use(notFoundRoute);
app.use(GlobalError);

export default app;