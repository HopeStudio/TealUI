/**
 * @fileOverview �� C �������֧�ֱ��ش洢��
 * @author xuld
 */

// #require ../browser/cookie

var localStorage = localStorage || {

    getItem: function (name) {
        return getCookie(name);
    },

    setItem: function (name, value) {
        return setCookie(name, String(value));
    },

    removeItem: function (name) {
        setCookie(name, null);
    }

};
