/**
 * @author xuld
 * @fileOverview ��������
 */

// #require ../control/base.js

/**
 * ��������
 */
var ProgressBar = Control.extend({

	setValue: function (value) {
	    value = (value < 0 ? 0 : value > 1 ? 100 : (value * 100).toFixed(0)) + '%';
	    var fore = Dom.find('.x-progressbar-fore', this.elem);
	    fore.style.width = value;
	    if (fore.textContent) {
	        fore.textContent = value;
	    }
        return this.trigger('change');
    },

    getValue: function () {
        return parseFloat(Dom.find('.x-progressbar-fore', this.elem).style.width) / 100;
    }

});
