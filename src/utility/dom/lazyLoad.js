/**
 * @author xuld
 */

// #require base

/**
 * ������ͼƬ��
 * @param {Function} [callback] ��������ǰָ���ڵ�ʱ�Ļص���
 * @param {Element} [scrollParent=document] �������ڵ�������
 */
Dom.prototype.lazyLoad = function (callback, scrollParent) {
    return this.scrollShow(function (e) {
        if (this._lazyLoaded) {
            return;
        }
        this._lazyLoaded = true;
        var proxy = new Image();
        proxy.src = callback && callback.call(this, e, proxy) || this.getAttribute('data-src');
        proxy.onload = (function (image) {
            return function () {
                image.src = proxy.src;
                Dom(image).show('opacity');
            }
        }(this));
    }, 'once', scrollParent);
};
