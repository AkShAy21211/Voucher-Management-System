import { voucherMessages } from "../constants/messages.js";
import {
  createNewVoucher,
  createVoucherSettings,
  deleteVoucherById,
  getAllVouchers,
  getVloucherByNumber,
  getVoucherSettings,
} from "../services/voucher.js";
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

export const settings = async (req, res) => {
  const TITLE = "settings";
  const user_id = req.session?.user?.id;

  const { settings } = await getVoucherSettings(user_id);

  return res.render("pages/settings", {
    TITLE,
    settings,
    success: req.flash("success"),
    error: req.flash("error"),
  });
};

export const settingsPost = async (req, res) => {
  const { title, expiryTime, width, height, titleFontSize, textFontSize } =
    req.body;
  const user_id = req.session?.user?.id;

  if (!expiryTime || !width || !height || !titleFontSize || !textFontSize) {
    req.flash("error", voucherMessages.allFieldsRequired);
    return res.redirect("/dashboard/settings");
  }

  const voucher = await createVoucherSettings(
    title,
    expiryTime,
    width,
    height,
    titleFontSize,
    textFontSize,
    user_id
  );

  if (voucher.success) {
    req.flash("success", voucher.message);
    return res.redirect("/dashboard/settings");
  }
};

export const generateQrPost = async (req, res) => {
  const user_id = req.session?.user?.id;

  const data = await getVoucherSettings(user_id);

  if (!data.success) {
    return res
      .status(400)
      .json({ ...data, message: voucherMessages.voucherSettingsNotFound });
  }
  const { settings } = data;

  const { voucher_code, qr_code_path, expiry_date } = await generateQr(
    settings.expiry_days
  );

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
  const user_id = req.session?.user?.id;

  const { settings } = await getVoucherSettings(user_id);
  const { voucher } = await getVloucherByNumber(voucherNumber);

  generatePDF(
    voucher?.voucher_code,
    voucher?.expiry_date,
    voucher?.generated_date,

    settings?.title,
    settings?.width_mm,
    settings?.height_mm,
    settings?.title_font,
    settings?.text_font
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

export const deleteVoucher = async (req, res) => {
  const { voucherId } = req.params;

  const data = await deleteVoucherById(voucherId);

  if (data.success) {
    req.flash("success", data.message);
    return res.status(200).json(data)
  }

  req.flash("error", data.message);
  return res.status(400).json(data)
};
