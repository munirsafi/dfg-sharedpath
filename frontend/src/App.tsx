import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, useHistory
} from "react-router-dom";
import Login from './Login'
import NavBar from './NavBar'
import historyWrapper from './NavBar'
import NewPage from './NewPage'
import './App.scss';

function App() {
    var isLoggedIn: Boolean = false;
    var goLogIn: Boolean = false;
    
    return (
        <div className="App">
            {/* <NavBar isLoggedIn={false} history={useHistory()}/>
            <Login/> */}

            <NavBar isLoggedIn={true} history={useHistory()}/>
            <NewPage/>
            
           {/*} <Router>
                <Switch>
                    <Route path="/" component={NewPage}/>
                    <Route path="/login" component={Login}/>
                </Switch>
    </Router>*/}
        </div >
    );
}

export default App;
