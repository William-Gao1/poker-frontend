import { SET_ROOM, UPDATE_PLAYERS } from './room.types';

export const setRoom = (payload, seatNumber, maxPlayers) => {
    return {
        type: SET_ROOM,
        payload,
        seatNumber,
        maxPlayers
    };
};

export const udpatePlayers = (payload) => {
    return {
        type: UPDATE_PLAYERS,
        payload
    }
}