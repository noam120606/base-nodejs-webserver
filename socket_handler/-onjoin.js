module.exports = async (socket) => {
    socket.rcon.on('response', async response => {
        const players = response.split(":")[1];
        if (!players) return;
        let list = players.split(', ');
        if (list.length>0) list[0] = list[0].substring(1)
        socket.emit('playerList', list);
    });
};