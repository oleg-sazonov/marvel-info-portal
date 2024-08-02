import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

const CharList = (props) => {

	const [charList, setCharList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [newItemLoading, setNewItemLoading] = useState(false);
	const [offset, setOffset] = useState(210);
	const [charEnded, setCharEnded] = useState(false);
	
	useEffect(() => {
		onRequest();
	}, []);

	const marvelService = new MarvelService();

	const onRequest = (offset) => {
		onCharListLoading();
		marvelService
			.getAllCharacters(offset)
			.then(onCharListLoaded)
			.catch(onError)
	}

	const onCharListLoading = () => {
		setNewItemLoading(true);
	}

	const onCharListLoaded = (newCharList) => {
		let ended = false;
		if (newCharList.length < 9) {
			ended = true;
		}

		setCharList(charList => [...charList, ...newCharList]);
		setLoading(false);
		setNewItemLoading(false);
		setOffset(offset => offset + 9);
		setCharEnded(ended);
	}

	const onError = () => {
		setLoading(false);
		setError(true);
	}

	const charRefs = useRef([]);

	const focusOnItem = (id) => {
		charRefs.current.forEach(item => item.classList.remove('char__item_selected'));
		charRefs.current[id].classList.add('char__item_selected');
		charRefs.current[id].focus();
	}

	function renderItems (chars, thumbs) {
		const items = chars.map((char, i) => {

			return (
				<li 
				className={'char__item'}
				tabIndex="0"
				ref={el => charRefs.current[i] = el}
				key={char.id} 
				onClick={() => {
					props.onCharSelected(char.id);
					focusOnItem(i);
				}}
				onKeyDown={e => {
					if (e.key === ' ' || e.key === 'Enter') {
					  e.preventDefault();
					  props.onCharSelected(char.id);
					  focusOnItem(i);
					}
				}}
				>
				<img 
					src={char.thumbnail} 
					alt={char.name}
					style={marvelService.updateThumbnailFit(thumbs[i], {objectFit: 'fill'})}
				/>
				<div className="char__name">{char.name}</div>
			</li>
			)
		});

		return (
			<ul className="char__grid">
				{items}
			</ul>
		)
	}

	const thumbsList = charList.map(char => char.thumbnail);
	const errorMessage = error ? <ErrorMessage/> : null;
	const spinner = loading ? <Spinner/> : null;
	const content = !(loading || error) ? renderItems(charList, thumbsList) : null;
	
	return (
		<div className="char__list">
				{errorMessage}
				{spinner}
				{content}
			<button 
				className="button button__main button__long"
				disabled={newItemLoading}
				style={{'display': charEnded ? 'none' : 'block'}}
				onClick={() => onRequest(offset)}>
				<div className="inner">load more</div>
			</button>
		</div>
	)
}

CharList.propTypes = {
	onCharSelected: PropTypes.func.isRequired
}

export default CharList;