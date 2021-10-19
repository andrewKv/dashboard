import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LoginContext, UsernameContext } from "./Context"
import { useState } from "react";

function App() {
    const [loggedIn, changeLoggedIn] = useState(false);
    const [user, changeUserName] = useState("");
    return (
        <Router>
            <Switch>
                <LoginContext.Provider value={{ loggedIn, changeLoggedIn }}>
                    <UsernameContext.Provider value={{ user, changeUserName }}>
                        <Route path="/" exact component={Login} />
                        <Route path="/Register" exact component={Register} />
                        <Route path="/Dashboard" exact component={Dashboard} />
                    </UsernameContext.Provider>
                </LoginContext.Provider>

            </Switch>
        </Router>
    );
}

export default App;