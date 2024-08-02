import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/skeleton';

import './charInfo.scss';

const CharInfo = (props) => {

	const [char, setChar] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [isFixed, setIsFixed] = useState(false);

	const marvelService = new MarvelService();
	
	useEffect(() => {
		updateChar();
	}, [props.charId]);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		}
	}, [isFixed]);
	
	const updateChar = () => {
		const {charId} = props;
		if (!charId) {
			return;
		}

		onCharLoading();
		marvelService
			.getCharacter(charId)
			.then(onCharLoaded)
			.catch(onError);
	} 

	const onCharLoaded = (char) => {
		setChar(char);
		setLoading(false);
	}

	const onCharLoading = () => {
		setLoading(true);
	}

	const onError = () => {
		setLoading(false);
		setError(true);
	}

	const handleScroll = () => {
		const scrollPosition = window.scrollY;
		const shouldBeFixed = scrollPosition > 425; 
		if (isFixed !== shouldBeFixed) {
			setIsFixed(shouldBeFixed);
		}
	}

	const skeleton = char || loading || error ? null : <Skeleton/>;
	const errorMessage = error ? <ErrorMessage/> : null;
	const spinner = loading ? <Spinner/> : null;
	const content = !(loading || error || !char) ? <View char={char}/> : null;

	return (
		<div className={`char__info ${isFixed ? 'char__info_fixed' : ''}`}>
			{skeleton}
			{errorMessage}
			{spinner}
			{content}
		</div>
	)

}

const View = ({char}) => {
	const {name, description, thumbnail, homepage, wiki, comics} = char;
	const marvelService = new MarvelService();
	const thumbnailFit = marvelService.updateThumbnailFit(thumbnail, {objectFit: 'fill'});

	const comicsVar = (comics.length < 1) ? 'Comics not found' : comics
		.filter((_, i) => i < 10)
		.map((item, i) => {
			return (
				<li key={i + 1} className="char__comics-item">
					{item.name}
				</li>
			) 			
	});
	
	return(
		<>
		<div className="char__basics">
			<img src={thumbnail} 
				alt={name}
				style={thumbnailFit}/>
			<div>
				<div className="char__info-name">{name}</div>
				<div className="char__buttons">
					<a href={homepage} className="button button__main">
						<div className="inner">HOMEPAGE</div>
					</a>
					<a href={wiki} className="button button__secondary">
						<div className="inner">WIKI</div>
					</a>
				</div>
			</div>
		</div>
		<div className="char__descr">
			{description}
		</div>
		<div className="char__comics">
			Comics:
		</div>
		<ul className="char__comics-list">
			{comicsVar}
		</ul>
	</>
	)
}

CharInfo.propTypes = {
	charId: PropTypes.number
}

export default CharInfo;