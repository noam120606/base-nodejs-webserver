socket.on("error", (data) => {
    const { type, body } = data;
    console.error(`[ERROR] ${type} : ${body}`)
})