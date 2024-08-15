import axios from "axios";

const API_KEY = "c2qPund1W4b93oNL05nxQIgdXawaBmZrMyCemCol9e8"
const BASE_URL = "https://api.unsplash.com"
axios.defaults.baseURL = BASE_URL
axios.defaults.headers.common['Authorization'] = `Client-ID ${API_KEY}`;

 
export const fetchPhotos = async (query, currentPage) => {
  const response = await axios.get('/search/photos', {
    params: {
      query: query,
      page: currentPage,
      per_page: 12
    }
  });
  return response.data;
};