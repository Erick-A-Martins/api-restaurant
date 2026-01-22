import { Request, Response, NextFunction } from "express";
import { db } from "@/database/knex.js";

class TablesController {
    async index(request: Request, response: Response, next: NextFunction) {
        try {
            const tables = await db<TableRepository>("tables")
            .select()
            .orderBy("table_number");

            return response.json(tables);
        } catch (error) {
            next(error);
        }
    }
};

export { TablesController };