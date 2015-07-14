/**
 * @fileOverview CTRL �س��¼���
 * @author xuld
 */

/**
 * �� CTRL �س��¼���
 * @param {Function} callback ���ûس��Ļص���
 * @param {Object} [scope] ���ûص������� this ��ָ��
 */
Element.prototype.ctrlEnter = function (callback, scope) {
    var elem = this;
    elem.addEventListener('keypress', function (e) {
        if (e.ctrlKey && (e.which == 13 || e.which == 10)) {
            return callback.call(scope || elem, e);
        }
    }, false);
};
