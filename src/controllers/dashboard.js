import { createNewVoucher, getAllVouchers } from "../services/voucher.js";
import generatePDF from "../utils/generatePdf.js";
import { generateQr } from "../utils/qr.js";

export const dashboard = async (req, res) => {
  const TITLE = "dashboard";
  const user_id = req.session?.user?.id;
  const { vouchers } = await getAllVouchers(user_id);

  return res.render("pages/dashboard", {
    TITLE,
    vouchers,
    success: req.flash("success"),
    error: req.flash("error"),
  });
};

export const generateQrPost = async (req, res) => {
  const { voucher_code, qr_code_path, expiry_date } = await generateQr();
  const user_id = req.session?.user?.id;

  if (!voucher_code || !expiry_date || !qr_code_path) {
    req.flash("error", "Failed to generate QR code");
    return res.redirect("/dashboard");
  }

  const voucher = await createNewVoucher(
    voucher_code,
    qr_code_path,
    expiry_date,
    user_id
  );

  if (voucher.success) {
    return res.status(201).json(voucher);
  }

  return res.status(400).json(voucher);
};

export const generateAndPrintVocherPdf = async (req, res) => {
  const { voucherNumber } = req.params;
  // Generate PDF for the voucher
  generatePDF(
    voucherNumber,
    "Voucher Title",
    "2025-01-01",
    300,
    500,
    18,
    12
  ).then((pdfBuffer) => {
    res.contentType("application/pdf");
    res.download(pdfBuffer, (err) => {
      if (err) {
        console.error("Error sending file:", err);
        res.status(500).send("Failed to download the PDF.");
      }
    });
  });
};
