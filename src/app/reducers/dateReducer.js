import {SET_DATE} from "../constants/action-types";

const dateReducer = (state = [], action) => {
    switch(action.type) {
        case SET_DATE:
            return state=action.payload;
        default:
            return state;
    }
};

export default dateReducer;