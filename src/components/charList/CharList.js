import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

class CharList extends Component {
	
	state = {
		charList: [],
		loading: true,
		error: false,
		newItemLoading: false,
		offset: 210,
		charEnded: false
	}

	marvelService = new MarvelService();

	componentDidMount() {
		// this.onRequest();
	}

	//It helps with the problem of double mounting charList after onClick on className="button button__main button__long". Use it instead of componentDidMount()
	componentWillUnmount() {
		this.onRequest();
	}

	onRequest = (offset) => {
		this.onCharListLoading();
		this.marvelService
			.getAllCharacters(offset)
			.then(this.onCharListLoaded)
			.catch(this.onError)
	}

	onCharListLoading = () => {
		this.setState({
			newItemLoading: true
		})
	}

	onCharListLoaded = (newCharList) => {
		let ended = false;
		if (newCharList.length < 9) {
			ended = true;
		}

		this.setState(({offset, charList}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
			charEnded: ended
        }))
	}

	onError = () => {
		this.setState({loading: false, error: true})
	}

	renderItems = (chars, thumbs) => {
		const items = chars.map((char, i) => (
			<li 
				className="char__item"
				key={char.id} 
				onClick={() => this.props.onCharSelected(char.id)}
				>
				<img 
					src={char.thumbnail} 
					alt={char.name}
					style={this.marvelService.updateThumbnailFit(thumbs[i], {objectFit: 'fill'})}
				/>
				<div className="char__name">{char.name}</div>
			</li>
		));

		return (
			<ul className="char__grid">
				{items}
			</ul>
		)
	}

	render() {
		const {charList, loading, error, newItemLoading, offset, charEnded} = this.state;
		const thumbsList = charList.map(char => char.thumbnail);

		const errorMessage = error ? <ErrorMessage/> : null;
		const spinner = loading ? <Spinner/> : null;
		const content = !(loading || error) ? this.renderItems(charList, thumbsList) : null;
		
		return (
			<div className="char__list">
					{errorMessage}
					{spinner}
					{content}
				<button 
					className="button button__main button__long"
					disabled={newItemLoading}
					style={{'display': charEnded ? 'none' : 'block'}}
					onClick={() => this.onRequest(offset)}>
					<div className="inner">load more</div>
				</button>
			</div>
		)
	}
}

export default CharList;