const config = {
  user: process.env.SQLUSER,
  password: process.env.SQLPASSWORD,
  server: "DESKTOP-KVMMBDK",
  database: process.env.SQLDBNAME,
  options: {
    trustServerCertificate: true,
    trustedConnection: false,
    instancename: process.env.SQLINSTANCENAME,
  },
  port: 1433,
};

export default config;