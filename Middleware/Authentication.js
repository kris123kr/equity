const apiKey = 'Equity';

const apiKeyAuth = (req, res, next) => {
    const providedApiKey = req.headers['api-key'];
    if (!providedApiKey || providedApiKey !== apiKey) {
      return res.status(401).json({ error: 'Invalid API key' });
    }
    next();
  };

  const tokenAuth = async (req, res, next) => {
    const providedToken = req.headers['authorization'];
    const [user] = await connection.query('SELECT * FROM tokens WHERE token = ?', [providedToken]);
  
    if (!providedToken || user.length === 0) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    req.user = user[0];
    next();
  };

  module.exports = {apiKeyAuth,tokenAuth};