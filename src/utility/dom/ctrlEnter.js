/**
 * @fileOverview CTRL �س��¼���
 * @author xuld
 */

/**
 * �� CTRL �س��¼���
 * @param {Function} callback ���ûس��Ļص���
 * @param {Object} [scope] ���ûص������� this ��ָ��
 */
Dom.prototype.ctrlEnter = function (callback) {
    return this.on('keypress', function (e) {
        if (e.ctrlKey && (e.which == 13 || e.which == 10)) {
            return callback.call(this, e);
        }
    });
};
