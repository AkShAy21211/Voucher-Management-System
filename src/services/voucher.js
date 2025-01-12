import e from "connect-flash";
import pool from "../config/database.js";
import { voucherMessages } from "../constants/messages.js";

export const createNewVoucher = async (
  voucher_code,
  qr_code_path,
  expiry_date,
  user_id
) => {
  try {
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
  } catch (error) {
    console.error("Error creating voucher:", error);
  }
};

export const getAllVouchers = async (user_id) => {
  try {
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
  } catch (error) {
    console.error("Error fetching vouchers:", error);
  }
};

export const getVloucherByNumber = async (voucher_code) => {
  try {
    const query = "SELECT * FROM vouchers WHERE voucher_code = ?";

    const [voucher] = await pool.execute(query, [voucher_code]);
    
    if (voucher.length) {
      return {
        voucher: voucher[0],
      };
    }
    return {
      voucher: [],
    };
  } catch (error) {
    console.error("Error fetching vouchers:", error);
  }
};

export const getVoucherSettings = async (user_id) => {
  try {
    const query = "SELECT * FROM settings WHERE user_id =?";
    const [settings] = await pool.execute(query, [user_id]);

    
    if (settings.length) {
      return {
        success: true,
        settings: settings[0],

      };
    }
    return {
      success: false,
    };
  } catch (error) {
    console.error("Error fetching voucher settings:", error);
  }
};
export const createVoucherSettings = async (
  title,
  expiry_days,
  width_mm,
  height_mm,
  title_font,
  text_font,
  user_id
) => {
  try {
    // Check if settings already exist for the user
    const [existingSettings] = await pool.execute(
      "SELECT * FROM settings WHERE user_id = ?",
      [user_id]
    );

    if (existingSettings.length > 0) {
      // Update existing settings
      const updateQuery = `
        UPDATE settings
        SET title = ?, expiry_days = ?, width_mm = ?, height_mm = ?, title_font = ?, text_font = ?, created_at = NOW()
        WHERE user_id = ?
      `;
      await pool.execute(updateQuery, [
        title || existingSettings[0].title,
        expiry_days || existingSettings[0].expiry_days,
        width_mm || existingSettings[0].width_mm,
        height_mm || existingSettings[0].height_mm,
        title_font || existingSettings[0].title_font,
        text_font || existingSettings[0].text_font,
        user_id || existingSettings[0].user_id,
      ]);

      return {
        success: true,
        message: voucherMessages.voucherSettingsUpdated,
      };
    } else {
      // Insert new settings
      const insertQuery = `
        INSERT INTO settings (title, expiry_days, width_mm, height_mm, title_font, text_font, user_id)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      const [voucher] = await pool.execute(insertQuery, [
        title,
        expiry_days,
        width_mm,
        height_mm,
        title_font,
        text_font,
        user_id,
      ]);

      if (!voucher) {
        return {
          success: false,
          message: voucherMessages.voucherSettingsCreationFailed,
        };
      }
      return {
        success: true,
        message: voucherMessages.voucherSettingsCreated,
      };
    }
  } catch (error) {
    console.error("Error creating/updating voucher settings:", error);
    return {
      success: false,
      message: voucherMessages.voucherSettingsCreationFailed,
    };
  }
};
