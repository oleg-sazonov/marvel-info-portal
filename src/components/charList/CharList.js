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
		const itemsWithIds = items.map((item) => {
			return {
				id: item.id,
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

	renderItems = (chars, thumbs) => {
		return (
			chars.map((char, i) => (
				<li 
					key={char.id} 
					onClick={() => this.props.onCharSelected(char.id)}
					className="char__item">
						<img src={char.thumbnail} 
						alt={char.name}
						style={this.marvelService.updateThumbnailFit(thumbs[i], {objectFit: 'fill'})}/>
						<div className="char__name">{char.name}</div>
				</li>
			))
		)
	}

	render() {
		const {list, loading, error} = this.state;
		const thumbsList = list.map(char => char.thumbnail);
		const spinnerStyle = {display: 'block'};

		const errorMessage = error ? <ErrorMessage/> : null;
		const spinner = loading ? <Spinner/> : null;
		const content = !(loading || error) ? this.renderItems(list, thumbsList) : null;
		
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

export default CharList;