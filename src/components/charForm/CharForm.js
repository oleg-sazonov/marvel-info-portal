import {useState, useEffect} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import './charForm.scss';

const CharForm = () => {

	// const [isFixed, setIsFixed] = useState(false);

	// useEffect(() => {
	// 	window.addEventListener('scroll', handleScroll);

	// 	return () => {
	// 		window.removeEventListener('scroll', handleScroll);
	// 	}
	// }, [isFixed]);

	// const handleScroll = () => {
	// 	const scrollPosition = window.scrollY;
	// 	const shouldBeFixed = scrollPosition > 425; 
	// 	if (isFixed !== shouldBeFixed) {
	// 		setIsFixed(shouldBeFixed);
	// 	}
	// }

  return (
    <Formik
		initialValues={{ charName: '' }}
		validationSchema={Yup.object({
			charName: Yup.string()
			.min(2, 'Must be at least 2 characters')
			.required('Required'),
		})}
		onSubmit={(values, { setSubmitting }) => {
			console.log(values.charName);
			setSubmitting(false);
		}}
    >
	{({ isSubmitting }) => (
		// <Form className={`char__form ${isFixed ? 'char__form_fixed' : ''}`}>
		<Form className="char__form">
			<div className='char__form-text'>Or find a character by name:</div>
			{/* <label htmlFor="charName">Enter name</label> */}
			<Field 
				type="text" 
				name="charName" 
				className="char__form-input"
				id="charName"
				placeholder="Enter name" />
			<ErrorMessage name="searchTerm" component="div" />
			{/* <button 
				type="submit" 
				className="button button__main"
				disabled={isSubmitting}>
				Find
			</button> */}
			<a
				href="#"
				className="button button__main char__form-button"
				>
				<div className="inner">Find</div>
			</a>
		</Form>
	)}
    </Formik>
  );
};

export default CharForm;
