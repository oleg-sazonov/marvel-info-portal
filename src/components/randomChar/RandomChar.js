import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './randomChar.scss';
import shield from '../../resources/img/shield.png'

class RandomChar extends Component {
	state = {
		char: {},
		loading: true,
		error: false
	}

	marvelService = new MarvelService();

	componentDidMount() {
		this.updateChar();
	}

	onCharLoaded = (char) => {
		this.setState({char, loading: false})
	}

	onError = () => {
		this.setState({loading: false, error: true})
	}

	updateChar = () => {
		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
		this.setState({loading: true});
		this.marvelService
			.getCharacter(id)
			.then(this.onCharLoaded)
			.catch(this.onError);
	}

	render() {
		const {char, loading, error} = this.state;
		const errorMessage = error ? <ErrorMessage/> : null;
		const spinner = loading ? <Spinner/> : null;
		const content = !(loading || error) ? <View char={char}/> : null;

		return (
			<div className="randomchar">
				{errorMessage}
				{spinner}
				{content}
				<div className="randomchar__static">
					<p className="randomchar__title">
						Random character for today!<br/>
						Do you want to get to know him better?
					</p>
					<p className="randomchar__title">
						Or choose another one
					</p>
					<a href="#" 
					className="button button__main"
					onClick={this.updateChar}>
						<div className="inner">TRY IT</div>
					</a>
					<img src={shield} alt="Shield"
						className="randomchar__decoration"/>
				</div>
			</div>
		)
	}
}

const View = ({char}) => {
	const {name, description, thumbnail, homepage, wiki} = char;
	const marvelService = new MarvelService();
	const thumbnailFit = marvelService.updateThumbnailFit(thumbnail, {objectFit: 'fill'});
	
	return (
		<div className="randomchar__block">
			<img src={thumbnail} 
				alt="Random character"
				style={thumbnailFit}
				className="randomchar__img"/>
			<div className="randomchar__info">
			<p className="randomchar__name">{name}</p>
			<p className="randomchar__descr">{description}</p>
			<div className="randomchar__buttons">
				<a href={homepage} className="button button__main">
				<div className="inner">Homepage</div>
				</a>
				<a href={wiki} className="button button__secondary">
				<div className="inner">wiki</div>
				</a>
			</div>
			</div>
		</div>
	)
   }

export default RandomChar;