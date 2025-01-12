import path from 'path';
import qr from 'qrcode';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const generateQr = async (user_id) => {
  // 1. Generate a 10-digit random number
  const voucherNumber = Math.floor(1000000000 + Math.random() * 9000000000);

  // 2. Define the path to save the QR code image
  const qrCodePath = `/vouchers/qrcode_${voucherNumber}.png`;
  const outputPath = path.join('public', qrCodePath);

  // 3. Generate the QR code image and save it to the file system
  await qr.toFile(outputPath, voucherNumber.toString());

  // 4. Calculate the expiry date (1 day from now)
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 1);

  
  return {
    voucher_code: voucherNumber,
    qr_code_path: qrCodePath,
    expiry_date: expiryDate, 
  };
};
