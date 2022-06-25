const abovet3chPrivs = ["t3ch"];

module.exports = async function (req, res, proceed) {
  if (req.user) {
    if (!abovet3chPrivs.includes(req.user.accessType)) {
      return res.status(401).json({
        err: "Unauthorised",
      });
    }
  } else {
    // user not found
    return res.status(401).json({
      err: "No user found",
    });
  }
  proceed();
};
