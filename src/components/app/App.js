import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from "../../resources/img/bg-hero.png";


function App() {
    return (
        <div className="app">
            <AppHeader />
            <main>
                <RandomChar />
                <div className="char__content">
                    <CharList />
                    <CharInfo />
                    <img src={decoration} alt="bg-hero" className="bg-decoration"/>
                </div>
            </main>
        </div>
    );
}

export default App;
