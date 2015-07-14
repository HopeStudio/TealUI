/**
 * @author xuld
 */

/**
 * ������ͼƬ��
 * @param {Function} [callback] ��������ǰָ���ڵ�ʱ�Ļص���
 * @param {Element} [scrollParent=document] �������ڵ�������
 */
Dom.prototype.lazyLoad = function (callback, scrollParent) {
    scrollParent = scrollParent || document;
    var images = this.slice(0),
        container = scrollParent.defaultView;

    container.addEventListener('scroll', scrollCallback, false)
    scrollCallback();

    function scrollCallback() {
        for (var i = images.length - 1, image; i >= 0; i--) {
            image = images[i];
            if (Dom(image).isScrollIntoView(scrollParent)) {
                var proxy = new Image();
                proxy.src = callback && callback(image, proxy) || image.getAttribute('data-src');
                proxy.onload = (function (image) {
                    return function () {
                        image.src = proxy.src;
                        Dom(image).show('opacity');
                    }
                }(image));
                image.removeAttribute('data-src');
                images.splice(i, 1);
            }
        }

        if (!images.length) {
            container.removeEventListener('scoll', scrollCallback, false);
        }

    }

};
