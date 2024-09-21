import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';
import Banner from '../banner/Banner';

const SinglePage = ({Component, dataType}) => {

    //{id} is a property from <Route path="/comics/:id">...</Route> or <Route path="/characters/:id"></Route> from App.js
    const {id} = useParams();
    const [data, setData] = useState(null);
    const {process, setProcess, getComics, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateData()
        // eslint-disable-next-line
    }, [id])

    const updateData = () => {
        clearError();

        switch (dataType) {
            case 'comic':
                getComics(id)
                    .then(onDataLoaded)
                    .then(() => setProcess('confirmed'));
                break;
            case 'char':
                getCharacter(id)
                    .then(onDataLoaded)
                    .then(() => setProcess('confirmed'));
                break;
            default:
                throw new Error('Unexpected data-type');
        }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }

    return (
        <>
            <Banner/>
            {setContent(process, Component, data, {marginTop: '60px'})}
        </>
    )
}

export default SinglePage;