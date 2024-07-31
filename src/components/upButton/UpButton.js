import React, { useEffect, useState } from 'react';
import './upButton.scss';
import { ReactComponent as UpArrow } from './up-arrow.svg';

const UpButton = () => {
	const [visible, setVisible] = useState(false);

	const toggleVisibility = () => {
	if (window.scrollY > 900) {
		setVisible(true);
		} else {
			setVisible(false);
		}
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
			});
	};

	useEffect(() => {
		window.addEventListener('scroll', toggleVisibility);
		return () => {
			window.removeEventListener('scroll', toggleVisibility);
		};
		}, []);

	return (
		<div className="up-button" onClick={scrollToTop} 
			style={{ display: visible ? 'block' : 'none'}}>
			<UpArrow className="up-arrow-icon" />
		</div>
	);
};

export default UpButton;
