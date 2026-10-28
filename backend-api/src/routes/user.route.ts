import { Router, Response } from "express";
import { verifyToken, AuthenticatedRequest } from "../middleware/auth.middleware";
import { prisma } from "../config/prisma";

const router = Router();

router.get("/profile", verifyToken, async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;

        const user = await prisma.user.findUnique({
            where: {id: userId},
            select: {
                id: true, email: true, name: true, createdAt: true
            }
        });

        if(!user) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }

        return res.json({ success: true, data: user });
    } catch (error) {
        return res.status(500).json({ success: false, message: error instanceof Error ? error.message : "Internal server error" });
    }
})

export default router;