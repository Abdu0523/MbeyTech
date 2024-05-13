import express, { Router, Request, Response } from "express";
import { OrderDetailRepository } from "../../../infrastructure/repositories/OrderDetailRepository";
import { OrderDetailUseCase } from "../../../infrastructure/use-cases/OrderDetailUseCase";
import { OrderDetailController } from "../controllers/OdrderDetailController";

const orderDetailRouter: Router = express.Router();
const orderDetailRepository = new OrderDetailRepository();
const orderDetailUseCase = new OrderDetailUseCase(orderDetailRepository);
const orderDetailController = new OrderDetailController(orderDetailUseCase);

orderDetailRouter.post("/", async (req: Request, res: Response) => {
  await orderDetailController.createOrderDetail(req, res);
});

orderDetailRouter.get("/", async (req: Request, res: Response) => {
  await orderDetailController.getAllOrderDetails(req, res);
});

orderDetailRouter.get("/:id", async (req: Request, res: Response) => {
  await orderDetailController.getOrderDetailById(req, res);
});

orderDetailRouter.get("/order/:id", async (req: Request, res: Response) => {
    await orderDetailController.getOrderDetailsForOrder(req, res);
  });

orderDetailRouter.put("/:id", async (req: Request, res: Response) => {
  await orderDetailController.updateOrderDetail(req, res);
});

orderDetailRouter.delete("/:id", async (req: Request, res: Response) => {
  await orderDetailController.deleteOrderDetail(req, res);
});

export default orderDetailRouter;
