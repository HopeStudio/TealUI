/**
 * @fileOverview �ı�����������Զ��Ŵ���С��
 * @author xuld
 */

/**
 * �ǰ�ı��������������Զ������߶ȡ�
 */
Element.prototype.autoResize = function () {
    var elem = this;
    elem.style.overflow = 'hidden';
    elem.addEventListener('keydown', autoResize, false);
    elem.addEventListener('keyup', autoResize, false);
    autoResize();

    function autoResize() {
        elem.style.height = 'auto';
        elem.style.height = elem.scrollHeight + 'px';
    }
};
