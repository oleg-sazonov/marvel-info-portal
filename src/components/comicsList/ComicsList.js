import './comicsList.scss';
import comicsImage from '../../resources/img/UW-comics.jpg';

const ComicsList = () => {


	return (
		<div className="comics__wrapper">
			<ul className="comics__list">
				<li className="comics__item">
					<a href='#'>
						<img src={comicsImage} alt="comics-image" className="comics__item-img"/>
						<div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
						<div className="comics__item-price">9.99$</div>
					</a>
				</li>
				<li className="comics__item">
					<a href='#'>
						<img src={comicsImage} alt="comics-image" className="comics__item-img"/>
						<div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
						<div className="comics__item-price">9.99$</div>
					</a>
				</li>
				<li className="comics__item">
					<a href='#'>
						<img src={comicsImage} alt="comics-image" className="comics__item-img"/>
						<div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
						<div className="comics__item-price">9.99$</div>
					</a>
				</li>
				<li className="comics__item">
					<a href='#'>
						<img src={comicsImage} alt="comics-image" className="comics__item-img"/>
						<div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
						<div className="comics__item-price">9.99$</div>
					</a>
				</li>
				<li className="comics__item">
					<a href='#'>
						<img src={comicsImage} alt="comics-image" className="comics__item-img"/>
						<div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
						<div className="comics__item-price">9.99$</div>
					</a>
				</li>
				<li className="comics__item">
					<a href='#'>
						<img src={comicsImage} alt="comics-image" className="comics__item-img"/>
						<div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
						<div className="comics__item-price">9.99$</div>
					</a>
				</li>
				<li className="comics__item">
					<a href='#'>
						<img src={comicsImage} alt="comics-image" className="comics__item-img"/>
						<div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
						<div className="comics__item-price">9.99$</div>
					</a>
				</li>
				<li className="comics__item">
					<a href='#'>
						<img src={comicsImage} alt="comics-image" className="comics__item-img"/>
						<div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
						<div className="comics__item-price">9.99$</div>
					</a>
				</li>
			</ul>
			<button 
				className="button button__main button__long">
				<div className="inner">load more</div>
			</button>
		</div>
	)
}

export default ComicsList;