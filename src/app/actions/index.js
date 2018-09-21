import { 
    
    ADD_CORPORATION, 
    ADD_FACTORY, 
    ADD_TARGET,
    ADD_AUDIT_REPORT, 
    UPDATE_FACTORY, 
    UPDATE_CORPORATION, 
    UPDATE_TARGET, 
    CLEAR_FACTORIES, 
    CLEAR_TARGETS, 
    CLEAR_CORPORATIONS,
    CLEAR_AUDIT_REPORT,
    CREATE_AUDIT,
    ADD_RESPONSE,
    CLEAR_RESPONSES,
    SET_DATE,
    CLEAR_AUDIT,
    SET_YEAR,
    UPDATE_REPORT,
    CLEAR_REPORT,
    SET_QUESTIONS,
    SET_CSV_ARRAY
} from "../constants/action-types";

export const addAuditReport = audit => ({ 
    type: ADD_AUDIT_REPORT, 
    payload: audit 
});

export const addCorporation = corporation => ({
    type: ADD_CORPORATION,
    payload: corporation
});

export const addFactory = factory => ({
    type: ADD_FACTORY,
    payload: factory
});

export const addTarget = target => ({
    type: ADD_TARGET,
    payload: target
});

export const updateSelectedCorporation = corporation => ({
   
        type : UPDATE_CORPORATION,
        payload: corporation,
    
});

export function updateSelectedFactory(id){
    return {
        type : UPDATE_FACTORY,
        payload: id,
    }    
}

export function updateSelectedTarget(id){
    return {
        type : UPDATE_TARGET,
        payload: id,
    }    
}

export const clearFactories = () => ({
    type: CLEAR_FACTORIES,
    payload: ""
});

export function clearTargets() {
    return {
        type : CLEAR_TARGETS,
        payload: ""
    }
};

export function clearCorporations(payload) {
    return {
        type : CLEAR_CORPORATIONS,
        payload: ""
    }
};

export function clearAuditReport() {
    return {
        type : CLEAR_AUDIT_REPORT,
        payload: ""
    }
};

export function createAudit (payload) {
    return {
        type : CREATE_AUDIT,
        payload: payload
    }
};

export const addResponse = response => ({
    type: ADD_RESPONSE,
    payload: response
});

export const clearResponses = () => ({
    type: CLEAR_RESPONSES,
    payload: ""
});

export const updateSelectedDate = (payload) => ({
    type: SET_DATE,
    payload: payload
});

export const clearAudit = () => ({
    type: CLEAR_AUDIT,
    payload: ""
});

export const updateSelectedYear = (payload) => ({
    type: SET_YEAR,
    payload: payload
});

export const updateReport = (payload) => ({
    type: UPDATE_REPORT,
    payload: payload
});

export const clearReport = () => ({
    type: CLEAR_REPORT,
    payload: ""
});

export const setQuestions = (payload) => ({
    type: SET_QUESTIONS,
    payload: payload
});

export const setCSVArray = (payload) => ({
    type: SET_CSV_ARRAY,
    payload: payload
})