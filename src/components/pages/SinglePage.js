import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Banner from '../banner/Banner';

const SinglePage = ({Component, dataType}) => {

    //{id} is a property from <Route path="/comics/:id">...</Route> or <Route path="/characters/:id"></Route> from App.js
    const {id} = useParams();
    const [data, setData] = useState(null);
    const {loading, error, getComics, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateData()
    }, [id])

    const updateData = () => {
        clearError();

        switch (dataType) {
            case 'comic':
                getComics(id).then(onDataLoaded);
                break;
            case 'char':
                getCharacter(id).then(onDataLoaded);
                break;
        }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner style={{ marginTop: '60px' }}/> : null;
    const content = !(loading || error || !data) ? <Component data={data}/> : null;

    return (
        <>
            <Banner/>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

export default SinglePage;