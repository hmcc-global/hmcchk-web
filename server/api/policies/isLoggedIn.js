module.exports = async function (req, res, proceed) {
  let token;

  // check if authorisation header is present
  if (req.headers && req.headers.authorisation) {
    let authHeaders = req.headers.authorisation.split(" ");
    if (authHeaders.length === 2) {
      let scheme = authHeaders[0];
      let cred = authHeaders[1];

      if (scheme === "Bearer") {
        token = cred;
      }
    } else {
      return res.status(401).json({
        err: "Format is not Authorisation: Bearer [token]",
      });
    }
  } else {
    // authorisation header not present
    return res.status(401).json({
      err: "No authorisation header found",
    });
  }

  try {
    req.user = await sails.helpers.auth.verifyJwt(token);
  } catch (err) {
    sails.log.error(err);
    return res.status(401).json({
      err: "Invalid token",
    });
  }

  proceed();
};
