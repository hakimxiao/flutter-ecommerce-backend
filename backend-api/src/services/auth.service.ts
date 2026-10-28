import { prisma } from "../config/prisma";
import type { User } from "../generated/prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

interface SignUpProps {
    name: string;
    email: string;
    password: string;
}

interface SignInProps {
    email: string;
    password: string;
}

export class AuthService {
    static async signUp({name, email, password}: SignUpProps) {
        const existingUser = await prisma.user.findUnique({
            where: {email}
        });
        if(existingUser) {
            throw new Error("Email already used");
        }

        const saltRounds = 10;
        const password_hashed = await bcrypt.hash(password, saltRounds);

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password_hash: password_hashed
            },
            select: {
                id: true,
                name: true,
                email: true,
                created_at: true
            }
        })

        return newUser
    }

    static async signIn({email, password}: SignInProps) {
        const user = await prisma.user.findUnique({
            where: {email},
            select: {
                id: true,
                email: true,
                name: true,
                password_hash: true
            }
        });

        if(!user) {
            throw new Error("Email or password is wrong");
        }

        const passwordMatch = await bcrypt.compare(password, user.password_hash);
        if(!passwordMatch) {
            throw new Error("Wrong password");
        }

        const secretKey = process.env.JWT_SECRET || "default_secret"
        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email
            },
            secretKey,
            {expiresIn: "1d"}
        )

        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            }
        }
    }

}