import ErrorMessage from "../../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";
import './404.scss'; 

const Page404 = () => {
	return (
		<div className="page404">
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