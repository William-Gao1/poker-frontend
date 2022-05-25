import { SET_ALERT, SET_ROOM, UPDATE_PLAYERS } from './room.types';

export const setRoom = (payload, seatNumber, maxPlayers, activeId, owner, roomStatus, bigBlind, smallBlind, turn, actionMaxTime, communityCards, pot, minimumCall) => {
    return {
        type: SET_ROOM,
        payload,
        seatNumber,
        maxPlayers,
        activeId,
        owner, 
        roomStatus,
        bigBlind,
        smallBlind,
        turn,
        actionMaxTime,
        communityCards,
        pot,
        minimumCall
    };
};

export const updatePlayers = (payload) => {
    return {
        type: UPDATE_PLAYERS,
        players: payload.players,
        roomStatus: payload.roomStatus,
        owner: payload.owner
    }
}

export const setAlert = (message, type) => {
    return {
        type: SET_ALERT,
        payload: {
            message, type
        }
    }
}