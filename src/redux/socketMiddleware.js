import { io } from "socket.io-client";
import { getToken } from "../services/auth";
import { setRoom, udpatePlayers } from "./Room/room.actions";
import { CONNECT, JOIN_ROOM, LEAVE_ROOM } from "./Socket/socket.types";

const connectSocket = (socket, storeAPI) => {
    if (!socket?.connected) {
        socket = io(process.env.REACT_APP_BACKEND_URL, { auth: { token: getToken() } });

        socket.on("player update", (data) => {
            storeAPI.dispatch(udpatePlayers(data))
        })
    }
    return socket;
}

const createSocketMiddleware = () => {
    let socket;

    return storeAPI => next => action => {
        switch (action.type) {
            case CONNECT: {
                socket = connectSocket(socket, storeAPI)
                break;
            }
            case JOIN_ROOM: {
                socket = connectSocket(socket, storeAPI)
                socket.emit('join room', action.payload, (data) => {
                    if (data.status !== 200) {
                        throw data;
                    } else {
                        return next(setRoom(data.players, data.location, data.max_players))
                    }
                })
                break;
            }
            case LEAVE_ROOM: {
                socket = connectSocket(socket, storeAPI)
                socket.emit('leave room')
                return next(setRoom(null))
            }
            default: {
                return next(action);
            }
        }


    }
}

export default createSocketMiddleware;