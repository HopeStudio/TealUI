/**
 * @author xuld
 */

/**
 * ��ָ��ʱ�̵�ָ��ʱ�̽��е���ʱ��
 * @param {Date} startDate? ��ʼ����ʱ��ʱ�䡣���ʡ����ӵ�ǰʱ�俪ʼ����ʱ��
 * @param {Date} endDate ��������ʱ��ʱ�䡣
 * @param {Function} callback ÿ�뵹��ʱ�Ļص��������Ĳ�������Ϊ:function(day, hour, minute, second, leftTime)
 * @param {Function} fn ��ÿ��Ԫ�����еĺ����������Ĳ�������Ϊ:
 *
 * ������    | ����      | ˵��
 * day      | `Number`  | Ӧ����ʾ��������
 * hour     | `Number`  | Ӧ����ʾ��Сʱ����
 * minute   | `Number`  | Ӧ����ʾ�ķ�����
 * second   | `Number`  | Ӧ����ʾ��������
 * leftTime | `Number`  | ʣ�µ���������
 * 
 * @returns {Number} ����һ����ʱ��������ͨ�� clearInterval(����ֵ) ֹͣ����ʱ��
 * @example countDown(function(day, hour, minute, second){ console.log(day, hour, minute, second); })
 */
function countDown(startDate, endDate, callback) {

    function step() {
        var leftTime = endDate - new Date() + startDateOffset;
        if (leftTime <= 0) {
            callback(0, 0, 0, 0, 0);
            return;
        }

        var second = Math.floor(leftTime / 1000),
			t = second,
			day = Math.floor(second / 86400),
			hour = Math.floor((t -= day * 86400) / 3600),
			minute = Math.floor((t -= hour * 3600) / 60);
        callback(day, hour, minute, Math.floor(t - minute * 60), second);
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
