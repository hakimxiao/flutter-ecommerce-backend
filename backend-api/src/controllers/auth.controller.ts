import { Request, Response } from "express";
import { AuthService } from "../services/auth.service"

export const registerHandler = async (req: Request, res: Response) => {
    try {
        const {email, password, name} = req.body;
        const result = await AuthService.signUp({name, email, password});

        return res.status(201).json({
            success: true,
            message: "Registered successfully",
            data: result
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : "Internal server error"
        })
    }
}

export const loginHandler = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body
        const result = await AuthService.signIn({email, password});

        return res.status(200).json({
            success: true,
            message: "Login successfully",
            data: result
        })
    } catch (error) {
         return res.status(401).json({
            success: false,
            message: error instanceof Error ? error.message : "Internal server error"
        })
    }
}