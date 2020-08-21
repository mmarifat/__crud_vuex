import {store} from 'quasar/wrappers';
import Vuex from 'vuex';
import {CCategory, ICategory, IPost} from "src/interfaces/IEssentials";
import uniqid from "uniqid";

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
				post._id = uniqid()
				state.posts.push(post)
			},
			removePost(state, post: IPost) {
				state.posts.splice(state.posts.indexOf(post), 1)
			},
			editPost(state, post: IPost) {
				state.posts[state.posts.indexOf(post)] = post
			},


			setCategory(state, category: ICategory) {
				category._id = uniqid()
				state.categories.push(category)
			},
			removeCategory(state, category: ICategory) {
				state.categories.splice(state.categories.indexOf(category), 1)
			},
			editCategory(state, category: ICategory) {
				state.categories[state.categories.indexOf(category)] = category
			}
		},
		actions: {
			setPost(state, post: IPost) {
				state.commit('setPost', post)
			},
			removePost(state, post: IPost) {
				state.commit('removePost', post)
			},
			editPost(state, post: IPost) {
				state.commit('editPost', post)
			},

			setCategory(state, category: ICategory) {
				state.commit('setCategory', category)
			},
			removeCategory(state, category: ICategory) {
				state.commit('removeCategory', category)
			},
			editCategory(state, category: ICategory) {
				state.commit('editCategory', category)
			}
		},
		getters: {
			Posts: (state) => state.posts,
			Categories: (state) => state.categories
		}
	});
});
