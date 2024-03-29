import Search from './models/Search'
import Recipe from './models/Recipe'
import List from './models/List'
import { elements, renderLoader, clearLoader } from './views/base'
import * as searchView from './views/searchView'
import * as recipeView from './views/recipeView'
import * as listView from './views/listView'
import * as likesView from './views/likesView'
import Likes from './models/Likes'

/** Global state of the app
 * -- Search object
 * -- Current recipe object
 * -- Shopping list object
 * -- Liked recipes
 */
const state = {}

/** Search controller */
const controlSearch = async () => {
  // 1. Get query from view
  const query = searchView.getInput()

  if (query) {
    // 2. New search object and add to state
    state.search = new Search(query)

    // 3. Prepare UI
    searchView.clearInputs()
    searchView.clearResults()
    renderLoader(elements.searchResult)

    try {
      // 4. Search for recipes
      await state.search.getResults()

      // 5. Render results on UI
      clearLoader()
      searchView.renderResults(state.search.result)
    } catch (err) {
      clearLoader()
      console.log(err)
    }
  }
}

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault()
  controlSearch()
})

elements.searchResultPages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline') // chose dom element with class btn-inline

  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10)
    searchView.clearResults()
    searchView.renderResults(state.search.result, goToPage)
  }
})

/** Recipe controller */
const controlRecipe = async () => {
  // Get ID from URL
  const id = window.location.hash.replace('#', '')

  if (id) {
    // Prepare UI
    recipeView.clearRecipe()
    renderLoader(elements.recipe)

    // Highlight selected search item
    if (state.search) searchView.highlightSelected(id)

    // Create new recipe  obj
    state.recipe = new Recipe(id)
    try {
      // Get recipe data and parse ingredients
      await state.recipe.getRecipe()
      state.recipe.parseIngredients()
      // Calculate servings and time
      state.recipe.calcServings()
      state.recipe.calcTime()
      // Render recipe
      clearLoader()
      recipeView.renderRecipe(state.recipe, state.likes.isLiked(id))
    } catch (err) {
      clearLoader()
      console.log(err)
    }
  }
}

/** List controller */
const controlList = () => {
  // 1 Create a new list if none yet
  if (!state.list) state.list = new List()
  // 2 Add each ingredient to the list and  UI
  state.recipe.ingredients.forEach(el => {
    const item = state.list.addItem(el.count, el.unit, el.ingredient)
    listView.renderItem(item)
  })
}

/** Like controller */
const controlLikes = () => {
  if (!state.likes) state.likes = new Likes()
  const curId = state.recipe.id
  // If recipe is not liked yet
  if (!state.likes.isLiked(curId)) {
    // Add like to the state
    const newLike = state.likes.addLike(
      curId,
      state.recipe.title,
      state.recipe.author,
      state.recipe.img
    )
    // Toggle button class
    likesView.toggleLikeBtn(true)
    // Add like to UI list
    likesView.renderLike(newLike)

  // Recipe is liked already
  } else {
    // Remove like from state
    state.likes.deleteLike(curId)
    // Toggle button class
    likesView.toggleLikeBtn(false)
    // Remove from UI list
    likesView.deleteLike(curId)
  }
  likesView.toggleLikeMenu(state.likes.getNumLikes())
}

// window.addEventListener('hashchange', controlRecipe)
// window.addEventListener('load', controlRecipe)

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe))

// Restore likes recipes when page loads
window.addEventListener('load', () => {
  state.likes = new Likes()
  // Restore likes
  state.likes.readStorage()
  // Toggle like menu button
  likesView.toggleLikeMenu(state.likes.getNumLikes())

  // Render existing likes
  state.likes.likes.forEach(el => likesView.renderLike(el))
})

// Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
  if (e.target.matches('.btn-decrease, .btn-decrease *')) {
    // Decrease button is clicked
    if (state.recipe.servings > 1) {
      state.recipe.updateServings('dec')
      recipeView.updateServingsIngredients(state.recipe)
    }
  } else if (e.target.matches('.btn-increase, .btn-increase *')) {
    // Increase  is clicked
    state.recipe.updateServings('inc')
    recipeView.updateServingsIngredients(state.recipe)
  } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    // Add to list of shoppings
    controlList()
  } else if (e.target.matches('.recipe__love, .recipe__love *')) {
    // Call like controller
    controlLikes()
  }
})

// Handle delete and update list items events

elements.shopping.addEventListener('click', e => {
  const id = e.target.closest('.shopping__item').dataset.itemid

  // Handle delete item
  if (e.target.matches('.shopping__delete, .shopping__delete *')) {
    // Delete from state
    state.list.deleteItem(id)
    // Delete from UI
    listView.deleteItem(id)

    // Handle update count
  } else if (e.target.matches('.shopping__count-value')) {
    const val = parseFloat(e.target.value, 10)
    state.list.updateCount(id, val)
  }
})
