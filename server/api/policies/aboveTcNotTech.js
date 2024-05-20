const aboveTcNotTechPrivs = ['tc', 'admin', 'stewardship'];

module.exports = async function (req, res, proceed) {
  if (req.user) {
    if (!aboveTcNotTechPrivs.includes(req.user.accessType)) {
      return res.status(401).json({
        err: 'Unauthorised',
      });
    }
  } else {
    // user not found
    return res.status(401).json({
      err: 'No user found',
    });
  }
  proceed();
};
