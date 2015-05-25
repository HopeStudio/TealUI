/** * @author xuld */// #require dom/drag.jsvar Slider = Input.extend({

    /**
     * �涨�������Сֵ��
     */
    min: 0,

    /**
     * �涨��������ֵ��
     */
    max: 100,
    /**
     * �涨�Ϸ����ּ������� step="3"����Ϸ������� -3,0,3,6���Դ����ƣ���
     */    step: 0,    init: function (options) {
        Dom.each(Dom.query('.x-slider-handle', this.elem), this.initHandle, this);
        this.onChange();
    },    initHandle: function (handle) {
        var me = this;
        Dom.draggable(handle, {
            autoSrcoll: 0,
            onDragStart: function () {

                // �϶���ʼǰȷ����ǰ����Ŀ��÷�Χ��ÿ������ķ�Χ��ǰ�󻬿�֮�䡣
                function getPrevOrNext(handle, defaultValue) {
                    return handle && handle.matches('.x-slider-handle') ? parseFloat(handle.style.left) : defaultValue;
                }

                this.min = getPrevOrNext(handle.previousElementSibling, 0),
                this.max = getPrevOrNext(handle.nextElementSibling, 100);
                this.part = me.step && me.elem.offsetWidth * me.step / (me.max - me.min);
            },
            onDragMove: function (e) {

                var left = this.endOffset.left;

                // ʵʱ������
                if (this.part) {
                    left = this.part * Math.floor((left + this.part / 2) / this.part);
                }

                // ����ٷֱȡ�
                left = left * 100 / me.elem.offsetWidth;

                // ȷ�������ں����϶���Χ�ڡ�
                this.value = left = Math.max(this.min, Math.min(this.max, left));

                if (me.onChanging(this, e) !== false) {

                    // ������ X ���꼴�ɡ�
                    handle.style.left = left + '%';

                    // ���»�������
                    me.onChange();

                }

                // ��ֹĬ�ϵ�����λ�ù��ܡ�
                return false;
            }
        });

        // �޸� handle �� left ֵ��
        if (!/%$/.test(handle.style.left)) {
            handle.style.left = Dom.getOffset(handle).left * 100 / this.elem.offsetWidth + '%';
        }
    },    /**
     * ����ĳ�������ֵ��
     * @param {Element} handle Ҫ���õĻ��顣
     * @returns {Number} ����һ�� 0 �� 1 ��ֵ����ʾ��������ֵ��
     */    getValueOfHandle: function (handle) {
        return handle ? this.min + parseFloat(handle.style.left) * (this.max - this.min) / 100 : 0;
    },    /**
     * ����ĳ�������ֵ��
     * @param {Element} handle Ҫ���õĻ��顣
     * @param {Number} value һ�� 0 �� 1 ��ֵ����ʾ��������ֵ��
     */    setValueOfHandle: function (handle, value) {
        if (handle) {
            handle.style.left = (value - this.min) * 100 / (this.max - this.min) + '%';
            this.onChange();
        }
        return this;
    },    /**
     * �ڻ��鼴���ƶ�ǰ������
     * @param {Object} draggable ���汾�λ�����ص���Ϣ��
     * @param {Event} e ����������ԭʼ�¼���Ϣ��
     * @returns {Boolean} ������λ�����Ч���򷵻� false��
     */    onChanging: function (draggable, e) {
        return this.trigger('chaning', draggable);
    },    onChange: function () {

        // �����ı���
        this.getInput().value = this.getValues();

        // ���û���ǰ��ɫ��
        var handles = Dom.query('.x-slider-handle', this.elem),
            start = handles[1] ? parseFloat(handles[0].style.left) : 0,
            fore = Dom.find('.x-slider-fore', this.elem);
        fore.style.left = start + '%';
        fore.style.width = handles[0] ? Math.max(0, parseFloat(handles[handles.length - 1].style.left) - start) + '%' : 0;

        return this.trigger('change');
    },    /**
     * ��ȡĳ�������Ļ��顣
     */    getHandle: function (index) {
        var handlers = Dom.query('.x-slider-handle', this.elem);
        return handlers[index < 0 ? handlers.length + index : index];
    },    /**
     * ��ȡÿ�������ֵ��
     */    getValues: function () {
        var values = [];
        Dom.each(Dom.query('.x-slider-handle', this.elem), function (handle, index) {
            values[index] = this.getValueOfHandle(handle);
        }, this);
        return values;
    },    getStart: function (value) {
        return this.getValueOfHandle(Dom.query('.x-slider-handle', this.elem).length > 1 && this.getHandle(0));
    },    setStart: function (value) {
        return this.setValueOfHandle(Dom.query('.x-slider-handle', this.elem).length > 1 && this.getHandle(0), value);
    },    getEnd: function (value) {
        return this.getValueOfHandle(this.getHandle(-1));
    },    setEnd: function (value) {
        return this.setValueOfHandle(this.getHandle(-1), value);
    },    getValue: function () {
        return this.getEnd() - this.getStart();
    },    setValue: function (value) {
        return this.setEnd(this.getStart() + value);
    }
});