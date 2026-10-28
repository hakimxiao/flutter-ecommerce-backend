import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import type {  NextFunction, Request,  Response } from "express";

import productRoutes from "../src/routes/product.route";
import authRoutes from "../src/routes/auth.route";

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN ?? "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

app.use(cors({origin: allowedOrigins}));
app.use(express.json({ limit: "1mb"}));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

app.use("/uploads", express.static(path.join(process.cwd(), "public/uploads")))

app.get("/health", (_req: Request, res: Response) => {
    res.status(200).json({
        status: 'success',
        message: 'DBFood API is healthy',
        timestamp: new Date().toISOString()
    })
});
app.get("/", (_req: Request, res: Response) => {
    res.status(200).json({
        status: 'success',
        message: "DBFood API Server is running"
    })
})

// APPROUTER AREA
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);

app.use((_req: Request, res: Response) => {
    res.status(404).json({
        status: 'error',
        message: "Route not found"
    })
})

// Error handler
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    console.error("Unhandled request error:", err);
    res.status(500).json({
        status: 'error',
        message: "Internal server error"
    })
})

export default app;