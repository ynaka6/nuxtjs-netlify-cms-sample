import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { Author, Blog, Category, Hashtag, Plan } from '../types/entities'

export const state = () => ({
  categories: [] as Category[],
  hashtags: [] as Hashtag[],
  authors: [] as Author[],
  blogPosts: [] as Blog[],
  planPosts: [] as Plan[],
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  categories: state => state.categories,
  hashtags: state => state.hashtags,
  authors: state => state.authors,
  blogPosts: state => state.blogPosts,
  planPosts: state => state.planPosts,
}

export const mutations: MutationTree<RootState> = {
  SET_CATEGORIES(state, list) {
    state.categories = list;
  },
  SET_HASHTAGS(state, list) {
    state.hashtags = list;
  },
  SET_AUTHORS(state, list) {
    state.authors = list;
  },
  SET_BLOG_POSTS(state, list) {
    state.blogPosts = list;
  },
  SET_PLAN_POSTS(state, list) {
    state.planPosts = list;
  },
}

export const actions: ActionTree<RootState, RootState> = {
    async nuxtServerInit({ commit }) {
      const categoryJson = await require('~/assets/content/category.json');
      const categories = categoryJson.categories;
      await commit('SET_CATEGORIES', categories);

      const hashtagJson = await require('~/assets/content/hashtag.json');
      const hashtags = hashtagJson.hashtags;
      await commit('SET_HASHTAGS', hashtags);

      let authorFiles = await require.context('~/assets/content/author/', false, /\.json$/);
      let authors = authorFiles.keys().map((key: string) => {
        let res = authorFiles(key);
        res.slug = key.slice(2, -5);
        res.categories = res.categories.map((str: string) => categories.find((c: Category) => c.value === str))
        return res;
      });
      await commit('SET_AUTHORS', authors);

      let blogFiles = await require.context('~/assets/content/blog/', false, /\.json$/);
      let blogPosts = blogFiles.keys().map((key: string) => {
        let res = blogFiles(key);
        res.slug = key.slice(2, -5);
        res.author = authors.find(a => a.username === res.author)
        return res;
      });
      await commit('SET_BLOG_POSTS', blogPosts);

      let planFiles = await require.context('~/assets/content/plan/', false, /\.json$/);
      let planPosts = planFiles.keys().map((key: string) => {
        let res = planFiles(key);
        res.slug = key.slice(2, -5);
        res.author = authors.find(a => a.username === res.author)
        res.hashtags = res.hashtags.map((str: string) => hashtags.find((h: Hashtag) => h.value === str))
        return res;
      });
      await commit('SET_PLAN_POSTS', planPosts);

    },
}