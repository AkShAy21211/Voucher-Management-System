import pool from "../config/database.js";
import { hashPassword } from "../utils/bcrypt.js";
import { registerErrors } from "../constants/errorMessages.js";

export const createNewUser = async (username, email, password) => {
  const hashedPassword = await hashPassword(password, 10);

  const [user] = await pool.query(
    `INSERT INTO users (username, email, password) VALUES (?,?,?)`,
    [username, email, hashedPassword]
  );

  if (user) {
    return {
      success: true,
      message: registerErrors.registrationSuccess,
    };
  }
  return {
    success: false,
    message: registerErrors.registrationFailed,
  };
};

export const findUserByEmail = async (email) => {
  const [user] = await pool.query(`SELECT * FROM users WHERE email =?`, [
    email,
  ]);

  if (user.length) {
    return {
      success: true,
      message: registerErrors.userFoundError,
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
      message: registerErrors.userNameTakenError,
    };
  }
  return {
    success: false,
    message: registerErrors.userNameAvailable,
  };
};
