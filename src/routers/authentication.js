import { Router } from "express";
import Authentication from "../controllers/authentication.controller";
const routerAuthentication = new Router();

/**
 * @api {post} /authentication/signup validate request data and save it into database
 * @apiGroup Authentication
 *
 *
 * @apiParam {String} firstName Required.
 * @apiParam {String} middleName Optional.
 * @apiParam {String} lastName Required.
 * @apiParam {String} email Required.
 * @apiParam {String} password Required.
 * @apiParam {String} phoneNumber Required, Warning: must contain 02 in the beginning.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "message": "sign up successfully"
 *     }
 *
 */
routerAuthentication.post("/signup", Authentication.signUp);

/**
 * @api {post} /authentication/login sign in and return token
 * @apiGroup Authentication
 *
 * @apiParam {String} email Required.
 * @apiParam {String} password Required.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200
 *     {
 *         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDk4Mzk5ZWJhNGY0ZTAwMTVhM2U3MTkiLCJpYXQiOjE2MjA2ODQ0Njl9.FKkhU4TWwWjvouucW_csj8bJ2dZK5pLYo1ZmavjLw0U"
 *     }
 *
 */
routerAuthentication.post("/login", Authentication.login);

export default routerAuthentication;
