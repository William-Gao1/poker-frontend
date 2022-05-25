import { CONNECT, JOIN_ROOM, LEAVE_ROOM, CREATE_ROOM, START_GAME, CHECK_OR_CALL, FOLD, BET } from './socket.types';

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

export const startGame = () => {
    return {
        type: START_GAME
    }
}

export const createRoom = (bigBlind, smallBlind) => {
    return {
        type: CREATE_ROOM,
        payload: { bigBlind, smallBlind }
    }
}

export const checkOrCall = () => {
    return {
        type: CHECK_OR_CALL
    }
}

export const fold = () => {
    return {
        type: FOLD
    }
}

export const bet = (amount) => {
    return {
        type: BET,
        payload: amount
    }
}