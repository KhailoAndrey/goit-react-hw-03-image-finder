const API_KEY = '33355093-a15ac59f0161a10cfc7b50674';
const API_LINK = 'https://pixabay.com/api/';

export function getImages(searchText, page) {
  return fetch(
    `${API_LINK}?q=${searchText}&key=${API_KEY}&page=${page}&per_page=12`
  ).then(res => res.json());
}
