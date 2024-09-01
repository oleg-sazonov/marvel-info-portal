import { useState } from "react";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import CharForm from '../charForm/CharForm';
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from "../../resources/img/bg-hero.png";

const MainPage = () => {

	const [selectedChar, setSelectedChar] = useState(null);

    const onCharSelected = (id) => {
        setSelectedChar(id);     
    }

	return (
		<>
			<ErrorBoundary>
				<RandomChar />
			</ErrorBoundary>
			<div className="char__content">
				<ErrorBoundary>
					<CharList onCharSelected={onCharSelected}/>
				</ErrorBoundary>
				<div>
					<ErrorBoundary>
						<CharInfo charId={selectedChar}/>
					</ErrorBoundary>
					<ErrorBoundary>
						<CharForm />
					</ErrorBoundary>
				</div>
			</div>
			<img src={decoration} alt="bg-hero" className="bg-decoration"/>
		</>
	)
}

export default MainPage;