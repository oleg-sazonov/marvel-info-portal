import { useEffect, useState } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './randomChar.scss';
import shield from '../../resources/img/shield.png'

const RandomChar = () => {

	const [char, setChar] = useState({});
	const {loading, error, getCharacter, clearError} = useMarvelService();

	useEffect(() => {
		updateChar();
		const timerId = setInterval(updateChar, 60000);

        return () => {
            clearInterval(timerId)
        }
	}, []);

	const onCharLoaded = (char) => {
		setChar(char);
	}

	const updateChar = () => {
		clearError();
		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
		getCharacter(id)
			.then(onCharLoaded);
	}

	const errorMessage = error ? <ErrorMessage/> : null;
	const spinner = loading ? <Spinner/> : null;
	const content = !(loading || error) ? <View char={char}/> : null;

	return (
		<div className="randomchar">
			{errorMessage}
			{spinner}
			{content}
			<div className="randomchar__static">
				<p className="randomchar__title">
					Random character for today!<br/>
					Do you want to get to know him better?
				</p>
				<p className="randomchar__title">
					Or choose another one
				</p>
				<button 
				className="button button__main"
				onClick={updateChar}>
					<div className="inner">TRY IT</div>
				</button>
				<img src={shield} alt="Shield"
					className="randomchar__decoration"/>
			</div>
		</div>
	)

}

const View = ({char}) => {
	const {name, description, thumbnail, homepage, wiki} = char;
	const {updateThumbnailFit} = useMarvelService();
	const thumbnailFit = updateThumbnailFit(thumbnail, {objectFit: 'fill'});
	
	return (
		<div className="randomchar__block">
			<img src={thumbnail} 
				alt="Random character"
				style={thumbnailFit}
				className="randomchar__img"/>
			<div className="randomchar__info">
			<p className="randomchar__name">{name}</p>
			<p className="randomchar__descr">{description}</p>
			<div className="randomchar__buttons">
				<a href={homepage} className="button button__main">
				<div className="inner">Homepage</div>
				</a>
				<a href={wiki} className="button button__secondary">
				<div className="inner">wiki</div>
				</a>
			</div>
			</div>
		</div>
	)
}

export default RandomChar;