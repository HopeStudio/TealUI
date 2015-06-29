/**
 * @fileOverview ��ȡ�������ⲿ HTML��
 * @author xuld
 */

/**
 * ��ȡ�ĵ��Ĺ���λ�á�
 * @return {Point} ���صĶ�����������������ԣ�left �� top��
 */
Document.prototype.getScrollSize = function() {
    var elem = this;
    return {
        width: Math.max(elem.documentElement.scrollWidth, elem.body.scrollWidth, elem.clientWidth),
        height: Math.max(elem.documentElement.scrollHeight, elem.body.scrollHeight, elem.clientHeight)
    };
};

/**
 * ��ȡָ���ڵ�Ĺ��������С��
 * @return {Point} ���صĶ�����������������ԣ�x �� y��
 * @remark
 * getScrollSize ��ȡ��ֵ���Ǵ��ڻ�Ĺ��� getSize ��ֵ��
 * �˷����Կɼ�������Ԫ�ؾ���Ч��
 */
Element.prototype.getScrollSize = function() {
    return {
        width: elem.scrollWidth,
        height: elem.scrollHeight
    };
};
