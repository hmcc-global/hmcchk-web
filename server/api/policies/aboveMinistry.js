// TODO move this to custom.js
const aboveMinistryPrivs = ['ministry', 'tc', 't3ch', 'admin', 'stewardship'];

module.exports = async function (req, res, proceed) {
  if (req.user) {
    if (!aboveMinistryPrivs.includes(req.user.accessType)) {
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
