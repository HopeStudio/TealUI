/**
 * @fileOverview �������ǿ�ƴ�ָ����ҳ��
 * @author xuld
 */

/**
 * ǿ�ƴ�ָ��ҳ�档
 * @param {String} url Ҫ�򿪵ĵ�ַ��
 */
function forceOpen(url) {
    if (!window.open(url)) {
        var oldOnClick = document.onclick;
        document.onclick = function () {
            document.onclick = oldOnClick;
            window.open(url);
            return oldOnClick && oldOnClick.apply(document, arguments);
        };
    }
}