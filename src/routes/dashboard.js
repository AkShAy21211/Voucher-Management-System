import express from "express";
import flash from "express-flash";
import { dashboard } from "../controllers/dashboard.js";

const router = express.Router();

router.use(flash());

router.get("/", dashboard);

export default router;
