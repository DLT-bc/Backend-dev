import http from 'http';
import app from './app';
import { config } from './config';
import { sequelize } from './models';
import { Redis, Socket } from './services';

(async function start() {
  const server = http.createServer(app);
  await sequelize.authenticate();
  // eslint-disable-next-line no-console
  console.log('Database module initialized');
  await Redis.init();
  Socket.init(server);
  server.listen(config.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listened on port: ${config.PORT}`);
  });
}()).catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(0);
});
