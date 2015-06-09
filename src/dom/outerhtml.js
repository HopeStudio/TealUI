/**
 * @fileOverview ��ȡ�������ⲿ HTML��
 * @author xuld
 */

// #require base

if (!('outerHTML' in Element.prototype)) {

    /**
     * ��ȡ�ⲿ HTML��
     */
    Element.prototype.__defineGetter__('outerHTML', function() {
        var div = this.ownerDocument.createElement('div')
        div.appendChild(elem.cloneNode(true));
        return div.innerHTML;
    });

    /**
     * ��ȡ�ⲿ HTML��
     */
    Element.prototype.__defineSetter__('outerHTML', function (value) {
        this.before(value);
        Element.prototype.remove.call(this);
    });

}
