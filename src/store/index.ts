import {store} from 'quasar/wrappers';
import Vuex from 'vuex';
import {CCategory, ICategory, IPost} from "src/interfaces/IEssentials";

// import example from './module-example';
// import { ExampleStateInterface } from './module-example/state';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export interface StateInterface {
  // Define your own store structure, using submodules if needed
  // example: ExampleStateInterface;
  // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
  posts: IPost[];
  categories: ICategory[]
}

export default store(function ({Vue}) {
  Vue.use(Vuex);

  return new Vuex.Store<StateInterface>({
    state: {
      posts: [],
      categories: [{_id: CCategory.New, name: CCategory.New}]
    },
    mutations: {
      setPost(state, post: IPost) {
        state.posts.push(post)
      },
      setCategory(state, category: ICategory) {
        state.categories.push(category)
      },
      removePost(state, post: IPost) {
        state.posts = state.posts.filter(m => {
          return m._id !== post._id
        })
      },
      editPost(state, post: IPost) {
        let index = state.posts.findIndex(m => m._id === post._id)
        if (index)
          state.posts[index] = post
      },

      removeCategory(state, category: ICategory) {
        state.categories = state.categories.filter(m => m._id !== category._id)
      },
      editCategory(state, category: ICategory) {
        let index = state.categories.findIndex(m => m._id === category._id)
        if (index)
          state.categories[index] = category
      }
    },
    actions: {},
    getters: {
      Posts: (state) => state.posts,
      Categories: (state) => state.categories,
    }
  });
});
