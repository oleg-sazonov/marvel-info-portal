import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import './charInfo.scss';

const CharInfo = (props) => {

	const [char, setChar] = useState(null);
	const {process, setProcess, getCharacter, clearError} = useMarvelService();
	
	useEffect(() => {
		updateChar();
		// eslint-disable-next-line
	}, [props.charId]);
	
	const updateChar = () => {
		const {charId} = props;
		if (!charId) {
			return;
		}
		clearError();
		getCharacter(charId)
			.then(onCharLoaded)
			.then(() => setProcess('confirmed'));
	} 

	const onCharLoaded = (char) => {
		setChar(char);
	}

	return (
		<div className='char__info'>
			{setContent(process, View, char)}
		</div>
	)
}

const View = ({data}) => {
	const {name, description, thumbnail, homepage, wiki, comics} = data;
	const {updateThumbnailFit} = useMarvelService();
	const thumbnailFit = updateThumbnailFit(thumbnail, {objectFit: 'fill'});

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