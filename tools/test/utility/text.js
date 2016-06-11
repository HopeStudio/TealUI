
QUnit.module("crypto", function () {

    importModule("utility/text/crypto/simple");
    QUnit.test("simple", function (assert) {
        assert.strictEqual(decryptSimple(encryptSimple("value")), "value");
        assert.strictEqual(decryptSimple(encryptSimple("中文")), "中文");
    });

    importModule("utility/text/crypto/md5");
    QUnit.test("md5", function (assert) {
        assert.strictEqual(md5("value"), "2063c1608d6e0baf80249c42e2be5804");
        assert.strictEqual(md5("中文"), "a7bac2239fcdcb3a067903d8077c4a07");
        assert.strictEqual(md5(""), "d41d8cd98f00b204e9800998ecf8427e");
        assert.strictEqual(md5("a"), "0cc175b9c0f1b6a831c399e269772661");
        assert.strictEqual(md5("abc"), "900150983cd24fb0d6963f7d28e17f72");
        assert.strictEqual(md5("message digest"), "f96b697d7cb7938d525a2f31aaf161d0");
        assert.strictEqual(md5("abcdefghijklmnopqrstuvwxyz"), "c3fcd3d76192e4007dfb496cca67e13b");
        assert.strictEqual(md5("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"), "d174ab98d277d9f5a5611c2c9f419d9f");
        assert.strictEqual(md5("hello"), "5d41402abc4b2a76b9719d911017c592");
        assert.strictEqual(md5(repeat("a", 53)), "e9e7e260dce84ffa6e0e7eb5fd9d37fc")
        assert.strictEqual(md5(repeat("a", 54)), "eced9e0b81ef2bba605cbc5e2e76a1d0")
        assert.strictEqual(md5(repeat("a", 55)), "ef1772b6dff9a122358552954ad0df65")
        assert.strictEqual(md5(repeat("a", 56)), "3b0c8ac703f828b04c6c197006d17218")
        assert.strictEqual(md5(repeat("a", 57)), "652b906d60af96844ebd21b674f35e93")
        assert.strictEqual(md5(repeat("a", 63)), "b06521f39153d618550606be297466d5")
        assert.strictEqual(md5(repeat("a", 64)), "014842d480b571495a4a0363793f7367")
        assert.strictEqual(md5(repeat("a", 65)), "c743a45e0d2e6a95cb859adae0248435")
        assert.strictEqual(md5(repeat("a", 255)), "46bc249a5a8fc5d622cf12c42c463ae0")
        assert.strictEqual(md5(repeat("a", 256)), "81109eec5aa1a284fb5327b10e9c16b9")

        function repeat(s, len) {
            return new Array(len + 1).join(s);
        }
    });

    importModule("utility/text/crypto/md5.ext");
    QUnit.test("md5.base64", function (assert) {
        assert.strictEqual(md5.base64("value", "key"), "IGPBYI1uC6+AJJxC4r5YBA");
        assert.strictEqual(md5.base64("中文"), "p7rCI5/NyzoGeQPYB3xKBw");
    });
    QUnit.test("md5.hmac", function (assert) {
        assert.strictEqual(md5.hmac("value", "key"), "01433efd5f16327ea4b31144572c67f6");
        assert.strictEqual(md5.hmac("中文", "中文"), "05fe3b294344f4e93c811e10f9825a38");
    });
    QUnit.test("md5.hmacBase64", function (assert) {
        assert.strictEqual(md5.hmacBase64("value"), "hma9GehtpZrNyf4kJBytUw");
        assert.strictEqual(md5.hmacBase64("中文", "中文"), "Bf47KUNE9Ok8gR4Q+YJaOA");
    });

    importModule("utility/text/crypto/des");
    QUnit.test("des", function (assert) {
        assert.strictEqual(btoa(des("value", "key")), "bBzVQ8LJULA4F5FoUzwp2A==");
        assert.strictEqual(btoa(des("中文", "中文")), "+aUhkUR47Ww=");

        assert.strictEqual(des(atob("bBzVQ8LJULA4F5FoUzwp2A=="), "key", true), "value");
        assert.strictEqual(des(atob("+aUhkUR47Ww="), "中文", true), "中文");
    });

    importModule("utility/text/crypto/sha1");
    QUnit.test("sha1", function (assert) {
        assert.strictEqual(sha1("message"), "6f9b9af3cd6e8b8a73c2cdced37fe9f59226e27d");
        assert.strictEqual(sha1("value"), "f32b67c7e26342af42efabc674d441dca0a281c5");
        assert.strictEqual(sha1("中文"), "ebb68d6dc40f01031f4fd1d6f7fd19cf941a129a");
    });

});

QUnit.module("chinese", function () {
    importModule("utility/text/chinese/pinyin");
    QUnit.test("getPinYin", function (assert) {
        assert.strictEqual(getPinYin("哈"), "Ha");
    });

    importModule("utility/text/chinese/tradional");
    QUnit.test("tradional", function (assert) {
        assert.strictEqual(toTradionalChinese("简体"), "簡體");
        assert.strictEqual(toSimpleChinese("簡體"), "简体");
    });
});

QUnit.module("encoding", function () {

    importModule("utility/text/encoding/base64-polyfill");
    QUnit.test("btoa", function (assert) {
        assert.strictEqual(btoa('a'), 'YQ==');
    });
    QUnit.test("atob", function (assert) {
        assert.strictEqual(atob('YQ=='), 'a');
    });

    importModule("utility/text/encoding/base64");
    QUnit.test("encodeBase64", function (assert) {
        assert.strictEqual(encodeBase64('✓ à la mode'), '4pyTIMOgIGxhIG1vZGU=');
        assert.strictEqual(encodeBase64('Ձאab'), '1YHXkGFi');
        assert.strictEqual(encodeBase64('你好我是菲利普'), '5L2g5aW95oiR5piv6I+y5Yip5pmu');
        assert.strictEqual(encodeBase64('✈🍯✈🌂✈🔥✈🐔✈'), '4pyI7aC87b2v4pyI7aC87byC4pyI7aC97bSl4pyI7aC97bCU4pyI');
        assert.strictEqual(encodeBase64('\0\x01\x02\x03\x04\x05\x06\x07\b\t\n\x0B\f\r\x0E\x0F\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1A\x1B\x1C\x1D\x1E\x1F !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~\x7F'), 'AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn8=');
        assert.strictEqual(encodeBase64('a'), 'YQ==');
        assert.strictEqual(encodeBase64('aa'), 'YWE=');
        assert.strictEqual(encodeBase64('aaa'), 'YWFh');
        assert.strictEqual(encodeBase64('foo\0'), 'Zm9vAA==');
        assert.strictEqual(encodeBase64('foo\0\0'), 'Zm9vAAA=');
        assert.strictEqual(encodeBase64('\t\t\t\t\t'), 'CQkJCQk=');
        assert.strictEqual(encodeBase64('a\n\n\n\n\na'), 'YQoKCgoKYQ==');
        assert.strictEqual(encodeBase64('a\na'), 'YQph');
    });
    QUnit.test("decodeBase64", function (assert) {
        assert.strictEqual(decodeBase64('4pyTIMOgIGxhIG1vZGU='), '✓ à la mode');
        assert.strictEqual(decodeBase64('YQph'), 'a\na');
        assert.strictEqual(decodeBase64('AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn8='), '\0\x01\x02\x03\x04\x05\x06\x07\b\t\n\x0B\f\r\x0E\x0F\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1A\x1B\x1C\x1D\x1E\x1F !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~\x7F');
        assert.strictEqual(decodeBase64('YQ'), 'a');
        assert.strictEqual(decodeBase64('YR'), 'a');
        assert.strictEqual(decodeBase64('Zm9vIGJhciBiYXo='), 'foo bar baz');
        assert.strictEqual(decodeBase64('Zm9vIGJhcg=='), 'foo bar');
        assert.strictEqual(decodeBase64('Zm9v'), 'foo');
        assert.strictEqual(decodeBase64('Zm9vAA='), 'foo\0');
        assert.strictEqual(decodeBase64('Zm9vAAA='), 'foo\0\0');
        assert.strictEqual(decodeBase64('CQkJCQk='), '\t\t\t\t\t');
        assert.strictEqual(decodeBase64('YQoKCgoKYQ=='), 'a\n\n\n\n\na');
        assert.strictEqual(decodeBase64('YQ0KDQoNCg0KDQph'), 'a\r\n\r\n\r\n\r\n\r\na');
        assert.strictEqual(decodeBase64('Cg=='), '\n');
        assert.strictEqual(decodeBase64('DQ=='), '\r');
    });

    importModule("utility/text/encoding/html");
    QUnit.test("encodeHTML", function (assert) {
        assert.strictEqual(encodeHTML("<a></a>"), '&lt;a&gt;&lt;/a&gt;');
    });
    QUnit.test("encodeHTMLAttribute", function (assert) {
        assert.strictEqual(encodeHTMLAttribute("<a></a>"), '<a></a>');
    });
    QUnit.test("decodeHTML", function (assert) {
        assert.strictEqual(decodeHTML("&lt;a&gt;&lt;/a&gt;"), '<a></a>');
    });
    QUnit.test("escapeHTMLAttribute", function (assert) {
        assert.strictEqual(escapeHTMLAttribute("abc"), 'abc');
        assert.strictEqual(escapeHTMLAttribute("abc\"\'"), '"abc&quot;\'"');
        assert.strictEqual(escapeHTMLAttribute("abc\"\'", '"'), '"abc&quot;\'"');
        assert.strictEqual(escapeHTMLAttribute("abc\"\'", '\''), '\'abc"&#39;\'');
    });
    QUnit.test("unescapeHTMLAttribute", function (assert) {
        assert.strictEqual(unescapeHTMLAttribute("'a'"), 'a');
    });

    importModule("utility/text/encoding/utf8");
    QUnit.test("encodeUTF8", function (assert) {
        assert.strictEqual(encodeUTF8("a"), '\\u0061');
        assert.strictEqual(encodeUTF8("你"), '\\u4f60');
    });
    QUnit.test("decodeUTF8", function (assert) {
        assert.strictEqual(decodeUTF8("a"), 'a');
        assert.strictEqual(decodeUTF8("\\u4f60"), '你');
    });

    importModule("utility/text/encoding/gb2312");
    QUnit.test("encodeGB2312", function (assert) {
        assert.strictEqual(encodeGB2312("a"), 'a');
        assert.strictEqual(encodeGB2312("你"), '%C4%E3');
    });
    QUnit.test("decodeGB2312", function (assert) {
        assert.strictEqual(decodeGB2312("a"), 'a');
        assert.strictEqual(decodeGB2312("%C4%E3"), '你');
    });
});

QUnit.module("check", function () {

    importModule("utility/text/check");
    QUnit.test("isLetter", function (assert) {

    });

});



//test("JSON.decode", function () {
//    return
//    expect(8);

//    equal(JSON.decode(), null, "Nothing in, null out.");
//    equal(JSON.decode(null), null, "Nothing in, null out.");
//    equal(JSON.decode(""), null, "Nothing in, null out.");

//    deepEqual(JSON.decode("{}"), {}, "Plain object parsing.");
//    deepEqual(JSON.decode("{\"test\":1}"), { "test": 1 }, "Plain object parsing.");

//    deepEqual(JSON.decode("\n{\"test\":1}"), { "test": 1 }, "Make sure leading whitespaces are handled.");

//    try {
//        JSON.decode("{a:1}");
//        ok(false, "Test malformed JSON string.");
//    } catch (e) {
//        ok(true, "Test malformed JSON string.");
//    }

//    try {
//        JSON.decode("{'a':1}");
//        ok(false, "Test malformed JSON string.");
//    } catch (e) {
//        ok(true, "Test malformed JSON string.");
//    }
//});