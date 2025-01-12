import express from "express";
import { dashboard, generateAndPrintVocherPdf, generateQrPost, settings } from "../controllers/dashboard.js";
import isAuthenticated from "../middleware/authenticate.js";

const router = express.Router();


router.get("/", isAuthenticated, dashboard);
router.get("/generate-qr", generateQrPost);

// Route to print voucher PDF
router.get('/print-voucher/:voucherNumber',generateAndPrintVocherPdf);

router.get('/settings',settings);

router.post("/generate-qr", generateQrPost);


export default router;
