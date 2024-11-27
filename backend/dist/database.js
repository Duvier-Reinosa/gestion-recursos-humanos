"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const pg_1 = require("pg");
const keys = {
    host: "aws-0-us-west-1.pooler.supabase.com",
    user: "postgres.ipctzjexgexsxjdravya",
    // password: process.env.SUPABASE_PASSWORD,
    password: '#5D!Yr2DnnQXXny',
    database: "postgres",
    port: 6543,
    ssl: {
        rejectUnauthorized: false,
        ca: process.env.CA_CERTIFICATE
    }
};
exports.db = new pg_1.Pool(keys);
exports.db.connect((err, client, release) => {
    if (err) {
        return console.log('Error en la conexión', err.stack);
    }
    else {
        return console.log('base de datos conectada');
    }
});
