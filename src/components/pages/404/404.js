import ErrorMessage from "../../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import './404.scss'; 

const Page404 = () => {
	return (
		<div className="page404">
			<Helmet>
				<meta 
					name="description" 
					content="Error page"/>
				<title>Page not found</title>
			</Helmet>
			<ErrorMessage />
			<p className="page404-text">Page doesn't exist</p>
			<Link to="/" className="page404-link">
				<button 
					className="button button__main button__long">
					<div className="inner">Back to main page</div>
				</button>
			</Link>
		</div>
	)
}

export default Page404;