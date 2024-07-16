import express from "express";
import {
  postOrder,
  orderList,
  orderDetails,
  updateStatus,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

// {{baseUrl}}/orders/postorder
orderRouter.post("/postorder", postOrder);
orderRouter.get("/orderlist", orderList);
orderRouter.get("/orderdetails/:id", orderDetails);
orderRouter.put("/updatestatus/:id", updateStatus);

export default orderRouter;
