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

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

const loadRoutes = require('./functions/loadRoutes');
const loadDatabase = require('./functions/loadDatabase')
app.db = loadDatabase();
loadRoutes(app);

io.on('connection', (socket) => {
    console.log(`Connection socket`);
    require("./socket_handler/-onjoin")(socket);

    const nonAuthFiles = fs.readdirSync("./socket_handler")
        .filter(f => f.endsWith(".js") && !f.startsWith("-") && !f.requireAuth)
        .map(f => require(`./socket_handler/${f}`));

    nonAuthFiles.forEach(({ name, execute }) => socket.on(name, execute.bind(null, socket)));

    if (!socket.request.session.auth) return socket.emit('error', {type: "Websocket", body: "Unauthorized"});

    const authFiles = fs.readdirSync("./socket_handler")
        .filter(f => f.endsWith(".js") && !f.startsWith("-") && f.requireAuth)
        .map(f => require(`./socket_handler/${f}`));

    authFiles.forEach(({ name, execute }) => socket.on(name, execute.bind(null, socket)));
});

app.get("*", (req, res) => {
    res.render('404');
});

server.listen(process.env.WEBport, () => {
    console.log(`WebServer start on ${process.env.WEBport}`)
});
