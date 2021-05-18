import { Router } from "express";
import auth from "../middleware/auth.js";
import Product from "../controllers/products.controller";

const routerProduct = new Router();

/**
 * @api {get} /product/display Display all products and check quantity decreased when create order
 * @apiGroup Product
 *
 *
 * @apiParam {String} name Required.
 * @apiParam {String} email Required.
 * @apiParam {String} password Required.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 [
    {
        "_id": "60a25236dc91012734b52327",
        "productName": "iphone",
        "price": 13000,
        "quantity": 1955,
        "__v": 0
    },
]
 *
 */
routerProduct.get("/display", auth, Product.getAllProducts);

export default routerProduct;
