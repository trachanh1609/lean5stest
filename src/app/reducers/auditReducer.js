import {ADD_AUDIT_REPORT, CLEAR_AUDIT_REPORT} from "../constants/action-types";

const auditReducer = (state = [], action) => {
    switch(action.type) {
        case ADD_AUDIT_REPORT:
            return [...state, action.payload];
        case CLEAR_AUDIT_REPORT:
            return state = [];
        default:
            return state;
    }
};

export default auditReducer;