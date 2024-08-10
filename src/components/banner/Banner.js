import './banner.scss';
import avengers from '../../resources/img/Avengers.png';
import avengersLogo from '../../resources/img/Avengers-logo.png';

const Banner = () => {
	return (
		<div className="banner">
			<div className="banner__wrapper">
				<img className="banner__wrapper-img" src={avengers} alt="avengers"/>
				<h2 className="banner__wrapper-header">New comics every week!<br/> Stay tuned!
				</h2>
			</div>
			<img className="banner__logo" src={avengersLogo} alt="avengers-logo"/>
		</div>
	)
}

export default Banner;