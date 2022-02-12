import { SET_USER } from './user.types';


const INITIAL_STATE = {
    user: null
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...action.payload,
            };
        default: return state;
    }

};

export default reducer