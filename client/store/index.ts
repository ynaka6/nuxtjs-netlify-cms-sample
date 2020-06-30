import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { Author, Blog, Category, Hashtag, Plan, Product } from '../types/entities'

export const state = () => ({
  pageTitle: `The best Programming Supporter.` as string,
  pageDescription: `あなたのプログラミングの課題や問題を解決し成長というゴールに導くメンターを探しましょう` as string,
  categories: [] as Category[],
  hashtags: [] as Hashtag[],
  products: [] as Product[],
  authors: [] as Author[],
  blogPosts: [] as Blog[],
  planPosts: [] as Plan[],
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  pageTitle: state => state.pageTitle,
  pageDescription: state => state.pageDescription,
  categories: state => state.categories,
  hashtags: state => state.hashtags,
  products: state => state.products,
  authors: state => state.authors,
  blogPosts: state => state.blogPosts,
  planPosts: state => state.planPosts,
}

export const mutations: MutationTree<RootState> = {
  SET_PAGE_TITLE(state, title) {
    state.pageTitle = title;
  },
  SET_PAGE_DESCRIPTION(state, description) {
    state.pageDescription = description;
  },
  SET_CATEGORIES(state, list) {
    state.categories = list;
  },
  SET_HASHTAGS(state, list) {
    state.hashtags = list;
  },
  SET_PRODUCTS(state, list) {
    state.products = list;
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
  setPageInfo({ commit }, { title, description }) {
    commit('SET_PAGE_TITLE', title);
    commit('SET_PAGE_DESCRIPTION', description);
  },
  async nuxtServerInit({ commit }) {
    const categoryJson = await require('~/assets/content/category.json');
    const categories = categoryJson.categories;
    await commit('SET_CATEGORIES', categories);

    const hashtagJson = await require('~/assets/content/hashtag.json');
    const hashtags = hashtagJson.hashtags;
    await commit('SET_HASHTAGS', hashtags);

    const productJson = await require('~/assets/content/product.json');
    const products = productJson.products;
    await commit('SET_PRODUCTS', products);

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
      res.slug = `${res.author}-${res.uuid}`
      res.product = products.find((p: Product) => p.value === res.product)
      res.author = authors.find((a: Author) => a.username === res.author)
      res.hashtags = res.hashtags.map((str: string) => hashtags.find((h: Hashtag) => h.value === str))
      return res;
    });
    await commit('SET_PLAN_POSTS', planPosts);

  },
}