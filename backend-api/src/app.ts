import express, { type NextFunction, type Application, type Request, type Response } from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";

const app: Application = express();

app.use(cors({origin: "*"}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));


app.use("/uploads", express.static(path.join(process.cwd(), "public/uploads")))

app.get("/", (req: Request, res: Response) => {
    res.json({
        status: 'success',
        message: 'Backend Typescript berjalan normal!',
        timestamp: new Date().toISOString()
    })
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error("Unhandled Error", err.message);
    res.status(500).json({
        status: 'error',
        message: err.message || "Internal server error"
    })
})

export default app;