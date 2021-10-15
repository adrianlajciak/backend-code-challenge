async function authenticate(ctx, next) {
  if (!ctx.header.authorization) {
    ctx.throw(401, 'Unauthorized')
  }
  return next();
};

module.exports = {
  authenticate,
};
