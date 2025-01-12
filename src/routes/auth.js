import express from "express";
import {
  checkUserName,
  login,
  loginPost,
  loginRedirect,
  logout,
  register,
  registerPost,
} from "../controllers/atuh.js";
import asyncHandler from "express-async-handler";
import isAuthenticated from "../middleware/authenticate.js";
import isLoggedOut from "../middleware/isLoggedOut.js";

const router = express.Router();

router.get("/", isLoggedOut, asyncHandler(loginRedirect));

router.get("/sign-in", isLoggedOut, asyncHandler(login));

router.get("/sign-up", isLoggedOut, asyncHandler(register));

router.post("/sign-up", isLoggedOut, asyncHandler(registerPost));

router.post("/sign-in", isLoggedOut, asyncHandler(loginPost));

router.get("/sign-out", isAuthenticated, asyncHandler(logout));

router.get("/check-username", isLoggedOut, asyncHandler(checkUserName));

export default router;
