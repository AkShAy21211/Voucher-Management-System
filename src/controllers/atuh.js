import { loginMessages, registerMessages } from "../constants/messages.js";
import {
  createNewUser,
  findUserByEmail,
  findUserByUsername,
} from "../services/auth.js";
import { comparePassword } from "../utils/bcrypt.js";

export const loginRedirect = async (req, res) => {
  res.status(301).redirect("/sign-in");
};

export const register = async (req, res) => {
  const TITLE = "register";

  return res.render("pages/register", {
    TITLE,
    success: req.flash("success"),
    error: req.flash("error"),
  });
};

export const login = async (req, res) => {
  const TITLE = "login";

  console.log(req.session);

  return res.render("pages/login", {
    TITLE,
    success: req.flash("success"),
    error: req.flash("error"),
  });
};

export const registerPost = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  // Check if password and confirm password match
  if (!username || !email || !password || !confirmPassword) {
    req.flash("error", registerMessages.allFieldsRequired);
    return res.redirect("/sign-up");
  }

  if (password !== confirmPassword) {
    req.flash("error", registerMessages.passwordsDoNotMatch);
    return res.redirect("/sign-up");
  }

  const existingUser = await findUserByEmail(email);

  if (existingUser.success) {
    req.flash("error", existingUser.message);
    return res.redirect("/sign-up");
  }

  const user = await createNewUser(username, email, password);

  if (user.success) {
    req.flash("success", user.message);
    return res.redirect("/sign-in");
  } else {
    req.flash("error", user.message);
    return res.redirect("/sign-up");
  }
};

export const loginPost = async (req, res) => {
  const { username, password } = req.body;

  // Check if password and confirm password match
  if (!username || !password) {
    req.flash("error", loginMessages.allFieldsRequired);
    return res.redirect("/sign-in");
  }

  const data = await findUserByUsername(username);

  if (!data.success) {
    req.flash("error", loginMessages.userNotFoundError);
    return res.redirect("/sign-in");
  }

  const validPassword = await comparePassword(password, data.user[0].password);

  if (!validPassword) {
    req.flash("error", loginMessages.incorrectCredentials);
    return res.redirect("/sign-in");
  }

  req.session.user = {
    isAuthenticated: true,
    id: data.user[0].id,
    username: data.user[0].username,
    email: data.user[0].email,
  };
  req.session.save();

  req.flash("success", loginMessages.loginSuccess);
  return res.redirect("/dashboard");
};

export const checkUserName = async (req, res) => {
  const { username } = req.query;

  const existingUser = await findUserByUsername(username);
  if (existingUser.success) {
    return res.status(400).json(existingUser);
  }
  return res.status(200).json(existingUser);
};
