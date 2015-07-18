/**
 * @fileOverview ��ȡ�������ⲿ HTML��
 * @author xuld
 */

// #require base

/**
 * ��ȡָ���ڵ�Ĺ��������С��
 * @return {Point} ���صĶ�����������������ԣ�x �� y��
 */
Dom.prototype.scrollSize = function () {
    var elem = this[0];
    return elem && (elem.nodeType === 9 ? {
        width: Math.max(elem.documentElement.scrollWidth, elem.body.scrollWidth, elem.clientWidth),
        height: Math.max(elem.documentElement.scrollHeight, elem.body.scrollHeight, elem.clientHeight)
    } : {
        width: elem.scrollWidth,
        height: elem.scrollHeight
    });
};
