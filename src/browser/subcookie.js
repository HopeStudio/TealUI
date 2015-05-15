
//#require cookie.js
//#require ../text/queryString.js
	
/**
 * ��ȡһ���� Cookie ֵ��
 * @param {String} name ���֡�
 * @param {String} name �����֡�
 * @returns {String} ֵ��
 */
function getSubCookie(name, subname) {
    var cookie = getCookie(name);
    if (!cookie) {
        return null;
    }

    cookie = QueryString.parse(cookie);
    return subname === undefined ? cookie : subname in cookie ? cookie[subname] : null;
}

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
function setSubCookie(name, subname, value, expires, path, domain, secure) {
    var all = getSubCookie(name);
    if (value === null) {
        if (!all) {
            return null;
        }
        delete all[subname];
        for (subname in all) {
            subname = null;
            break;
        }
        subname && setCookie(name, null);
    } else {
        all = all || {};
        all[subname] = value;
    }
    setCookie(name, QueryString.stringify(all), expires, path, domain, secure);
    return value;
}
