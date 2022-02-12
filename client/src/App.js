import PokemonCards from "./PokemonCards";
import Register from "./Register";
import Dashboard from "./Dashboard";
import News from "./News";
import Teams from "./Teams";
import Photos from "./Photos";
import TaskList from "./TaskList"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LoginContext, UsernameContext, NewsContext, TeamsContext } from "./Context"
import { useState } from "react";

function App() {
    const [loggedIn, changeLoggedIn] = useState(false);
    const [user, changeUserName] = useState("");
    const [newsObj, changeNewsObj] = useState({});
    const [selectedTeam, changeSelectedTeam] = useState({ name: "Select a team", message: "" });

    return (
        <Router>
            <Switch>
                <LoginContext.Provider value={{ loggedIn, changeLoggedIn }}>
                    <UsernameContext.Provider value={{ user, changeUserName }}>
                        {/* <Route exact path="/" component={Login} /> */}
                        <Route exact path="/" component={PokemonCards} />
                        <Route exact path="/Register" component={Register} />

                        <NewsContext.Provider value={{ newsObj, changeNewsObj }}>
                            <TeamsContext.Provider value={{ selectedTeam, changeSelectedTeam }}>
                                    <Route exact path="/Dashboard" component={Dashboard} />
                                    <Route exact path="/Photos" component={Photos} />
                                    <Route exact path="/Teams" component={Teams} />
                                    <Route exact path="/News" component={News} />
                                    <Route exact path="/Tasks" component={TaskList} />
                            </TeamsContext.Provider>
                        </NewsContext.Provider>
                    </UsernameContext.Provider>
                </LoginContext.Provider>
            </Switch>
        </Router>
    );
}

export default App;