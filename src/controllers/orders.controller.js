import OrderService from "../services/orderService";
import OrderDetailsService from "../services/orderDetailsService";

module.exports = class Order {
  static async getAllMyOrders(request, response) {
    try {
      const orders = await OrderService.getAllMyOrders(request);
      response.send(orders);
    } catch (error) {
      response.status(error.status).send({ error: error.message });
    }
  }

  static async createNewOrder(request, response) {
    try {
      const productsInputArray = request.body;

      await OrderService.validateCreateOrderInput(productsInputArray);

      const initialOrder = await OrderService.createInitialOrder(
        request.user.id
      );

      const order = await OrderService.orderProcessing(
        initialOrder,
        productsInputArray
      );

      response.send(order);
    } catch (error) {
      response.status(error.status).send({ error: error.message });
    }
  }

  static async getMoreDetailOrder(request, response) {
    try {
      const orderDetails = await OrderDetailsService.getOrderDetailsById(
        request.params.id
      );

      await OrderDetailsService.validateOrderDetails(orderDetails, request);

      response.send(orderDetails);
    } catch (error) {
      response.status(error.status).send({ error: error.message });
    }
  }
};
