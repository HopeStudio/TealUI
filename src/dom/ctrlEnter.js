/**
 * @fileOverview CTRL �س��¼���
 * @author xuld
 */

/**
 * �� CTRL �س��¼���
 * @param {Function} callback ���ûس��Ļص���
 */
Element.prototype.ctrlEnter = function (callback) {
    var elem = this;
    elem.addEventListener('keypress', function (e) {
        if (e.ctrlKey && (e.which == 13 || e.which == 10)) {
            return callback.call(elem, e);
        }
    }, false);
};