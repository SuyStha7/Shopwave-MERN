import express from "express";
import { processPayment, sendStripeAPI } from "../controllers/paymentController.js";
const paymentRouter = express.Router();

paymentRouter.post("/process/payment", processPayment);
paymentRouter.get("/stripeapi", sendStripeAPI);

export default paymentRouter;
