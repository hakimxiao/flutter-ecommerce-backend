import type {Product} from "../generated/prisma/client";

export interface ProductResponse {
    total_size: number;
    type_id: number;
    offset: number;
    products: Product[];
}