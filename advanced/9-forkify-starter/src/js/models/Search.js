import axios from 'axios';

export default class Search {
  constructor (query) {
    this.query = query
  }

  async getResults () {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const key = 'c11373dd28c2220a765696ee4cff60cf';
    try  {
      const response = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
      this.result = response.data.recipes
    } catch (error) {
      alert(error)
    }
  }
}