/**
 * @fileOverview �ı�����������Զ��Ŵ���С��
 * @author xuld
 */

/**
 * �ǰ�ı��������������Զ������߶ȡ�
 */
Dom.prototype.autoResize = function () {
    function autoResize() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    }
    this.each(function (elem) { autoResize.call(elem); });
    return this.css('overflow', 'hidden').on('keydown', autoResize).on('keyup', autoResize)
};
