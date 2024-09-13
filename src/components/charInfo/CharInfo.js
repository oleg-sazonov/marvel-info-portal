import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/skeleton';

import './charInfo.scss';

const CharInfo = (props) => {

	const [char, setChar] = useState(null);
	const {loading, error, getCharacter, clearError} = useMarvelService();
	
	useEffect(() => {
		updateChar();
	}, [props.charId]);
	
	const updateChar = () => {
		const {charId} = props;
		if (!charId) {
			return;
		}
		clearError();
		getCharacter(charId)
			.then(onCharLoaded);
	} 

	const onCharLoaded = (char) => {
		setChar(char);
	}

	const skeleton = char || loading || error ? null : <Skeleton/>;
	const errorMessage = error ? <ErrorMessage/> : null;
	const spinner = loading ? <Spinner/> : null;
	const content = !(loading || error || !char) ? <View char={char}/> : null;

	return (
		<div className='char__info'>
			{skeleton}
			{errorMessage}
			{spinner}
			{content}
		</div>
	)
}

const View = ({char}) => {
	const {name, description, thumbnail, homepage, wiki, comics} = char;
	const {updateThumbnailFit} = useMarvelService();
	const thumbnailFit = updateThumbnailFit(thumbnail, {objectFit: 'fill'});

	console.log(char.id);

	const comicsVar = (comics.length < 1) ? 'Comics not found' : comics
		.filter((_, i) => i < 10)
		.map((item, i) => {
			const comicsId = item.resourceURI.split('/').pop(); 
			return (
				<li key={i + 1} className="char__comics-item">
					<Link to={`/comics/${comicsId}`}>
						{item.name}
					</Link>
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