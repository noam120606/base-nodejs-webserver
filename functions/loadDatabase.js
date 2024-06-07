const mysql = require('mysql');

module.exports = () => {

    const { DBhost, DBuser, DBpass, DBname, DBport } = process.env;

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