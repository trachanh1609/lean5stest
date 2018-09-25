import { combineReducers } from "redux";
import auditReducer from "./auditReducer";
import corporationReducer from "./corporationReducer";
import factoryReducer from "./factoryReducer";
import selCorpReducer from "./selCorReducer";
import selFacReducer from "./selFacReducer";
import targetReducer from "./targetReducer";
import selTarReducer from "./selTarReducer";
import startedAuditReducer from "./startedAuditReducer";
import responseReducer from "./responseReducer";
import dateReducer from "./dateReducer";
import yearReducer from "./yearReducer";
import reportReducer from "./reportReducer";
import questionsReducer from "./questionsReducer";
import postsReducer from "./postsReducer";
import userReducer from "./userReducer";
import csvReportReducer from "./csvReportReducer";
import auditorReducer from "./auditorReducer";

export default combineReducers({ 
    
    corporations: corporationReducer,
    selectedCorporation: selCorpReducer,
    factories: factoryReducer,
    selectedFactory: selFacReducer,
    targets: targetReducer,
    selectedTarget: selTarReducer,
    audits: auditReducer,
    startedAudit: startedAuditReducer,
    responses: responseReducer,
    selectedDate: dateReducer,
    selectedYear: yearReducer,
    report: reportReducer,
    questions: questionsReducer,
    posts: postsReducer,
    user: userReducer,
    csvReport: csvReportReducer,
    selectedAuditor: auditorReducer

});
