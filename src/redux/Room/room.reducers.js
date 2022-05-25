import { SET_ALERT, SET_ROOM, UPDATE_PLAYERS } from './room.types';


const INITIAL_STATE = {};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_ROOM:
            return {
                players: action.payload,
                seatNumber: action.seatNumber || state.seatNumber,
                maxPlayers: action.maxPlayers,
                activeId: action.activeId,
                owner: action.owner,
                roomStatus: action.roomStatus,
                bigBlind: action.bigBlind, 
                smallBind: action.smallBlind,
                turn: action.turn,
                actionMaxTime: action.actionMaxTime,
                communityCards: action.communityCards,
                pot: action.pot,
                minimumCall: action.minimumCall
            };
        case UPDATE_PLAYERS: 
            return {
                ...state,
                players: action.players,
                roomStatus: action.roomStatus || state.roomStatus,
                owner: action.owner || state.owner
            }
        case SET_ALERT:
            return {
                ...state,
                message: action.payload
            }
        default: return state;
    }

};

export default reducer