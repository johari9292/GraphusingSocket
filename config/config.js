exports.config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "johari9292",
  mongoUri: process.env.MONGODB_URI,
};
