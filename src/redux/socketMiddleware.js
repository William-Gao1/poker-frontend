import { io } from "socket.io-client";
import { getToken } from "../services/auth";
import { setAlert, setRoom, updatePlayers } from "./Room/room.actions";
import { CONNECT, JOIN_ROOM, LEAVE_ROOM, CREATE_ROOM, START_GAME, CHECK_OR_CALL, FOLD, BET } from "./Socket/socket.types";

const connectSocket = (socket, storeAPI) => {
    if (!socket?.connected) {
        socket = io(process.env.REACT_APP_BACKEND_URL, { auth: { token: getToken() } });

        socket.on("player update", (data) => {
            storeAPI.dispatch(updatePlayers(data))
        })

        socket.on("room update", (data) => {
            storeAPI.dispatch(setRoom(data.players, data.location, data.max_players, data.active_id, data.owner, data.roomStatus, data.bigBlind, data.smallBlind, data.turn, data.actionMaxTime, data.communityCards, data.pot, data.minimumCall))
        })

        socket.on("display alert", (data) => {
            storeAPI.dispatch(setAlert('', data.type))
            storeAPI.dispatch(setAlert(data.message, data.type))
        })
    }
    return socket;
}

const createSocketMiddleware = () => {
    let socket;

    return storeAPI => next => async action => {
        switch (action.type) {
            case CONNECT: {
                socket = connectSocket(socket, storeAPI)
                break;
            }
            case JOIN_ROOM: {
                socket = connectSocket(socket, storeAPI)
                await new Promise((resolve, reject) => socket.emit('join room', action.payload, (data) => {
                    if (data.status !== 200) {
                        reject(data);
                    } else {
                        resolve(next(setRoom(data.players, data.location, data.max_players, data.active_id, data.owner, data.roomStatus, data.bigBlind, data.smallBlind, data.turn, data.actionMaxTime, data.communityCards, data.pot, data.minimumCall)))
                    }
                }))
                break;
            }
            case LEAVE_ROOM: {
                socket = connectSocket(socket, storeAPI)
                socket.emit('leave room')
                return next(setRoom(null))
            }
            case CREATE_ROOM: {
                socket = connectSocket(socket, storeAPI)
                return await new Promise((resolve, reject) => socket.emit('create room', action.payload, (data) => {
                    if (data.status !== 201) {
                        reject(data);
                    } else {
                        resolve(next(setRoom(data.players, data.location, data.max_players, data.active_id, data.owner, data.roomStatus, data.bigBlind, data.smallBlind, data.turn, data.actionMaxTime, data.communityCards, data.pot, data.minimumCall)))
                    }
                }))
            }
            case START_GAME: {
                socket = connectSocket(socket, storeAPI)
                return await new Promise((resolve, reject) => socket.emit('start game', storeAPI.getState().room.activeId, (data) => {
                    if (data.status !== 200) {
                        reject(data);
                    } else {
                        resolve(next(setRoom(data.players, data.location, data.max_players, data.active_id, data.owner, data.roomStatus, data.bigBlind, data.smallBlind, data.turn, data.actionMaxTime, data.communityCards, data.pot, data.minimumCall)))
                    }
                }))
            }
            case CHECK_OR_CALL: {
                socket = connectSocket(socket, storeAPI)
                return await new Promise((resolve, reject) => socket.emit('check or call', storeAPI.getState().room.activeId, (data) => {
                    if (data.status !== 200) {
                        reject(data);
                    } else {
                        resolve(next(setRoom(data.players, data.location, data.max_players, data.active_id, data.owner, data.roomStatus, data.bigBlind, data.smallBlind, data.turn, data.actionMaxTime, data.communityCards, data.pot, data.minimumCall)))
                    }
                }))
            }
            case FOLD: {
                socket = connectSocket(socket, storeAPI)
                return await new Promise((resolve, reject) => socket.emit('fold', storeAPI.getState().room.activeId, (data) => {
                    if (data.status !== 200) {
                        reject(data);
                    } else {
                        resolve(next(setRoom(data.players, data.location, data.max_players, data.active_id, data.owner, data.roomStatus, data.bigBlind, data.smallBlind, data.turn, data.actionMaxTime, data.communityCards, data.pot, data.minimumCall)))
                    }
                }))
            }
            case BET: {
                return await new Promise((resolve, reject) => socket.emit('bet', {activeId: storeAPI.getState().room.activeId, amount: parseInt(action.payload)}, (data) => {
                    if (data.status !== 200) {
                        reject(data);
                    } else {
                        resolve(next(setRoom(data.players, data.location, data.max_players, data.active_id, data.owner, data.roomStatus, data.bigBlind, data.smallBlind, data.turn, data.actionMaxTime, data.communityCards, data.pot, data.minimumCall)))
                    }
                }))
            }
            default: {
                return next(action);
            }
        }


    }
}

export default createSocketMiddleware;