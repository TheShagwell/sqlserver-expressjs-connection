const config = {
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  server: process.env.SQL_SERVERNAME,
  database: process.env.SQL_DBNAME,
  options: {
    trustServerCertificate: true,
    trustedConnection: false,
    instancename: process.env.SQL_INSTANCENAME,
  },
  port: 1433,
};

export default config;