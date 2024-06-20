import axios from 'axios';

export default {
  namespaced: true,
  state() {
    return {
      recipes: [],
      recipeDetail: {}
    }
  },
  getters: {},
  mutations: {
    setRecipeData(state, payload) {
      state.recipes = payload;
    },
    setRecipeDetail(state, payload) {
      state.recipeDetail = payload;
    },
    setNewRecipe(state, payload) {
      state.recipes.push.payload;
    }
  },
  actions: {
    async getRecipeData({commit}) {
      const databaseUrl = 'https://vue-js-49ba4-default-rtdb.firebaseio.com/';

      try {
        const { data } = await axios.get(`${databaseUrl}recipes.json`);
        const arr = [];
        for (let key in data) {
          arr.push({id: key, ...data[key]});
        }
        commit("setRecipeData", arr);
      } catch (err) {
        console.log(err);
      }
    },
    async getRecipeDetail({commit}, payload) {
      const databaseUrl = 'https://vue-js-49ba4-default-rtdb.firebaseio.com/';

      try {
        const { data } = await axios.get(`${databaseUrl}recipes/${payload}.json`);
          commit("setRecipeDetail" , data)
      } catch (err) {

      }
    },
    async addNewRecipe({ commit, rootState }, payload) {
      const newData = {
        ...payload,
        username: rootState.auth.userLogin.username,
        createdAt: Date.now(),
        likes: ["null"],
        userId: rootState.auth.userLogin.userId,
      };

      const databaseUrl = 'https://vue-js-49ba4-default-rtdb.firebaseio.com/';

      try {
        const { data } = await axios.post(`${databaseUrl}recipes.json?auth=${rootState.auth.token}`, newData);

        commit("setNewRecipe", { id: data.name, ...newData });
      } catch(err) {
        console.log(err);
      }
    },
    async deleteRecipe({ dispatch, rootState }, payload) {
      const databaseUrl = 'https://vue-js-49ba4-default-rtdb.firebaseio.com/';

      try {
        const { data } = await axios.delete(`${databaseUrl}recipes/${payload}.json?auth=${rootState.auth.token}`);
        await dispatch("getRecipeData");
      } catch(err) {
        console.log(err);
      }
    },
    async updateRecipe({ dispatch, rootState }, { id, newRecipe }) {
      const databaseUrl = 'https://vue-js-49ba4-default-rtdb.firebaseio.com/';

      const newData = {
        ...newRecipe,
        username: rootState.auth.userLogin.username,
        createdAt: Date.now(),
        likes: ["null"],
        userId: rootState.auth.userLogin.userId,
      };

      try {
        const { data } = await axios.put(`${databaseUrl}recipes/${id}.json?auth=${rootState.auth.token}`, newData);
        await dispatch("getRecipeData");
      } catch(err) {
        console.log(err);
      }
    }
  }
}
