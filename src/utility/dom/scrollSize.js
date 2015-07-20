/**
 * @fileOverview ��ȡ�������ⲿ HTML��
 * @author xuld
 */

// #require base

/**
 * ��ȡָ���ڵ�Ĺ��������С��
 * @returns {Size} ���صĶ�����������������ԣ�width �� height��
 */
Dom.prototype.scrollSize = function () {
    var elem = this[0];
    return elem && (elem.nodeType === 9 ? {
        width: Math.max(elem.documentElement.scrollWidth || 0, elem.body.scrollWidth || 0, elem.clientWidth || 0),
        height: Math.max(elem.documentElement.scrollHeight || 0, elem.body.scrollHeight || 0, elem.clientHeight || 0)
    } : {
        width: elem.scrollWidth,
        height: elem.scrollHeight
    });
};
