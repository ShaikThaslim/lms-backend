import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createCheckoutSection, getAllPurchasedCourse, getCourseDetailWithPurchaseStatus, stripeWebhook } from "../controllers/coursePurchase.controller.js";

const router=express.Router();

router.route("/checkout/create-checkout-session").post(isAuthenticated,createCheckoutSection);
router.route("/webhook").post(express.raw({type:"application/json"}),stripeWebhook);
router.route("/course/:courseId/detail-with-status").get(isAuthenticated,getCourseDetailWithPurchaseStatus);
router.route("/").get(isAuthenticated,getAllPurchasedCourse);
export default router;