import "./db/mongoose";
import express, { json } from "express";
import cors from "cors";
import routerAuthentication from "./routers/authentication";
import routerProduct from "./routers/products";
import routerOrder from "./routers/orders";

const app = express();

app.use(json());
app.use(cors());

app.use("/authentication", routerAuthentication); //..
app.use("/product", routerProduct); //..
app.use("/order", routerOrder); //..
app.use("*", (request, response) => {
  response.status(502).send({ error: "bad gateway" });
});

app.listen(process.env.PORT, () => console.log("Server Running..."));
