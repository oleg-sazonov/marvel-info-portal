import { useState } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import Banner from "../banner/Banner";
import ComicsList from "../comicsList/ComicsList";
import UpButton from "../upButton/UpButton";

import decoration from "../../resources/img/bg-hero.png";


const App = () => {

    const [selectedChar, setSelectedChar] = useState(null);

    const onCharSelected = (id) => {
        setSelectedChar(id);     
    }

    return (
        <div className="app">
            <AppHeader />
            <Banner/>
            <ComicsList/>
            {/* <main>
                <ErrorBoundary>
                    <RandomChar />
                </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList onCharSelected={onCharSelected}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar}/>
                    </ErrorBoundary>
                </div>
                <img src={decoration} alt="bg-hero" className="bg-decoration"/>
            </main> */}
            <UpButton />
        </div>
    );
}

export default App;
