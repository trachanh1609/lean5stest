import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import thunk from 'redux-thunk';

import App from './components/App';
import Home from './components/home/Home';
import About from './components/about/About';
import Test from './components/test/Test';
import Start from './components/start/Start';
import StartLocal from './components/start/StartLocal';
import Dashboard from './components/dashboard/dashboard';

import Administration from './components/start/Administration';
import AdministrationLocal from './components/start/AdministrationLocal';
import OfficesLocal from './components/start/OfficesLocal';
import TargetsLocal from './components/start/TargetsLocal';
import QuestionsLocal from './components/start/QuestionsLocal';
import AuditLocal from './components/start/AuditLocal';
import ResultsLocal from './components/start/ResultsLocal';


import reducers from './reducers';

import './components/bundle.scss';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(
  reducers,
  {
    posts: [],
    user: 'Vinny',
  },
  window.devToolsExtension && window.devToolsExtension()
);

ReactDOM.render(
  <Provider store={store}>
    <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />;
        <Route path="/start" component={Start} />
        <Route path="/start_local" component={StartLocal} />
        <Route path="/about" component={About} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/test" component={Test} />
        <Route path="/administration" component={Administration} />
        <Route path="/administration_local" component={AdministrationLocal} />
        <Route path="/administration_local/offices" component={OfficesLocal} />
        <Route path="/administration_local/targets" component={TargetsLocal} />
        <Route path="/administration_local/questions" component={QuestionsLocal} />
        <Route path="/administration_local/audit_cases" component={AuditLocal} />
        <Route path="/results" component={ResultsLocal} />
        
      </Route>
    </Router>
  </Provider>
  , document.getElementById('react-root'));
