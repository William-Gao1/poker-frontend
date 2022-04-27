import { CONNECT, JOIN_ROOM, LEAVE_ROOM } from './socket.types';

export const connectSocket = () => {
    return {
        type: CONNECT
    }
}

export const joinRoom = (activeId) => {
    return {
        type: JOIN_ROOM,
        payload: activeId
    }
}

export const leaveRoom = () => {
    return {
        type: LEAVE_ROOM
    }
}