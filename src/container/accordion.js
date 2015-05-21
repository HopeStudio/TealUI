/**
 * @author xuld
 */

// #require ../control/base.js

var Accordion = Control.extend({

    role: 'accordion',

    init: function (options) {

        var me = this;

        var panels = this.panels = [];

        var triggerBySelf = false;

	    Dom.each(this.elem.children, function (panelElem, index) {

            // ��ʼΪ��塣
	        var panel = panels[index] = Control.get(panelElem, 'panel');

	        panel.on('collapsing', function (value) {

	            if (triggerBySelf) {
	                return;
	            }
	            
	            // ��ֹ�۵���ǰ�
	            if (value == true || !me.trigger('changing', this)) {
	                return false;
	            }

	            triggerBySelf = true;
                
	            // չ����ǰ��ͬʱ�۵������
	            for (var i = 0; i < panels.length; i++) {
	                if (this !== panels[i]) {
	                    panels[i].toggleCollapse(true);
	                }
	            }

	            triggerBySelf = false;

	            me.trigger('change', this);

	        });

	    });

	}

});
