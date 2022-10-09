import axios from 'axios';

// axios.defaults.baseURL = "https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12";
const KEY_API = '25375728-e2c7b91f69f9e26292dffaef5';
const API_URL = 'https://pixabay.com/api/';

async function getImages(query, page) {
  const SEARCH_PARAMS = {
    key: KEY_API,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
    page,
    q: query,
  };
  const res = await axios.get(API_URL, {
    params: SEARCH_PARAMS,
  });
  return res.data;
}
export default getImages;
