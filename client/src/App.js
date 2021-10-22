import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import News from "./News";
import Teams from "./Teams";
import Photos from "./Photos";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LoginContext, UsernameContext, NewsContext, TeamsContext, PhotoContext } from "./Context"
import { useState, useEffect } from "react";

function App() {
    const [loggedIn, changeLoggedIn] = useState(false);
    const [user, changeUserName] = useState("");
    const [newsObj, changeNewsObj] = useState({});
    const [photoObj, changePhotoObj] = useState({});
    const [selectedTeam, changeSelectedTeam] = useState("Select a team");
    const [state, setState] = useState({});


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
                            <TeamsContext.Provider value={{ selectedTeam, changeSelectedTeam }}>
                                <PhotoContext.Provider value={{ newsObj, changeNewsObj }}>
                                    <Route exact path="/Dashboard" component={Dashboard} />
                                    <Route exact path="/Photos" component={Photos} />
                                </PhotoContext.Provider>
                                <Route exact path="/Teams" component={Teams} />
                            </TeamsContext.Provider>
                                <Route exact path="/News" component={News} />
                        </NewsContext.Provider>
                    </UsernameContext.Provider>
                </LoginContext.Provider>
            </Switch>
        </Router>
    );
}

export default App;