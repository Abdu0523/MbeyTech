import { IOrder } from "../../data/interfaces/IOrder";
import { OrderRepository } from "../repositories/OrderRepository";

export class OrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async createOrder(orderData: IOrder): Promise<IOrder> {
    try {
      // Ajouter la logique métier ici, si nécessaire

      // Appeler la méthode add du repository pour créer la commande
      const newOrder = await this.orderRepository.add(orderData);
      return newOrder;
    } catch (error: any) {
      throw new Error("Error creating order: " + error.message);
    }
  }

  async getAllOrders(): Promise<IOrder[]> {
    try {
      // Appeler la méthode getAll du repository pour obtenir toutes les commandes
      const orders = await this.orderRepository.getAll();
      return orders;
    } catch (error: any) {
      throw new Error("Error getting all orders: " + error.message);
    }
  }

  async getOrderById(orderId: string): Promise<IOrder | null> {
    try {
      // Appeler la méthode getById du repository pour obtenir la commande par ID
      const order = await this.orderRepository.getById(orderId);
      return order;
    } catch (error: any) {
      throw new Error("Error getting order by ID: " + error.message);
    }
  }

  async getOrderForCustomer(customerId: string): Promise<any> {
    return await this.orderRepository.getOrderForCustomer(customerId);
  }

  async getUnvalidatedOrdersForCustomer(customerId: string): Promise<any> {
    return await this.orderRepository.getUnvalidatedOrdersForCustomer(customerId);
  }

  async updateOrder(orderId: string, updatedOrderData: Partial<IOrder>): Promise<IOrder | null> {
    try {
      // Appeler la méthode update du repository pour mettre à jour la commande
      const updatedOrder = await this.orderRepository.update(orderId, updatedOrderData);
      return updatedOrder;
    } catch (error: any) {
      throw new Error("Error updating order: " + error.message);
    }
  }

  async deleteOrder(orderId: string): Promise<boolean> {
    try {
      // Appeler la méthode delete du repository pour supprimer la commande
      const result = await this.orderRepository.delete(orderId);
      return result;
    } catch (error: any) {
      throw new Error("Error deleting order: " + error.message);
    }
  }
}
