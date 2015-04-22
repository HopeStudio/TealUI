
//#include cookie.js
//#include ../utility/queryString.js
	
/**
 * ��ȡһ���� Cookie ֵ��
 * @param {String} name ���֡�
 * @param {String} name �����֡�
 * @returns {String} ֵ��
 */
Cookie.getSub = function (name, subname) {
    var cookie = Cookie.get(name);
    if (!cookie) {
        return null;
    }

    cookie = QueryString.parse(cookie);
    return subname === undefined ? cookie : subname in cookie ? cookie[subname] : null;
};

/**
 * ����һ���� Cookie ֵ��
 * @param {String} name ���֡�
 * @param {String} value ֵ��
 * @param {Object} expires ���ڵķ�������
 * @param {Object} path ·����
 * @param {Object} domain ������
 * @param {Object} secure ��ȫ���ơ�
 * @returns {String} ���� value��
 */
Cookie.setSub = function (name, subname, value, expires, path, domain, secure) {
    var all = Cookie.getSub(name);
    if (value === null) {
        if (!all) {
            return null;
        }
        delete all[subname];
        for (subname in all) {
            subname = null;
            break;
        }
        subname && Cookie.set(name, null);
    } else {
        all = all || {};
        all[subname] = value;
    }
    Cookie.set(name, QueryString.stringify(all), expires, path, domain, secure);
    return value;
};
