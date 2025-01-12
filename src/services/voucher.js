import pool from "../config/database.js";
import { voucherMessages } from "../constants/messages.js";

export const createNewVoucher = async (
  voucher_code,
  qr_code_path,
  expiry_date,
  user_id
) => {
  // 5. Save the voucher details to the database
  const query = `
    INSERT INTO vouchers (voucher_code, qr_code_path, expiry_date, user_id)
    VALUES (?, ?, ?, ?)
  `;
  const [voucher] = await pool.execute(query, [
    voucher_code.toString(),
    qr_code_path,
    expiry_date,
    user_id,
  ]);

  if (voucher) {
    return {
      success: true,
      message: voucherMessages.voucherCreated,
    };
  }
  return {
    success: false,
    message: voucherMessages.voucherCreationFailed,
  };
};

export const getAllVouchers = async (user_id) => {
  // 5. Save the voucher details to the database
  const query = "SELECT * FROM vouchers WHERE user_id = ?";

  const [vouchers] = await pool.execute(query, [user_id]);

  if (vouchers.length) {
    return {
      vouchers,
    };
  }
  return {
    vouchers: [],
  };
};
