import type {Request, Response  } from "express";
import { ProductService } from "../services/product.service";
import {  ProductResponse} from "../types/product.interface";

export class ProductController {
    static async getPopular(_req: Request, res: Response): Promise<void> {
        try {
            const products = await ProductService.getPopularProducts();
            const response: ProductResponse = {
                total_size: products.length,
                type_id: 2,
                offset: 0,
                products
            };
    
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({message: "Internal server error"})
            
            throw new Error(error instanceof Error ? error.message : "Internal server error");    
        }
    }

    static async getRecommended(_req: Request, res: Response): Promise<void> {
        try {
             const products = await ProductService.getRecommendedProducts();
            const response: ProductResponse = {
                total_size: products.length,
                type_id: 3,
                offset: 0,
                products
            };

            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({message: "Internal server error"})
            
            throw new Error(error instanceof Error ? error.message : "Internal server error"); 
        }
       
    }
}