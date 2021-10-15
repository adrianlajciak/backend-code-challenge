const Koa = require('koa');
const koaBody = require('koa-body');
const koaCors = require('kcors');
const routes = require('./routes');
const pino = require('pino');
const logger = pino();
const http = require('http');

const app = new Koa();

const server = http.createServer(app.callback());

app.use(koaCors());
app.use(koaBody());
app.use(routes);

// Define start method
app.start = async () => {
  logger.info('Starting server..');

    await new Promise((resolve, reject) => {
    const listen = server.listen(8080, (err) =>
      err ? reject(err) : resolve(listen)
    );
  });
};

// Define shutdown method
app.stop = async () => {
  logger.info('Shutting down server..');
  await server.close();
};

// Start server
if (require.main === module) {
  app
    .start()
    .then(() => logger.info('server is running'))
    .catch((err) => logger.error(err))
};

process.once('SIGINT', () => app.stop());
process.once('SIGTERM', () => app.stop());
