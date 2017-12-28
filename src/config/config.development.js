import logger from '../lib/logger';

module.exports = {
  database: 'examen',
  username: 'postgres',
  password: 'postgres',
  timezone: '-04:00',
  params: {
    dialect: 'postgres',
    port: 5432,
    host: 'localhost',
    sync: { force: process.env.FORCE || false },
    logging: (sql) => {
      logger.info(`[${new Date()}] ${sql}`);
    },
    define: {
      underscored: true,
    },
  },
  jwtSecret: 'AGETIC-2017',
  jwtSession: { session: false },
  puerto: 4000,
};
