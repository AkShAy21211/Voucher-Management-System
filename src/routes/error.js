import express from "express";
import flash from "express-flash";

const router = express.Router();

router.use(flash());


router.get("/", (req, res) => {
  return res.status(404).render("pages/404", {
    TITLE: "Not Found",
  });
});

export default router;
