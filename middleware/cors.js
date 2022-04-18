exports.CORS_OPTIONS = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST, DELETE, OPTIONS',
  preflightContinue: true,
  optionsSuccessStatus: 204,
  exposedHeaders: 'x-auth-token',
};
