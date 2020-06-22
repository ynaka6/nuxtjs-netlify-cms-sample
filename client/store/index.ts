import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
    blogPosts: [] as string[]
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
    blogPosts: state => state.blogPosts,
}

export const mutations: MutationTree<RootState> = {
  SET_BLOG_POSTS(state, list) {
    state.blogPosts = list;
  },
}

export const actions: ActionTree<RootState, RootState> = {
    async nuxtServerInit({ commit }) {
        let files = await require.context('~/assets/content/blog/', false, /\.json$/);
        let blogPosts = files.keys().map((key: string) => {
          let res = files(key);
          res.slug = key.slice(2, -5);
          return res;
        });
        await commit('SET_BLOG_POSTS', blogPosts);
    },
}