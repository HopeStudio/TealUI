/** * @author xuld *//**
 * ���õ�ǰ�ڵ�ĵ��㡣
 * @param {Object} [options] ��������á� 
 * @returns this
 */Dom.prototype.popover = function (options) {    options = options || {};    var event = options.event,        target = Dom(options.target);    return this.each(function(elem) {    });    // ����¼���    if (event === "mouseover" || event === "hover") {        var openTimer,            closeTimer,            closeDelay = options.delay || 30,            openCallback = function(e) {                // ������ڹرգ��򲻹رձ��ִ�״̬��                if (closeTimer) {                    clearTimeout(closeTimer);                    closeTimer = 0;                } else {                    // ���򵹼�ʱ��ʼ�򿪡�                    openTimer = openTimer || setTimeout(function() {                        openTimer = 0;                        options.show && options.show(e);                    }, closeDelay);                }            },            closeCallback = function(e) {                // ������ڴ򿪣��򲻴򿪱��ֹر�״̬��                if (openTimer) {                    clearTimeout(openTimer);                    openTimer = 0;                } else {                    // ���򵹼�ʱ��ʼ�رա�                    closeTimer = closeTimer || setTimeout(function() {                        closeTimer = 0;                        options.hide && options.hide(e);                    }, closeDelay);                }            };        // �Ƶ�Ŀ��ڵ�����ʾ���㡣        target.on("mouseenter", openCallback);        // �Ƴ�Ŀ��ڵ��򵹼�ʱ���ء�        target.on("mouseleave", closeCallback);        if (event !== "hover") {            closeDelay *= 8;            // �Ƶ���ǰ�ڵ�������ʾ��            me.elem.on("mouseenter", openCallback);            // �Ƴ�Ŀ��ڵ��򵹼�ʱ���ء�            me.elem.on("mouseleave", closeCallback);        }    } else if (triggerEvent === "focus") {
        // ���û�ȡ�������ʾ���㣬ȫ�ֳ������Ŀ���ⵥ���رա�
        target.on(triggerEvent, function (e) {

            // ���ظ���ʾ��
            if (me.isHidden()) {

                // ����ȫ�ֵ��֮�����ظ��㡣
                document.on("mousedown", function (e) {

                    // �����������˵������¼���
                    // ������Ŀ�걾��
                    if (!me.elem.contains(e.target) && (!target || !target.contains(e.target))) {

                        // ȷ����ǰ�¼�ִֻ��һ�Ρ�
                        document.off("mousedown", arguments.callee);

                        // ���ظ��㡣
                        me.hide(e);

                    }

                }, this);

                // ��ʾ���㡣
                me.show(e);

            }
        });
    } else if (triggerEvent === "click") {
        // ���õ�����л����ء�
        target.on(triggerEvent, function (e) {

            if (me.isHidden()) {

                // ���������¼���
                document.on("mousedown", function (e) {

                    // �����������˵������¼���
                    if (!me.elem.contains(e.target)) {

                        // �����Ŀ��ڵ�������ֱ����Ŀ��ڵ���� hide()��
                        if (!target || !target.contains(e.target)) {
                            me.hide(e);
                            trace("hided");
                        }

                        // ȷ����ǰ�¼�ִֻ��һ�Ρ�
                        document.off("mousedown", arguments.callee);
                    }

                }, this);

                me.show(e);

            } else {
                me.hide(e);
            }
        });
    } else if (triggerEvent === "active") {
        target.on("focus", this.show, this);
        target.on("blur", this.hide, this);
    }};