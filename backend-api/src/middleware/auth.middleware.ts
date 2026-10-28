import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
    user?: {
        userId: string;
        email: string;
    };
}

export const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorize, please sign in"
        });
    }

    const secretKey = process.env.JWT_SECRET || "default_secret"

    jwt.verify(token, secretKey, (err, decode) => {
        if(err) {
            return res.status(403).json({
                success: false,
                message: "Token is not valid or expired"
            })
        }

        req.user = decode as { userId: string; email: string };
        next()
    })
    
}