import express from "express";
import asyncHandler from "express-async-handler";

const router = express.Router();

router.get(
  "/",
  asyncHandler((req, res) => {
    return res.status(404).render("pages/404", {
      TITLE: "Not Found",
    });
  })
);

export default router;
