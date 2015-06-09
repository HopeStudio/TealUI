/**
 * @author xuld
 */

// #require base

/**
 * ���ô��ڸı��С��Ļص���
 * @param {Function} callback ��ϣֵ�ı���¼��ص���
 * @param {Number} [delay=50] ��ʱִ�е�ʱ�䡣
 */
Document.prototype.resize = function (callback, delay) {
    var timer;
    Element.prototype.on.call(window, 'resize', function (e) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            timer = 0;
            callback(e);
        }, delay || 50);
    });
    callback();
};
