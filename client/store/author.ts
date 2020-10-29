import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { Author, Category } from '../types/entities'

export const state = () => ({
  authors: [] as Author[],
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  authors: state => state.authors,

}

export const mutations: MutationTree<RootState> = {
  SET_AUTHORS(state, list) {
    state.authors = list;
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async init({ commit }, { categories }): Promise<Author[]> {
    const authorFiles = await require.context('~/content/author/', false, /\.json$/);
    const authors = authorFiles.keys().map((key: string) => {
      let res = authorFiles(key);
      res.slug = key.slice(2, -5);
      res.categories = res.categoryIds.map((str: string) => categories.find((c: Category) => c.value === str))
      return res;
    });
    await commit('SET_AUTHORS', authors);

    return authors;
  },
}