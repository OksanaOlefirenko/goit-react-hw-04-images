import axios from 'axios';

const API_KEY = '27665107-be973549318970a9f466382f1';
const BASE_URL = 'https://pixabay.com/api/';
const searchParams = new URLSearchParams({
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: '12',
});

const URL = `${BASE_URL}?key=${API_KEY}&${searchParams}`;

export const getImagesWithQuery = async (searchQuery, page) => {
  const response = await axios.get(URL + `&q=${searchQuery}&page=${page}`);
  return response.data;
};
