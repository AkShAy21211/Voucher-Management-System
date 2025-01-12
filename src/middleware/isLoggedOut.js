function isLoggedOut(req, res, next) {
  if (!req.session.user || !req.session.user.isAuthenticated) {
    next();
  } else {
    return res.redirect("/dashboard");
  }
}

export default isLoggedOut;
