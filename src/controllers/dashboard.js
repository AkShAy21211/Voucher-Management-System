import { createNewVoucher } from "../services/voucher.js";
import { generateQr } from "../utils/qr.js";

export const dashboard = async (req, res) => {
  const TITLE = "dashboard";

  return res.render("pages/dashboard", {
    TITLE,
    success: req.flash("success"),
    error: req.flash("error"),
  });
};

export const generateQrPost = async (req, res) => {
  const { voucher_code,qr_code_path,expiry_date } = await generateQr();
  const user_id = req.session?.user?.id;


  
  if (!voucher_code || !expiry_date ||!qr_code_path) {
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
