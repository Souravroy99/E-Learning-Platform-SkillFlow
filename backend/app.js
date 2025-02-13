import dotenv from "dotenv"
dotenv.config({path: "./.env"})
import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))
app.use(express.json)
app.use(cookieParser())

// Routes
import userRouter from "./src/routes/user.route.js"

app.use('/api/v1/user', userRouter)

export default app 