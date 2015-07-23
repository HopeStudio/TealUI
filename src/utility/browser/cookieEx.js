/**
 * @fileOverview ��ȡ���� Cookie ��֧�ֺʹ�ͳ ASP ���ݵ��� Cookie ���ܡ�
 * @author xuld
 */

// #require cookie
// #require ../text/queryString

// #region @getAllCookies

/**
 * ��ȡ���� Cookie ��
 * @returns {Object} ���ذ������� Cookie �ļ�ֵ�ԡ�
 * @example getAllCookies()
 */
function getAllCookies() {
    var cookies = {};
    document.cookie.replace(/(.+?)=(.+?)(;\s*|$)/g, function (_, cookieName, cookieValue) {
        cookies[decodeURIComponent(cookieName)] = decodeURIComponent(cookieValue);
    });
    return cookies;
}

// #endregion

// #region @subCookie

/**
 * ��ȡһ���� Cookie ֵ��
 * @param {String} name Ҫ��ȡ�� Cookie ���֡�
 * @param {String} name Ҫ��ȡ���� Cookie ���֡�
 * @returns {String} ���ض�Ӧ�� Cookie ֵ����� Cookie �������򷵻� null��
 * @example getSubcookie("sample", "subName") // ��� Cookie �����ڣ����� null ��
 */
function getSubcookie(name, subname) {
    var cookie = getCookie(name);
    if (!cookie) {
        return null;
    }

    cookie = QueryString.parse(cookie);
    return subname === undefined ? cookie : subname in cookie ? cookie[subname] : null;
}

// #region @setSubCookie

/**
 * ���û�ɾ��һ���� Cookie ֵ��
 * @param {String} name Ҫ���õ� Cookie ���֡�
 * @param {String} subname Ҫ���õ��� Cookie ���֡�
 * @param {String} value Ҫ���õ� Cookie ֵ�������Ϊ @null ��ɾ�� Cookie��
 * @param {Object} [expires=365*24*60*60*10] Cookie ���ڵ������������Ϊ 0 ���������ڡ�
 * @param {Object} [path] ���� Cookie ��·����
 * @param {Object} [domain] ���� Cookie ��������
 * @param {Object} [secure] ���� Cookie �İ�ȫ���ơ�
 * @returns {String} ���� value��
 * @example
 * #### ������ Cookie
 * setSubcookie("sample", "subName", "the value")
 * 
 * #### ɾ���� Cookie
 * setSubcookie("sample", "subName", null)
 */
function setSubcookie(name, subname, value, expires, path, domain, secure) {
    var cookie = getSubcookie(name);
    if (value !== null) {
        cookie = cookie || {};
        cookie[subname] = value;
    } else if (cookie) {
        delete cookie[subname];
        for (subname in cookie) {
            subname = null;
            break;
        }
        if (subname) {
            cookie = null;
        }
    }
    setCookie(name, cookie === null ? cookie : QueryString.stringify(cookie), expires, path, domain, secure);
    return value;
}

// #endregion

// #endregion
