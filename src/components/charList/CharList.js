import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

class CharList extends Component {
	state = {
		list: [],
		loading: true,
		error: false
	}

	marvelService = new MarvelService();

	componentDidMount() {
		this.updateList();
	}

	onListLoaded = (items) => {
		const itemsWithIds = items.map((item, index) => {
			return {
				id: index + 1,
				name: item.name,
				thumbnail: item.thumbnail
			}
		});

		this.setState({list: itemsWithIds, loading: false})
	}

	onError = () => {
		this.setState({loading: false, error: true})
	}

	updateList = () => {
		this.marvelService
			.getAllCharacters()
			.then(this.onListLoaded)
			.catch(this.onError);
	}

	render() {
		const {list, loading, error} = this.state;
		const thumbsList = list.map(char => char.thumbnail);
		const spinnerStyle = {display: 'block'};

		const errorMessage = error ? <ErrorMessage/> : null;
		const spinner = loading ? <Spinner/> : null;
		const content = !(loading || error) ? <CharItems list={list} 
			thumbsList={thumbsList}/> : null;
		
		return (
			<div className="char__list">
				<ul className="char__grid"
				style={loading ? spinnerStyle : null}>
					{errorMessage}
					{spinner}
					{content}
				</ul>
				<button 
					className="button button__main button__long">
					<div className="inner">load more</div>
				</button>
			</div>
		)
	}
}

const CharItems = ({list, thumbsList}) => {
	const marvelService = new MarvelService();
	return (
		list.map((char, i) => (
			<li key={char.id} className="char__item">
			  	<img src={char.thumbnail} 
				alt={char.name}
				style={marvelService.updateThumbnailFit(thumbsList[i], {objectFit: 'fill'})}/>
			  	<div className="char__name">{char.name}</div>
			</li>
		))
	)
}

export default CharList;
