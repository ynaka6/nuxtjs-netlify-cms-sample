import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { Breadcrumb } from '../types/entities'

export const state = () => ({
  pageTitle: `The best Programming Supporter.` as string,
  pageDescription: `あなたのプログラミングの課題や問題を解決し成長というゴールに導くメンターを探しましょう` as string,
  pageImage: null as string | null,
  breadcrumbs: [] as Breadcrumb[],
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  pageTitle: state => state.pageTitle,
  pageDescription: state => state.pageDescription,
  pageImage: state => state.pageImage,
  breadcrumbs: state => state.breadcrumbs,
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
}

export const actions: ActionTree<RootState, RootState> = {
  setPageInfo({ commit }, { title, description, image, breadcrumbs }) {
    commit('SET_PAGE_TITLE', title);
    commit('SET_PAGE_DESCRIPTION', description);
    commit('SET_PAGE_IMAGE', image || null);
    commit('SET_BREADCRUMBS', breadcrumbs || []);
  },
  async nuxtServerInit({ dispatch }) {
    await dispatch('terms/init');
    await dispatch('privacy/init');
    const categories = await dispatch('category/init');
    const hashtags = await dispatch('hashtag/init');
    const authors = await dispatch('author/init', { categories });
    await dispatch('blog/init', { authors, hashtags });
    await dispatch('plan/init', { authors, hashtags });
  },
}