import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import News from "./News";
import Teams from "./Teams";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LoginContext, UsernameContext, NewsContext } from "./Context"
import { useState, useEffect } from "react";

function App() {
    const [loggedIn, changeLoggedIn] = useState(false);
    const [user, changeUserName] = useState("");
    const [newsObj, changeNewsObj] = useState({});
    const [setState] = useState({});

    // For console error
    useEffect(() => {
        return () => {
            setState({});
        }
    }, [])

    return (
        <Router>
            <Switch>
                <LoginContext.Provider value={{ loggedIn, changeLoggedIn }}>
                    <UsernameContext.Provider value={{ user, changeUserName }}>
                        <Route exact path="/" component={Login} />
                        <Route exact path="/Register" component={Register} />

                        <NewsContext.Provider value={{ newsObj, changeNewsObj }}>
                            <Route exact path="/Dashboard" component={Dashboard} />
                            <Route exact path="/News" component={News} />
                        </NewsContext.Provider>
                        <Route exact path="/Teams" component={Teams} />
                    </UsernameContext.Provider>
                </LoginContext.Provider>
            </Switch>
        </Router>
    );
}

export default App;