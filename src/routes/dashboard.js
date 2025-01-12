import express from "express";
import {
  dashboard,
  deleteVoucher,
  generateAndPrintVocherPdf,
  generateQrPost,
  settings,
  settingsPost,
} from "../controllers/dashboard.js";
import isAuthenticated from "../middleware/authenticate.js";
import asyncHandler from "express-async-handler";

const router = express.Router();

router.get("/", isAuthenticated, asyncHandler(dashboard));
router.get("/generate-qr", isAuthenticated, asyncHandler(generateQrPost));

router.get(
  "/print-voucher/:voucherNumber",
  isAuthenticated,
  asyncHandler(generateAndPrintVocherPdf)
);

router.delete("/voucher/:voucherId", isAuthenticated,asyncHandler(deleteVoucher))

router
  .route("/settings")
  .get(isAuthenticated, asyncHandler(settings))
  .put(isAuthenticated, asyncHandler(settingsPost));

router.post("/generate-qr", isAuthenticated, asyncHandler(generateQrPost));



export default router;
