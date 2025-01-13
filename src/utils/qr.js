import path from 'path';
import qr from 'qrcode';
import { fileURLToPath } from "url";
import CONFIG from '../config/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUrl = CONFIG.BASE_URL; 



export const generateQr = async (expiry_days) => {
  const voucherNumber = Math.floor(1000000000 + Math.random() * 9000000000);

  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + expiry_days);


  // Encode the URL in the QR code
  const qrData = `${baseUrl}/dashboard/check-voucher/${voucherNumber}`;

  const qrCodePath = `/vouchers/qrcode_${voucherNumber}.png`;
  const outputPath = path.join('public', qrCodePath);

  await qr.toFile(outputPath, qrData);

  return {
    voucher_code: voucherNumber,
    qr_code_path: qrCodePath,
    expiry_date: expiryDate,
  };
};
