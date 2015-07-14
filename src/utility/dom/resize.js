/**
 * @author xuld
 */

// #require base

/**
 * ���ô��ڸı��С��Ļص���
 * @param {Function} callback ��ϣֵ�ı���¼��ص���
 * @param {Number} [delay=50] ��ʱִ�е�ʱ�䡣
 */
Dom.prototype.resize = function (callback, delay) {
    return this.each(function (elem) {
        var timer;
        Dom(elem.defaultView || elem).on('resize', function (e) {
            timer && clearTimeout(timer);
            timer = setTimeout(function () {
                timer = 0;
                callback && callback.call(elem, elem, e);
            }, delay || 150);
        });
    });
    callback.call(elem, elem);
};
