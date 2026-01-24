import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError.js";
import { db } from "@/database/knex.js";
import { z } from "zod";


class OrdersController {
    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const bodySchema = z.object({
                table_session_id: z.number(),
                product_id: z.number(),
                quantity: z.number(),
            });

            const { table_session_id, product_id, quantity } = bodySchema.parse(request.body);

            const session = await db<TablesSessionsRepository>("tables_sessions")
                .select()
                .where({ id: table_session_id })
                .first();

            if(!session){
                throw new AppError("session table not found");
            }

            if(session.closed_at){
                throw new AppError("this table is closed");
            }

            const product = await db<ProductRepository>("products")
                .select()
                .where({ id: product_id })
                .first();

            if(!product){
                throw new AppError("product not found");
            }

            return response.status(201).json(session);
        } catch (error) {
            next(error);
        }
    }
}

export { OrdersController }