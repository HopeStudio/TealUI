/**
 * @author xuld
 */

/**
 * �� IE6 ֧��͸�� PNG��
 * @param {Element} [image] �޸���ͼƬ�ڵ㡣�粻ָ�����޸������ĵ���ͼƬ�� 
 * @example 
 * #### �޸���ǰҳ�������ͼƬ
 * fixPng()
 * 
 * #### �޸�ָ��ͼƬ
 * fixPng(doument.getElementById("id"))
 */
function fixPng(image) {
    /*@cc_on if(typeof XMLHttpRequest === "undefined" || typeof XMLHttpRequest === "function") {
	if(!image) {
		var images = document.images;
		for (var i = 0; image = images[i]; i++) {
			fixPng(image);
		}
	} else if (/\.png\b/.test(image.src)) {
		var imgID = (image.id) ? "id='" + image.id + "' " : "",
            imgClass = (image.className) ? "class='" + image.className + "' " : "",
		    imgTitle = (image.title) ? "title='" + image.title + "' " : "title='" + image.alt + "' ",
		    imgStyle = "display:inline-block;" + image.style.cssText;

		if (image.pin == "left")
			imgStyle = "float:left;" + imgStyle;
		if (image.pin == "right")
			imgStyle = "float:right;" + imgStyle;
		if (image.parentElement.href)
			imgStyle = "cursor:hand;" + imgStyle;
		image.outerHTML = "<span " + imgID + imgClass + imgTitle +
			" style=\"" +
			"width:" +
			image.width +
			"px; margin:6px; height:" +
			image.height +
			"px;" +
			imgStyle +
			";" +
			"filter:progid:DXImageTransform.Microsoft.AlphaImageLoader" +
			"(src=\'" +
			image.src +
			"\', sizingMethod='scale');\"></span>";
	}
    } @*/
}
