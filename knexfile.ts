// Update with your config settings.

export const development = {
  client: 'postgresql',
  debug: true,
  connection: {
    database: 'databasename',
    host: process.env.POSTGRES_PORT_5432_TCP_ADDR,
    multipleStatements: true,
    password: 'master',
    port: 5432,
    user: 'master',
  },
  migrations: {
    directory: 'src/db/migrations'
  },
};

export const mysql = {
  client: 'mysql',
  debug: true,
  connection: {
    database: 'mysql',
    host: process.env.MYSQL_PORT_3306_TCP_ADDR,
    multipleStatements: true,
    password: 'root',
    port: 3306,
    user: 'root',
  },
  migrations: {
    directory: 'src/db/migrations'
  },
};

export const mssql = {
  client: 'mssql',
  debug: false,
  connection: {
    database: 'model',
    host: process.env.MSSQL_PORT_1433_TCP_ADDR,
    multipleStatements: true,
    password: 'Str0nk@p@assword!',
    port: 1433,
    user: 'sa',
  },
  migrations: {
    directory: 'src/db/migrations'
  },
};

export default {
  development,
  mssql,
  mysql,
};
