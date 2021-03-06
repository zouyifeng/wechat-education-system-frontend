import * as util from '../../util'

import * as types from './mutation-types'

export default {
    changeLoginStatus({ commit }) {
        commit(types.CHANGE_LOGIN_STATUS);
    },

    fetchAccount({ commit }, account) {
        const url = '/admin/login.action';
        util.post({ url }, account).then((resp) => {
            commit(types.FETCH_ACCOUNT, resp.body.data);
        });
    },
    getNews({ commit }, data) {
        const url = '/news_list.action';
        util.post({ url }, data).then((resp) => {
            switch(data.type) {
                case 1 : 
                    commit(types.FETCH_CLASS_NEWS_LIST, resp.body.data);
                    break;
                case 2 :
                    commit(types.FETCH_EXCHANGE_NEWS_LIST, resp.body.data);                
                    break;
                case 3 : 
                    commit(types.FETCH_STUDY_NEWS_LIST, resp.body.data);                
                    break;
                case 4 :
                    commit(types.FETCH_INFORM_NEWS_LIST, resp.body.data);                
                    break;
            }
        })
    },
    getNewsDetail({ commit }, id) {
        const url = '/news.action';
        return util.post({ url }, id);
    },
    getNewsByPage({ commit }, data) {
        const url = '/news_page.action';
        util.post({ url }, data).then((resp) => {
            commit(types.FETCH_NEWS_BY_PAGE, resp.body.data);
        });
    }
};