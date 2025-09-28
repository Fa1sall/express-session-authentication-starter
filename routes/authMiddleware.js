export function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(404).send("<h1>You are not authenticated!</h1>");
  }
}

export function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.admin) {
    next();
  } else {
    res.status(403).send("You are not an admin!");
  }
}
