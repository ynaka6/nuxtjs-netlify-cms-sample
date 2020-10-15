import { GetterTree, ActionTree, MutationTree } from 'vuex'
import Fuse from 'fuse.js'
import { Author, Blog, Breadcrumb, Category, Hashtag, Plan } from '../types/entities'

export const state = () => ({
  pageTitle: `The best Programming Supporter.` as string,
  pageDescription: `あなたのプログラミングの課題や問題を解決し成長というゴールに導くメンターを探しましょう` as string,
  pageImage: null as string | null,
  breadcrumbs: [] as Breadcrumb[],
  categories: [] as Category[],
  hashtags: [] as Hashtag[],
  authors: [] as Author[],
  blogPosts: [] as Blog[],
  planPosts: [] as Plan[],

  fusePlan: null as Fuse<Plan> | null
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  pageTitle: state => state.pageTitle,
  pageDescription: state => state.pageDescription,
  pageImage: state => state.pageImage,
  breadcrumbs: state => state.breadcrumbs,
  categories: state => state.categories,
  hashtags: state => state.hashtags,
  authors: state => state.authors,
  blogPosts: state => state.blogPosts,
  planPosts: state => state.planPosts,

  authorPlanPosts: state => (author: Author) => {
     return state.planPosts.filter((plan: Plan) => plan.author.slug === author.slug)
  }
}

export const mutations: MutationTree<RootState> = {
  SET_PAGE_TITLE(state, title) {
    state.pageTitle = title;
  },
  SET_PAGE_DESCRIPTION(state, description) {
    state.pageDescription = description;
  },
  SET_PAGE_IMAGE(state, image) {
    state.pageImage = image;
  },
  SET_BREADCRUMBS(state, list) {
    state.breadcrumbs = list;
  },
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
  }
}

export const actions: ActionTree<RootState, RootState> = {
  setPageInfo({ commit }, { title, description, image, breadcrumbs }) {
    commit('SET_PAGE_TITLE', title);
    commit('SET_PAGE_DESCRIPTION', description);
    commit('SET_PAGE_IMAGE', image || null);
    commit('SET_BREADCRUMBS', breadcrumbs || []);
  },
  search({ state }, q) {
    if (!q || q.length === 0) {
      return state.planPosts
    } 
    const fuse = new Fuse<Plan>(state.planPosts, {
      keys: ['title', 'description', 'body', 'author.title', 'author.username']
    })
    return fuse.search(q).map(r => r.item)
  },
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
      res.categories = res.categoryIds.map((str: string) => categories.find((c: Category) => c.value === str))
      return res;
    });
    await commit('SET_AUTHORS', authors);

    let blogFiles = await require.context('~/assets/content/blog/', false, /\.json$/);
    let blogPosts = blogFiles.keys().map((key: string) => {
      let res = blogFiles(key);
      res.slug = key.slice(2, -5);
      res.author = authors.find(a => a.username === res.authorId)
      return res;
    });
    await commit('SET_BLOG_POSTS', blogPosts);

    let planFiles = await require.context('~/assets/content/plan/', false, /\.json$/);
    let planPosts = planFiles.keys().map((key: string) => {
      let res = planFiles(key);
      res.slug = `${res.authorId}-${res.uuid}`
      res.author = authors.find((a: Author) => a.username === res.authorId)
      res.hashtags = res.hashtagIds.map((str: string) => hashtags.find((h: Hashtag) => h.value === str))
      return res;
    });
    await commit('SET_PLAN_POSTS', planPosts);
  },
}