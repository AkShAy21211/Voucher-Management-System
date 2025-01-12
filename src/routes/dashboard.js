import express from "express";
import flash from "express-flash";
import { dashboard, generateQrPost } from "../controllers/dashboard.js";
import isAuthenticated from "../middleware/authenticate.js";

const router = express.Router();

router.use(flash());

router.get("/", isAuthenticated, dashboard);
router.get("/generate-qr", generateQrPost);

router.post("/generate-qr", generateQrPost);


export default router;
