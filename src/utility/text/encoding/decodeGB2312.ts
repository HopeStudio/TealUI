
import {Gb2312Dict} from './gb2312dict';

declare function unescape(value: string): string;

/**
 * ��ָ�����ַ������� GB2312 ���롣
 * @param value Ҫת�����ַ�����
 * @returns ת������ַ�����
 * @example decodeGB2312("%C4%E3") // "��"
 */
export function decodeGB2312(value: string) {
    return value.replace(/%([\da-f][\da-f])(%([\da-f][\da-f]))?/ig, (all: string, x: string, __, y: string) => {
        if (!y) return String.fromCharCode(parseInt(x, 16));
        var p = Gb2312Dict.indexOf((x + y).toUpperCase());
        return p >= 0 ? String.fromCharCode(0x4e00 + p) : unescape(all);
    });
}
