// TODO move this to custom.js
const isMinistryPrivs = ['ministry'];

module.exports = async function (req, res, proceed) {
  if (req.user) {
    if (!isMinistryPrivs.includes(req.user.accessType)) {
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
