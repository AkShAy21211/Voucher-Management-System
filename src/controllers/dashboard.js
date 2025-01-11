export const dashboard = async (req, res) => {
  const TITLE = "dashboard";

  return res.render("pages/dashboard", {
    TITLE,
    success: req.flash("success"),
    error: req.flash("error"),
  });
};