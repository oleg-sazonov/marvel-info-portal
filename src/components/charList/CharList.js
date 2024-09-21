import { useEffect, useRef, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './charList.scss';

const setContent = (process, Component, newItemLoading) => {
	switch (process) {
		case 'waiting':
			return <Spinner/>;
		case 'loading':
			return newItemLoading ? <Component/> : <Spinner/>;
		case 'confirmed':
			return <Component/>;
		case 'error':
			return <ErrorMessage/>;
		default:
			throw new Error('Unexpected process state');
	}
};

const CharList = (props) => {

	const [charList, setCharList] = useState([]);
	const [newItemLoading, setNewItemLoading] = useState(false);
	const [offset, setOffset] = useState(210);
	const [charEnded, setCharEnded] = useState(false);
	
	const {process, setProcess, getAllCharacters, updateThumbnailFit} = useMarvelService();

	useEffect(() => {
		onRequest(offset, true);
		// eslint-disable-next-line
	}, []);

	const onRequest = (offset, initial) => {
		initial ? setNewItemLoading(false) : setNewItemLoading(true);
		getAllCharacters(offset)
			.then(onCharListLoaded)
			.then(() => setProcess('confirmed'));
	}

	const onCharListLoaded = (newCharList) => {
		let ended = false;
		if (newCharList.length < 9) {
			ended = true;
		}

		setCharList(charList => [...charList, ...newCharList]);
		setNewItemLoading(false);
		setOffset(offset => offset + 9);
		setCharEnded(ended);
	}
	
	const charRefs = useRef([]);

	const focusOnItem = (id) => {
		charRefs.current.forEach(item => item.classList.remove('char__item_selected'));
		charRefs.current[id].classList.add('char__item_selected');
		charRefs.current[id].focus();
	}

	function renderItems (chars, thumbs) {

		const handleSelection = (i, charId) => {
			props.onCharSelected(charId);
			focusOnItem(i);
		};

		const items = chars.map((char, i) => {
			return (
				<li 
					className={'char__item'}
					key={char.id}
					tabIndex="0"
					ref={el => charRefs.current[i] = el}
					onClick={() => handleSelection(i, char.id)}
					onKeyDown={e => {
						if (e.key === ' ' || e.key === 'Enter') {
							e.preventDefault();
							handleSelection(i, char.id);
						}
					}}>
					<img 
						src={char.thumbnail} 
						alt={char.name}
						style={updateThumbnailFit(thumbs[i], {objectFit: 'fill'})}
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

	const elements = useMemo(() => {
		return setContent(process, () => renderItems(charList, thumbsList), newItemLoading);
		// eslint-disable-next-line
	}, [process]);

	return (
		<div className="char__list">
				{elements}
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