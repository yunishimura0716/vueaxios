import Vue from "vue";
import Vuex from "vuex";
import axiosAuth from "../axios-auth";
import config from "../config";
import router from "../router";
import axiosRefresh from "../axios-refresh";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        idToken: null
    },
    getters: {
        idToken: state => state.idToken
    },
    mutations: {
        updateIdToken(state, idToken) {
            state.idToken = idToken;
        }
    },
    actions: {
        async autoLogin({ commit, dispatch }) {
            const idToken = localStorage.getItem('idToken');
            if (!idToken) return;
            const now = new Date();
            const expiryTimeMs = localStorage.getItem('expiryTimeMs');
            const isExpired = now.getTime() >= expiryTimeMs;
            const refreshToken = localStorage.getItem('refreshToken');
            if (isExpired) {
                await dispatch('refreshIdToken', refreshToken);
            } else {
                const expiresInMs = expiryTimeMs - now.getTime();
                setTimeout(() => {
                    dispatch('refreshIdToken', refreshToken);
                }, expiresInMs);
                commit('updateIdToken', idToken);
            }

        },
        login({ dispatch }, authData) {
            axiosAuth.post(`/accounts:signInWithPassword?key=${config.API_KEY}`, {
                email: authData.email, password: authData.password, returnSecureToken: true
            }).then(response => {
                dispatch('setAuthData', {
                    idToken: response.data.idToken,
                    expiresIn: response.data.expiresIn,
                    refreshToken: response.data.refreshToken
                });
                router.push("/");
            });
        },
        register({ dispatch }, authData) {
            axiosAuth.post(`/accounts:signUp?key=${config.API_KEY}`, {
                email: authData.email, password: authData.password, returnSecureToken: true
            }).then(response => {
                dispatch('setAuthData', {
                    idToken: response.data.idToken,
                    expiresIn: response.data.expiresIn,
                    refreshToken: response.data.refreshToken
                });
                router.push("/");
            });
        },
        async refreshIdToken({ dispatch }, refreshToken) {
            await axiosRefresh.post(`/token?key=${config.API_KEY}`, {
                grant_type: "refresh_token", refresh_token: refreshToken
            })
            .then(response => {
                dispatch('setAuthData', {
                    idToken: response.data.id_token,
                    expiresIn: response.data.expires_in,
                    refreshToken: response.data.refresh_token
                });
            });
        },
        setAuthData({ commit, dispatch }, authData) {
            commit('updateIdToken', authData.idToken);
            // local storage
            localStorage.setItem('idToken', authData.idToken);
            const now = new Date();
            const expiryTimeMs = now.getTime() + authData.expiresIn * 1000
            localStorage.setItem('expiryTimeMs', expiryTimeMs);
            localStorage.setItem('refreshToken', authData.refreshToken);

            // refresh token
            setTimeout(() => {
                dispatch('refreshIdToken', authData.refreshToken);
            }, authData.expiresIn * 1000);
        },
        logout({ commit }) {
            commit('updateIdToken', null);
            localStorage.removeItem('idToken');
            localStorage.removeItem('expiryTimeMs');
            localStorage.removeItem('refreshToken');
            router.replace('/login');
        }
    }

});