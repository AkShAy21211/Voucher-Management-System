function isAuthenticated(req, res, next) {
  console.log(req.session.user);
  
  if (req.session.user.isAuthenticated) {
    next();
  } else {
    return res.redirect(401,"/");
  }
}

export default isAuthenticated;
