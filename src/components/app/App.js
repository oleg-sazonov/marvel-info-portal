import { BrowserRouter as Router, Route, Switch } from "react-router-dom/cjs/react-router-dom";

import {MainPage, ComicsPage} from "../pages";
import AppHeader from "../appHeader/AppHeader";
import UpButton from "../upButton/UpButton";

const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Switch>
                        <Route exact path="/">
                            <MainPage/>
                        </Route>
                        <Route exact path="/comics">
                            <ComicsPage/>
                        </Route>
                    </Switch>
                </main>
                <UpButton />
            </div>
        </Router>
    );
}

export default App;
