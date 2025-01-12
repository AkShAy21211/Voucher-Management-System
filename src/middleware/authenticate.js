function isAuthenticated(req, res, next) {

  if (req.session.user && req.session.user.isAuthenticated) {
    next();
  } else {
    return res.redirect("/sign-in");
  }
}

export default isAuthenticated;

