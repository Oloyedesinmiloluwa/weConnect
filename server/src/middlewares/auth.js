import jwt from 'jsonwebtoken';

const authWare = (req, res, next) => {
  // const { token } = process.env;
  
  return jwt.verify(req.headers['x-access-token'], process.env.secret_key, (error, decoded) => {
    if (error) return res.status(401).send({ message: 'Authentication failed' });
    req.decoded = decoded;
    return next();
  });
};
export default authWare;
