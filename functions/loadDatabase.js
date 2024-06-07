const mysql = require('mysql');

module.exports = () => {

    const { DBhost, DBuser, DBpass, DBname, DBport } = process.env;

    if (!DBhost || !DBuser || !DBpass || !DBname || !DBport) return console.warn("Missing Database Credentials");

    const db = mysql.createConnection({
        host: DBhost,
        user: DBuser,
        password: DBpass,
        database: DBname,
        port: DBport
    });

    setInterval(() => {
        db.query(`SELECT 1;`);
    }, 6 * 60 * 60 * 1000);

    return db;
}