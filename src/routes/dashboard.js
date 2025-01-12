import express from "express";
import flash from "express-flash";
import { dashboard, generateAndPrintVocherPdf, generateQrPost } from "../controllers/dashboard.js";
import isAuthenticated from "../middleware/authenticate.js";

const router = express.Router();

router.use(flash());

router.get("/", isAuthenticated, dashboard);
router.get("/generate-qr", generateQrPost);

// Route to print voucher PDF
router.get('/print-voucher/:voucherNumber',generateAndPrintVocherPdf);


router.post("/generate-qr", generateQrPost);


export default router;
