import express from "express";

const router = express.Router();



router.get("/", (req, res) => {
  return res.status(404).render("pages/404", {
    TITLE: "Not Found",
  });
});

export default router;
