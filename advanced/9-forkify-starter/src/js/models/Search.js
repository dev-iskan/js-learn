/* eslint no-unused-vars: 0 */

import axios from 'axios'
import { gmailKey, mailKey, proxy } from '../config'

export default class Search {
  constructor (query) {
    this.query = query
  }

  async getResults () {
    try {
      const response = await axios(`${proxy}https://www.food2fork.com/api/search?key=${mailKey}&q=${this.query}`)
      this.result = response.data.recipes
    } catch (err) {
      console.log(err)
    }
  }
}
