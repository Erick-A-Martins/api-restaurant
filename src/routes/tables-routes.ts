import { Router } from "express";
import { TablesController } from "@/controllers/tables-controller.js";

const tablesRoutes = Router();
const tablesController = new TablesController();

tablesRoutes.get("/", tablesController.index);

export { tablesRoutes };