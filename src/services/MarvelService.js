import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
	const {loading, request, error} = useHttp();
	const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
	const _apiKey = 'apikey=cbd9507e6ea639624589f6b2efbadb9b';
	const _imgNotFound = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
	const _baseCharacterOffset = 210;

	const getAllCharacters = async (offset = _baseCharacterOffset) => {
		const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
		return res.data.results.map(_transformCharacter);
	}

	const getCharacter = async (id) => {
		const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
		return _transformCharacter(res.data.results[0]);
	}

	const _transformCharacter = (char) => {
		return {
			id: char.id,
			name: char.name,
			description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
			thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
			comics: char.comics.items
		}
	}

	const updateThumbnailFit = (thumbnail, objectFit) => {
		if (thumbnail === _imgNotFound) {
			return objectFit;
		} 
	}

	return {loading, error, getAllCharacters, getCharacter, updateThumbnailFit}
}

export default useMarvelService;