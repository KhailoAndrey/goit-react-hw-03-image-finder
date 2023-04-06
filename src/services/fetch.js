const API_KEY = '335509-a15ac59f0161a10cfc7b50674';
const API_LINK = 'https://pixabay.com/api/';

export function getImages(searchText) {
  fetch(`${API_LINK}?q=${searchText}&key=${API_KEY}`)
    .then(res => res.json());
}
