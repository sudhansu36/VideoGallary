const checkRole = (role) => {
  return (req, res, next) => {
    if (req.body.type !== role) {
      res.status(401);
      return res.send({ message: "User is not allowed" });
    } else {
      next();
    }
  };
};
module.exports = { checkRole };
