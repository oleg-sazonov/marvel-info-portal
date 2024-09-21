import { useState } from "react";
import { Helmet } from "react-helmet";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import CharSearchForm from "../charSearchForm/CharSearchForm";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from "../../resources/img/bg-hero.png";

const MainPage = () => {

	const [selectedChar, setSelectedChar] = useState(null);

    const onCharSelected = (id) => {
        setSelectedChar(id);     
    }

	return (
		<>
			<Helmet>
				<meta 
					name="description" 
					content="Marvel information portal"/>
				<title>Marvel information portal</title>
			</Helmet>
			<ErrorBoundary>
				<RandomChar />
			</ErrorBoundary>
			<div className="char__content">
				<ErrorBoundary>
					<CharList onCharSelected={onCharSelected}/>
				</ErrorBoundary>
				<div className="sticky__info">
					<ErrorBoundary>
						<CharInfo charId={selectedChar}/>
					</ErrorBoundary>
					<ErrorBoundary>
						<CharSearchForm />
					</ErrorBoundary>
				</div>
			</div>
			<img src={decoration} alt="bg-hero" className="bg-decoration"/>
		</>
	)
}

export default MainPage;