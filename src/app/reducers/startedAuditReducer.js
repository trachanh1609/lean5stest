import {CREATE_AUDIT, CLEAR_AUDIT} from "../constants/action-types";
var initialState = {
    id:"",target_id:""
};

const startedAuditReducer = (state = initialState, action) => {
    switch(action.type) {
        case CREATE_AUDIT:
            return action.payload;
        case CLEAR_AUDIT:
            return state = initialState;
        default:
            return state;
    }
};

export default startedAuditReducer;