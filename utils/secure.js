//check role module

const checkrole = (userrole, sysrole) =>
  userrole.some((item) => sysrole.includes(item));

const { checkRole, verifyToken } = require("./token");
const secure = (sysRole) => {
  return (req, res, next) => {
    try {
      const { access_token } = req.headers;
      //what to do if no token
      if (!access_token) throw new Error("Token is missing");
      //check the token is valid or not
      const isValid = verifyToken(access_token);
      //token expired

      if (!isValid) throw new Error("tToken is expired");
      const { data } = isValid;
      const validRole = checkRole({ sysRole, userRole: data?.roles || [] });
      if (!validRole) throw new Error("user unauthorized");
      next();
    } catch (e) {
      next(e);
    }
  };
};
const mw = (sysRole) => {
  return (req, res, next) => {
    const { role } = req.headers;
    console.log({ userrole: role, sysRole: sysRole });
    const result = checkrole([role], sysRole);
    if (!result) res.status(404).json({ msg: "unauthorized access" });
    next();
  };
};
module.exports = { checkrole, mw, secure };
