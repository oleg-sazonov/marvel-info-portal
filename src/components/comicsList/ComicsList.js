import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './comicsList.scss';

const ComicsList = () => {

	const [comicsList, setComicsList] = useState([]);
	const [newItemLoading, setNewItemLoading] = useState(false);
	const [offset, setOffset] = useState(0);
	const [comicsEnded, setComicsEnded] = useState(false);

	const {loading, error, getAllComics, updateThumbnailFit} = useMarvelService();

	useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded)
    }

	const onComicsListLoaded = (newComicsList) => {
		let ended = false;
		if (newComicsList.length < 8) {
			ended = true;
		}

		setComicsList(comicsList => [...comicsList, ...newComicsList]);
		setNewItemLoading(false);
		setOffset(offset => offset + 8);
		setComicsEnded(ended);
	}

	function renderItems (comics, thumbs) {
		const items = comics.map((comics, i) => {

			let delay = i * 30;

			while (delay >= 240) {
				delay -= 240;
			}

			return (
				<CSSTransition 
					key={i} 
					timeout={500} 
					classNames="comics__item">
					<li 
						className="comics__item"
						style={{ transitionDelay: `${delay}ms` }}>
						<Link to={`/comics/${comics.id}`}>
							<img src={comics.thumbnail} 
								alt={comics.title}
								className="comics__item-img"
								style={updateThumbnailFit(thumbs[i], {objectFit: 'fill'})}/>
							<div className="comics__item-name">{comics.title}</div>
							<div className="comics__item-price">{comics.price}</div>
						</Link>
					</li>
				</CSSTransition>
			)
		});

		return (
			<TransitionGroup component="ul" className="comics__list">
				{items}
		 	</TransitionGroup>
		)
	}

	const thumbsList = comicsList.map(comics => comics.thumbnail);
	const items = renderItems(comicsList, thumbsList);

	const errorMessage = error ? <ErrorMessage/> : null;
	const spinner = loading && !newItemLoading ? <Spinner/> : null;

	return (
		<div className="comics__wrapper">
				{errorMessage}
				{spinner}
				{items}
			<button 
				className="button button__main button__long"
				disabled={newItemLoading}
				style={{'display': comicsEnded ? 'none' : 'block'}}
				onClick={() => onRequest(offset)}>
				<div className="inner">load more</div>
			</button>
		</div>
	)
}

export default ComicsList;