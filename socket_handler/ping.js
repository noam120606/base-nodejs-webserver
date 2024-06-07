module.exports = {
    name: "ping",
    requireAuth: false,
    execute: (socket, data) => {
        socket.emit("pong", Date.now());
    }
}