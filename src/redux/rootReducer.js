import { combineReducers } from 'redux';
import userReducer from './User/user.reducers'
import roomReducer from './Room/room.reducers'


const rootReducer = combineReducers({
    user: userReducer,
    room:  roomReducer
});

export default rootReducer;