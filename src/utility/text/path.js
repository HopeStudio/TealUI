/**
 * @author xuld
 * Modified from https://github.com/joyent/node/blob/master/lib/path.js
 */

/**
 * �ṩ·��������صĺ�����
 */
var Path = {

	// resolves . and .. elements in a path array with directory names there
	// must be no slashes, empty elements, or device names (c:\) in the array
	// (so also no leading and trailing slashes - it does not distinguish
	// relative and absolute paths)
	_normalizeArray: function (parts, allowAboveRoot) {
		// if the path tries to go above the root, `up` ends up > 0
		var up = 0;
		for (var i = parts.length - 1; i >= 0; i--) {
			var last = parts[i];
			if (last === '.') {
				parts.splice(i, 1);
			} else if (last === '..') {
				parts.splice(i, 1);
				up++;
			} else if (up) {
				parts.splice(i, 1);
				up--;
			}
		}

		// if the path is allowed to go above the root, restore leading ..s
		if (allowAboveRoot) {
			for (; up--; up) {
				parts.unshift('..');
			}
		}

		return parts;
	},

	// Split a filename into [root, dir, basename, ext], unix version
	// 'root' is just a slash, or nothing.
	_splitPath: function(filename) {
		return /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(filename).slice(1);
	},

	basePath: "",

    /**
     * �ϲ����·��Ϊһ����
     * @param {String} ... Ҫ�ϲ���·����
     * @returns {String} ���غϲ������·����
     * @example Path.resolve("a/b", "../", "c") // "a/c"
     */
	resolve: function () {
		var resolvedPath = '',
			resolvedAbsolute = false;

		for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
			var path = (i >= 0) ? arguments[i] : Path.basePath;

			// Skip empty and invalid entries
			if (typeof path !== 'string') {
				throw new TypeError('Arguments to path.resolve must be strings');
			} else if (!path) {
				continue;
			}

			resolvedPath = path + '/' + resolvedPath;
			resolvedAbsolute = path.charAt(0) === '/';
		}

		// At this point the path should be resolved to a full absolute path, but
		// handle relative paths to be safe (might happen when process.cwd() fails)

		// Normalize the path
		resolvedPath = Path._normalizeArray(resolvedPath.split('/').filter(function (p) {
			return !!p;
		}), !resolvedAbsolute).join('/');

		return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
	},

    /**
     * �滮��ָ����·����
     * @param {String} path Ҫ�����·����
     * @returns {String} ���ش�������·����
     * @example Path.normalize("a/b/../c/d/e") // "a/c/d/e"
     */
	normalize: function (path) {
		var isAbsolute = path.charAt(0) === '/',
			trailingSlash = path.substr(-1) === '/';

		// Normalize the path
		path = Path._normalizeArray(path.split('/').filter(function (p) {
			return !!p;
		}), !isAbsolute).join('/');

		if (!path && !isAbsolute) {
			path = '.';
		}
		if (path && trailingSlash) {
			path += '/';
		}

		return (isAbsolute ? '/' : '') + path;
	},

    /**
     * �ϲ�����ļ���·��Ϊһ����
     * @param {String} path Ҫ������ļ���·����
     * @returns {String} ���غϲ������·����
     * @example Path.join("a/b/../c/d/e") // "a/c/d/e"
     */
	join: function() {
		var paths = Array.prototype.slice.call(arguments, 0);
		return Path.normalize(paths.filter(function (p, index) {
			if (typeof p !== 'string') {
				throw new TypeError('Arguments to path.join must be strings');
			}
			return p;
		}).join('/'));
	},

    /**
     * ����ָ��·������ڻ�·�������·����
     * @param {String} basePath �����Ļ�·����
     * @param {String} path Ҫ�����·����
     * @returns {String} @path ����� @basePath �Ļ�·����
     * @example Path.relative("a/b", "a/c") // "../c"
     */
	relative: function (basePath, path) {
		
		basePath = Path.resolve(basePath);
		path = Path.resolve(path);

		function trim(arr) {
			var start = 0;
			for (; start < arr.length; start++) {
				if (arr[start] !== '') break;
			}

			var end = arr.length - 1;
			for (; end >= 0; end--) {
				if (arr[end] !== '') break;
			}

			if (start > end) return [];
			return arr.slice(start, end - start + 1);
		}

		var fromParts = trim(basePath.split('/'));
		var toParts = trim(path.split('/'));

		var length = Math.min(fromParts.length, toParts.length);
		var samePartsLength = length;
		for (var i = 0; i < length; i++) {
			if (fromParts[i] !== toParts[i]) {
				samePartsLength = i;
				break;
			}
		}

		var outputParts = [];
		for (var i = samePartsLength; i < fromParts.length; i++) {
			outputParts.push('..');
		}

		outputParts.push.apply(outputParts, toParts.slice(samePartsLength));

		return outputParts.join('/');
	},

    /**
     * ��ȡָ��·�����ļ��������֡�
     * @param {String} path Ҫ�����·����
     * @returns {String} �����ļ��в��֡�
     * @example Path.dirname("e/a/b") // "e/a"
     */
	dirname: function(path) {
		var result = Path._splitPath(path),
			root = result[0],
			dir = result[1];

		if (!root && !dir) {
			// No dirname whatsoever
			return '.';
		}

		if (dir) {
			// It has a dirname, strip trailing slash
			dir = dir.substr(0, dir.length - 1);
		}

		return root + dir;
	},

    /**
     * ��ȡָ��·�����ļ������֡�
     * @param {String} path Ҫ�����·����
     * @returns {String} �����ļ����֡�
     * @example Path.dirname("e/a/b.txt") // "b.txt"
     */
	basename: function(path, ext) {
		var f = Path._splitPath(path)[2];
		// TODO: make this comparison case-insensitive on windows?
		if (ext && f.substr(-1 * ext.length) === ext) {
			f = f.substr(0, f.length - ext.length);
		}
		return f;
	},

    /**
     * ��ȡָ��·������չ�����֣������㣩��
     * @param {String} path Ҫ�����·����
     * @returns {String} ������չ�����֡�
     * @example Path.dirname("e/a/b.txt") // ".txt"
     */
	extname: function(path) {
		return Path._splitPath(path)[3];
	}

};
