import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { Plan } from '../types/entities'

export const state = () => ({
    blogPosts: [] as string[],
    planPosts: [] as Plan[],
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
    blogPosts: state => state.blogPosts,
    planPosts: state => state.planPosts,
}

export const mutations: MutationTree<RootState> = {
  SET_BLOG_POSTS(state, list) {
    state.blogPosts = list;
  },
  SET_PLAN_POSTS(state, list) {
    state.planPosts = list;
  },
}

export const actions: ActionTree<RootState, RootState> = {
    async nuxtServerInit({ commit }) {
        let blogFiles = await require.context('~/assets/content/blog/', false, /\.json$/);
        let blogPosts = blogFiles.keys().map((key: string) => {
          let res = blogFiles(key);
          res.slug = key.slice(2, -5);
          return res;
        });
        await commit('SET_BLOG_POSTS', blogPosts);

        let planFiles = await require.context('~/assets/content/plan/', false, /\.json$/);
        let planPosts = planFiles.keys().map((key: string) => {
          let res = planFiles(key);
          res.slug = key.slice(2, -5);
          return res;
        });
        await commit('SET_PLAN_POSTS', planPosts);

    },
}