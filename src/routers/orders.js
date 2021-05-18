import { Router } from "express";
import auth from "../middleware/auth.js";
import Order from "../controllers/orders.controller";

const routerOrder = new Router();

/**
 * @api {get} /order/me Show all my orders
 * @apiGroup Order
 *
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
    {
        "_id": "60a258cb1e904528903ce46c",
        "totalPrice": 20,
        "status": true,
        "userID": "60a258a01e904528903ce46a",
        "createdAt": "2021-05-17T11:51:39.234Z",
        "updatedAt": "2021-05-17T11:51:39.234Z",
        "__v": 0
    },
]
 *
 */
routerOrder.get("/me", auth, Order.getAllMyOrders);

/**
 * @api {post} /order/create-order Create new order
 * @apiGroup Order
 *
 * @apiParam {String} productID array of object (productId and quantity in one object) Required.
 * @apiParam {Int}  quantity #warning quantity decreased in each valid order Required.
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 {
    "_id": "60a3ce3b469fd82bbc90ac68",
    "userID": "60a258a01e904528903ce46a",
    "totalPrice": 65000,
    "status": true,
    "createdAt": "2021-05-18T14:25:00.536Z",
    "updatedAt": "2021-05-18T14:25:00.536Z",
    "__v": 0
}
 *
 */
routerOrder.post("/create-order", auth, Order.createNewOrder);

/**
 * @api {get} /order/more-details/:id Show (my) order in details
 * @apiGroup Order
 *
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 [
    {
        "_id": "60a39f77221a210c68091f9d",
        "orderID": "60a39f76221a210c68091f9c",
        "productID": "60a25250dc91012734b52328",
        "quantity": 5,
        "__v": 0
    },
]
 *
 */
routerOrder.get("/more-details/:id", auth, Order.getMoreDetailOrder);
export default routerOrder;
