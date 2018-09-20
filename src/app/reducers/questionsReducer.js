import {SET_QUESTIONS} from "../constants/action-types";

const questionsReducer = (state = [], action) => {
    switch(action.type) {
        case SET_QUESTIONS:
            if (action.payload == "") return state=[];
            else return action.payload;
        default:
            return state;
    }
};

export default questionsReducer;