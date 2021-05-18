import OrderDetails from "../models/orderDetails";
import OrderService from "../services/orderService";
import { sendErrorMessage, isEmpty } from "../utils/util";

export default class OrderDetailsService {
  static async getOrderDetailsById(orderID) {
    const orderDetails = await OrderDetails.find({
      orderID,
    });
    return orderDetails;
  }

  static async createOrderDetails(orderID, productID, quantity) {
    const ordrDetails = await new OrderDetails({
      orderID,
      productID,
      quantity,
    }).save();
    return ordrDetails;
  }

  static async validateOrderDetails(orderDetails, request) {
    if (isEmpty(orderDetails)) sendErrorMessage("not found", 404);
    const order = await OrderService.authenticationUserOrder(
      request.params.id,
      request.user.id
    );
    if (!order) sendErrorMessage("forbidden request", 403);
  }
}
