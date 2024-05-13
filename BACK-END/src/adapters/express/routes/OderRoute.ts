import express, { Router, Request, Response } from "express";
import { OrderController } from "../controllers/OrderController";
import { OrderRepository } from "../../../infrastructure/repositories/OrderRepository";
import { OrderUseCase } from "../../../infrastructure/use-cases/OrderUseCase";

const orderRouter: Router = express.Router();
const orderRepository = new OrderRepository();
const orderUseCase = new OrderUseCase(orderRepository);
const orderController = new OrderController(orderUseCase);

orderRouter.post(
  "/",
  async (req: Request, res: Response) => {
    await orderController.createOrder(req, res);
  }
);

orderRouter.get("/", async (req: Request, res: Response) => {
  await orderController.getAllOrders(req, res);
});

orderRouter.get("/:id", async (req: Request, res: Response) => {
  await orderController.getOrderById(req, res);
});

orderRouter.get("/unvalidated/:id", async (req: Request, res: Response) => {
    await orderController.getUnvalidatedOrdersForCustomer(req, res);
  });

orderRouter.put("/:id", async (req: Request, res: Response) => {
  await orderController.updateOrder(req, res);
});

orderRouter.delete("/:id", async (req: Request, res: Response) => {
  await orderController.deleteOrder(req, res);
});

export default orderRouter;
