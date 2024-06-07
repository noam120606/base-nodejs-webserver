setInterval(() => {
    socket.emit("ping", { type: "ping", body: undefined });
}, 10 * 1000);

socket.on("pong", (data) => {
    console.log(`Server ping is ${Date.now() - data}ms`);
})