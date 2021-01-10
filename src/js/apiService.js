import axios from 'axios';
import {} from './pnotify.js';

axios.defaults.baseURL = 'https://pixabay.com/api';

// const key = `68e049b84929c12580fde6b4b`;
const key = `19750008-68e049b84929c12580fde6b4b`;

export default {
  searchQuery: '',
  page: 1,
  async axiosPixabayApi() {
    try {
      const { data } = await axios.get(
        `/?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=${key}`,
      );
      this.incrementPage();
      return data.hits;
    } catch (error) {
      throw error;
    }
  },

  get query() {
    return this.searchQuery;
  },

  set query(value) {
    this.searchQuery = value;
  },

  incrementPage() {
    this.page += 1;
  },

  resetPage() {
    this.page = 1;
  },
};
