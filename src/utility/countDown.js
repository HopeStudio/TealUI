/** * @author xuld *//**
 * ��ָ��ʱ�̵�ָ��ʱ�̽��е���ʱ��
 * @param {Date/String} startDate? ��ʼ����ʱ��ʱ�䡣���ʡ����ӵ�ǰʱ�俪ʼ����ʱ��
 * @param {Date/String} endDate ��������ʱ��ʱ�䡣
 * @param {Function} callback ÿ�뵹��ʱ�Ļص���function(day, hour, minute, second, leftTime)
 * @return {Number} ����һ����ʱ��������ͨ�� clearInterval(����ֵ) ֹͣ����ʱ��
 */function countDown(startDate, endDate, callback) {

    function step() {
        var leftTime = endDate - new Date() + startDateOffset;
        if (leftTime <= 0) {
            callback(0, 0, 0, 0, 0);            return;
        }
        var second = Math.floor(leftTime / 1000),			t = second,			day = Math.floor(second / 86400),			hour = Math.floor((t -= day * 86400) / 3600),			minute = Math.floor((t -= hour * 3600) / 60);        callback(day, hour, minute, Math.floor(t - minute * 60), second);
    }

    // ����һ��������
    if (!callback) {
        callback = endDate;
        endDate = startDate;
        startDate = 0;
    }

    var startDateOffset = startDate ? (new Date() - (startDate instanceof Date ? startDate : new Date(startDate))) : 0;
    endDate = +(endDate instanceof Date ? endDate : new Date(endDate));

    step();

    return setInterval(step, 1000);
}