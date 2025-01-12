import path from 'path';
import qr from 'qrcode';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const generateQr = async (expiry_days) => {
  const voucherNumber = Math.floor(1000000000 + Math.random() * 9000000000);

  const qrCodePath = `/vouchers/qrcode_${voucherNumber}.png`;
  const outputPath = path.join('public', qrCodePath);

  await qr.toFile(outputPath, voucherNumber.toString());

  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + expiry_days);

  
  return {
    voucher_code: voucherNumber,
    qr_code_path: qrCodePath,
    expiry_date: expiryDate, 
  };
};
