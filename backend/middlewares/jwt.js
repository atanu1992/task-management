const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
  const authorizationToken = req.headers['authorization'];
  if (!authorizationToken) {
    return res.status(401).send('Unauthorized access');
  }

  // check token has Bearer present
  if (!authorizationToken.includes('Bearer')) {
    return res.status(401).send('Unauthorized access');
  }

  // check x-refresh-token
  const refreshToken = req.headers['x-refresh-token'];
  if (!refreshToken) {
    return res.status(401).send('Unauthorized access');
  }
  // Bearer token, ['Bearer','token']
  let token = authorizationToken.split(' ')[1];
  if (!token) {
    return res.status(403).send('Unauthorized access');
  }

  const verifyJWTToken = checkToken(token, 'jwt');
  const verifyRefreshToken = checkToken(refreshToken, 'refresh');
  if (verifyJWTToken === false && verifyRefreshToken === false) {
    return res.status(401).send('Unauthorized access');
  } else if (!verifyJWTToken && verifyRefreshToken !== false) {
    return res.status(403).send('token expired');
  }
  req.userId = verifyJWTToken;
  return next();
};

const verifyRefrehToken = (req, res, next) => {
  // check x-refresh-token
  const refreshToken = req.headers['x-refresh-token'];
  if (!refreshToken) {
    return res.status(401).send('Unauthorized access');
  }

  const verifyRefreshToken = checkToken(refreshToken, 'refresh');
  if (verifyRefreshToken === false) {
    return res.status(401).send('Unauthorized access');
  }
  req.userId = verifyRefreshToken;
  return next();
};

const checkToken = (token, type) => {
  if (type == 'jwt') {
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
      return decodedToken.id;
    } catch (err) {
      return false;
    }
  } else {
    try {
      const decodedRefreshToken = jwt.verify(token, process.env.REFRESH_TOKEN);
      return decodedRefreshToken.id;
    } catch (err) {
      return false;
    }
  }
};

const createToken = async (id) => {
  const token = await jwt.sign({ id: id }, process.env.SECRET_TOKEN, {
    expiresIn: '10m',
  });
  const refreshToken = await jwt.sign({ id: id }, process.env.REFRESH_TOKEN, {
    expiresIn: '20m',
  });
  return {
    token: token,
    refreshToken: refreshToken,
    // refreshTokenTimeInSeconds: 3600 * 1000,
  };
};

module.exports = { verifyToken, createToken, verifyRefrehToken };
