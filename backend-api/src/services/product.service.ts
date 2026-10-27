import { prisma } from "../config/prisma";
import type { Product } from "../generated/prisma/client";

export class ProductService {
    static async getPopularProducts(): Promise<Product[]> {
        return prisma.product.findMany({
            where: {type_id: 2},
            orderBy: {created_at: "desc"}
        });
    }

    static async getRecommendedProducts(): Promise<Product[]> {
        return prisma.product.findMany({
            where: {type_id: 3},
            orderBy: {created_at: "desc"}
        })
    }
}