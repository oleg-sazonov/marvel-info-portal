import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

import useMarvelService from '../../../services/MarvelService';
import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';

import './singleComicsPage.scss';

const SingleComicsPage = () => {

	const {comicsId} = useParams();
	const navigate = useNavigate();
	const [comics, setComics] = useState(null);

	const {loading, error, getComics, clearError} = useMarvelService();

	useEffect(() => {
        const isNumericId = /^\d+$/.test(comicsId);

        if (!isNumericId) {
            navigate('*'); 
            return;
        }

        updateComics();
    }, [comicsId]);

	const updateComics = () => {
		clearError();
		getComics(comicsId)
			.then(onComicsLoaded)
			.catch(() => navigate('*'));
	} 

    const onComicsLoaded = (comics) => {
        if (!comics) {
            navigate('*'); 
        } else {
            setComics(comics);
        }
    }

	const errorMessage = error ? <ErrorMessage/> : null;
	const spinner = loading ? <Spinner/> : null;
	const content = !(loading || error || !comics) ? <View comics={comics}/> : null;

	return (
		<>
			{errorMessage}
			{spinner}
			{content}
		</>
	)
}

const View = ({comics}) => {
	const {title, description, pageCount, thumbnail, language, price} = comics;
	const {updateThumbnailFit} = useMarvelService();
	const thumbnailFit = updateThumbnailFit(thumbnail, {objectFit: 'fill'});

	return (
		<div className="single-comics">
			<img src={thumbnail} 
				alt={title}
				style={thumbnailFit} 
				className="single-comics__img"/>
			<div className="single-comics__info">
				<h2 className="single-comics__name">{title}</h2>
				<p className="single-comics__descr">{description}</p>
				<p className="single-comics__descr">{pageCount}</p>
				<p className="single-comics__descr">Language: {language}</p>
				<div className="single-comics__price">{price}</div>
			</div>
			<Link to="/comics" className="single-comics__back">Back to all</Link>
		</div>
	)
}

export default SingleComicsPage;