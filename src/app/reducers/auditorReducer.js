import {UPDATE_AUDITORS} from "../constants/action-types";
var init = {
    name: "Antti Auditoija"
}

const auditorReducer = (state = init, action) => {
    switch(action.type) {
        case UPDATE_AUDITORS:
            return state = action.payload;
       
        default:
            return state;
    }
};

export default auditorReducer;