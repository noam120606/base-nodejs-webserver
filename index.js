require('dotenv').config({ path: './.env' });

const fs = require('fs');
const express = require('express');
const app = express();

const session = require('express-session');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const sessionMiddleware = session({ 
    secret: process.env.SessionSecret,
    resave: true,
    saveUninitialized: true,
});
app.use(sessionMiddleware);
io.engine.use(sessionMiddleware);

app.ejs = require('ejs');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

const loadRoutes = require('./functions/loadRoutes');
const loadDatabase = require('./functions/loadDatabase')
app.db = loadDatabase();
loadRoutes(app);

io.on('connection', (socket) => {
    if (!socket.request.session.auth) return socket.emit('error', {type: "Non connecté"});
    console.log(`Connection socket`);
    require("./socket_handler/-onjoin")(socket);
    fs.readdirSync("./socket_handler").filter(f => f.endsWith(".js")).filter(f => !f.startsWith("-")).forEach(async file => {
        let func = require(`./socket_handler/${file}`);
        socket.on(func.name, func.execute.bind(null, socket));
    });
});

app.get("*", (req, res) => {
    res.render('404');
});

server.listen(process.env.WEBport, () => {
    console.log(`WebServer start on ${process.env.WEBport}`)
});