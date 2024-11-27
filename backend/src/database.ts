import { Pool } from "pg";

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
}

export const db = new Pool(keys);

db.connect((err, client, release) => {
    if (err) {
        return console.log('Error en la conexión', err.stack)
    } else {
        return console.log('base de datos conectada')
    }
})