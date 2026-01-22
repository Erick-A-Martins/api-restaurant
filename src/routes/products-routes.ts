import { Router } from "express";
import { ProductController } from "@/controllers/products-controller.js";

const productsRoutes = Router();
const productsController = new ProductController();

productsRoutes.get("/", productsController.index);
productsRoutes.post("/", productsController.create);

export { productsRoutes }