export const connectToRoom = (socket, activeId) => {
    socket.emit('join room', activeId, (data) => (console.log(data)))
    return socket;
}