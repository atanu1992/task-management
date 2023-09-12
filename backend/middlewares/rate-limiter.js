const rateLimit = require('express-rate-limit');

const apiCallLimitPerMinute = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute(s)
  max: 100, // Limit each IP to 100 requests per `window` (here, per 1 minute)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Too many api call.', // 429
});

module.exports = apiCallLimitPerMinute;
