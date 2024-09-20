import Spinner from '../components/spinner/Spinner';
import ErrorMessage from '../components/errorMessage/ErrorMessage';
import Skeleton from '../components/skeleton/skeleton';

const setContent = (process, Component, data, style) => {
	switch (process) {
		case 'waiting':
			return <Skeleton/>;
		case 'loading':
			return <Spinner style={style}/>;
		case 'confirmed':
			return <Component data={data}/>;
		case 'error':
			return <ErrorMessage/>;
		default:
			throw new Error('Unexpected process state');
	}
};

export default setContent;