import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import userLogin from '../pages/login'
const Main = () => (
    <Router>
        <Switch>
            <Route path='/' exact component={userLogin} />
        </Switch>
    </Router>
)

export default Main;