import express from "express";
import {
  checkUserName,
  login,
  loginPost,
  loginRedirect,
  register,
  registerPost,
} from "../controllers/atuh.js";
const router = express.Router();


router.get("/", loginRedirect);

router.get("/sign-in", login);

router.get("/sign-up", register);

router.post("/sign-up", registerPost);

router.post("/sign-in", loginPost);

router.get("/check-username", checkUserName);


export default router;
