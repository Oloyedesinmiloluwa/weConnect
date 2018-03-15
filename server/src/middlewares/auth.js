import jwt from 'jsonwebtoken';

const authWare = (req, res, next) => {
  const { token } = process.env;// || req.headers;
  if (!token) return res.status(401).send('No token found');
  return jwt.verify(token, process.env.secret_key, (error, decoded) => {
    if (error) return res.status(401).send('Authentication failed');
    req.decoded = decoded;
    return next();
  });
};
export default authWare;
