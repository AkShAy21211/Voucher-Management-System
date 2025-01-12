import pool from "../config/database.js";
import { hashPassword } from "../utils/bcrypt.js";
import { registerMessages } from "../constants/messages.js";

export const createNewUser = async (username, email, password) => {
  const hashedPassword = await hashPassword(password, 10);

  const [user] = await pool.query(
    `INSERT INTO users (username, email, password) VALUES (?,?,?)`,
    [username, email, hashedPassword]
  );

  if (user) {
    return {
      success: true,
      message: registerMessages.registrationSuccess,
    };
  }
  return {
    success: false,
    message: registerMessages.registrationFailed,
  };
};

export const findUserByEmail = async (email) => {
  const [user] = await pool.query(`SELECT * FROM users WHERE email =?`, [
    email,
  ]);

  if (user.length) {
    return {
      success: true,
      message: registerMessages.userFoundError,
    };
  }
  return {
    success: false,
  };
};

export const findUserByUsername = async (username) => {
  const [user] = await pool.query(`SELECT * FROM users WHERE username =?`, [
    username,
  ]);

  
  if (user.length) {
    return {
      success: true,
      user,
      message: registerMessages.userNameTakenError,
    };
  }
  return {
    success: false,
    message: registerMessages.userNameAvailable,
  };
};
