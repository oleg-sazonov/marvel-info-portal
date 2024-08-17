import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {MainPage, ComicsPage, Page404, SingleComicsPage} from "../pages";
import AppHeader from "../appHeader/AppHeader";
import UpButton from "../upButton/UpButton";

const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/comics" element={<ComicsPage/>}/>
                        <Route path="/comics/:comicsId" element={<SingleComicsPage/>}/>
                        <Route path="*" element={<Page404/>}/>
                    </Routes>
                </main>
                <UpButton />
            </div>
        </Router>
    );
}

export default App;
