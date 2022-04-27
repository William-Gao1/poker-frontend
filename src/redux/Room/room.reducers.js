import { SET_ROOM, UPDATE_PLAYERS } from './room.types';


const INITIAL_STATE = {};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_ROOM:
            return {
                players: action.payload,
                seatNumber: action.seatNumber,
                maxPlayers: action.maxPlayers
            };
        case UPDATE_PLAYERS: 
            return {
                ...state,
                players: action.payload
            }
        default: return state;
    }

};

export default reducer