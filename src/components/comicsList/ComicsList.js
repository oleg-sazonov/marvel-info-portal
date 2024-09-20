import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './comicsList.scss';

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

const ComicsList = () => {

	const [comicsList, setComicsList] = useState([]);
	const [newItemLoading, setNewItemLoading] = useState(false);
	const [offset, setOffset] = useState(0);
	const [comicsEnded, setComicsEnded] = useState(false);

	const {loading, error, process, setProcess, getAllComics, updateThumbnailFit} = useMarvelService();

	useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded)
			.then(() => setProcess('confirmed'));
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

			let delay = i * 0.05;

			while (delay >= 0.4) {
				delay -= 0.4;
			}

		// 	return (
		// 		<motion.li 
		// 			className="comics__item" 
		// 			key={i}
		// 			initial={{ opacity: 0, y: 100 }}
		// 			animate={{ opacity: 1, y: 0 }}
		// 			exit={{ opacity: 0, y: 100 }}
		// 			transition={{ duration: 0.2, delay: delay }}
		// 		>
		// 			<Link to={`/comics/${comics.id}`}>
		// 				<img 
		// 					src={comics.thumbnail} 
		// 					alt={comics.title}
		// 					className="comics__item-img"
		// 					style={updateThumbnailFit(thumbs[i], {objectFit: 'fill'})}
		// 				/>
		// 				<div className="comics__item-name">{comics.title}</div>
		// 				<div className="comics__item-price">{comics.price}</div>
		// 			</Link>
		// 		</motion.li>
		// 	)
		// });

		// return (
		// 	<motion.ul 
		// 		className="comics__list" 
		// 		initial={false} 
		// 		animate="animate" 
		// 		exit="exit">
		// 		{items}
		// 	</motion.ul>
		// )

		return (
			<li 
				className="comics__item" 
				key={i}
			>
				<Link to={`/comics/${comics.id}`}>
					<img 
						src={comics.thumbnail} 
						alt={comics.title}
						className="comics__item-img"
						style={updateThumbnailFit(thumbs[i], {objectFit: 'fill'})}
					/>
					<div className="comics__item-name">{comics.title}</div>
					<div className="comics__item-price">{comics.price}</div>
				</Link>
			</li>
		)
	});

	return (
		<ul 
			className="comics__list" 
		>
			{items}
		</ul>
	)
	}

	const thumbsList = comicsList.map(comics => comics.thumbnail);
	// const items = renderItems(comicsList, thumbsList);

	// const errorMessage = error ? <ErrorMessage/> : null;
	// const spinner = loading && !newItemLoading ? <Spinner/> : null;

	return (
		<div className="comics__wrapper">
			{/* {errorMessage}
			{spinner}
			{items} */}
			{setContent(process, () => renderItems(comicsList, thumbsList), newItemLoading)}
			<button 
				className="button button__main button__long"
				disabled={newItemLoading}
				style={{'display': comicsEnded ? 'none' : 'block'}}
				onClick={() => onRequest(offset)}>
				<div className="inner">load more</div>
			</button>
		</div>
	);
}

export default ComicsList;