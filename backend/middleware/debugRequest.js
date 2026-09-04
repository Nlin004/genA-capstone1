function debugRequest(req, res, next) {
  if (process.env.DEBUG_API !== 'true') return next();

  const startedAt = Date.now();
  const bodyKeys = Object.keys(req.body || {}).filter((key) => !['password', 'token'].includes(key));
  console.log(`[api] -> ${req.method} ${req.originalUrl}`, {
    bodyKeys,
    query: req.query,
  });

  res.on('finish', () => {
    console.log(`[api] <- ${req.method} ${req.originalUrl} ${res.statusCode} ${Date.now() - startedAt}ms`, {
      userId: req.user?._id || null,
    });
  });

  next();
}

module.exports = debugRequest;
