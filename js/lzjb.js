(function(f) { if (typeof exports === "object" && typeof module !== "undefined") { module.exports = f() } else if (typeof define === "function" && define.amd) { define([], f) } else { var g; if (typeof window !== "undefined") { g = window } else if (typeof global !== "undefined") { g = global } else if (typeof self !== "undefined") { g = self } else { g = this } g.lzjb = f() } })(function() {
    var define, module, exports; return (function() { function r(e, n, t) { function o(i, f) { if (!n[i]) { if (!e[i]) { var c = "function" == typeof require && require; if (!f && c) return c(i, !0); if (u) return u(i, !0); var a = new Error("Cannot find module '" + i + "'"); throw a.code = "MODULE_NOT_FOUND", a } var p = n[i] = { exports: {} }; e[i][0].call(p.exports, function(r) { var n = e[i][1][r]; return o(n || r) }, p, p.exports, r, e, n, t) } return n[i].exports } for (var u = "function" == typeof require && require, i = 0; i < t.length; i++)o(t[i]); return o } return r })()({
        1: [function(require, module, exports) {
            (function(process) {
                (function() {
                    // 'path' module extracted from Node.js v8.11.1 (only the posix part)
                    // transplited with Babel

                    // Copyright Joyent, Inc. and other Node contributors.
                    //
                    // Permission is hereby granted, free of charge, to any person obtaining a
                    // copy of this software and associated documentation files (the
                    // "Software"), to deal in the Software without restriction, including
                    // without limitation the rights to use, copy, modify, merge, publish,
                    // distribute, sublicense, and/or sell copies of the Software, and to permit
                    // persons to whom the Software is furnished to do so, subject to the
                    // following conditions:
                    //
                    // The above copyright notice and this permission notice shall be included
                    // in all copies or substantial portions of the Software.
                    //
                    // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
                    // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
                    // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
                    // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
                    // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
                    // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
                    // USE OR OTHER DEALINGS IN THE SOFTWARE.

                    'use strict';

                    function assertPath(path) {
                        if (typeof path !== 'string') {
                            throw new TypeError('Path must be a string. Received ' + JSON.stringify(path));
                        }
                    }

                    // Resolves . and .. elements in a path with directory names
                    function normalizeStringPosix(path, allowAboveRoot) {
                        var res = '';
                        var lastSegmentLength = 0;
                        var lastSlash = -1;
                        var dots = 0;
                        var code;
                        for (var i = 0; i <= path.length; ++i) {
                            if (i < path.length)
                                code = path.charCodeAt(i);
                            else if (code === 47 /*/*/)
                                break;
                            else
                                code = 47 /*/*/;
                            if (code === 47 /*/*/) {
                                if (lastSlash === i - 1 || dots === 1) {
                                    // NOOP
                                } else if (lastSlash !== i - 1 && dots === 2) {
                                    if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 /*.*/ || res.charCodeAt(res.length - 2) !== 46 /*.*/) {
                                        if (res.length > 2) {
                                            var lastSlashIndex = res.lastIndexOf('/');
                                            if (lastSlashIndex !== res.length - 1) {
                                                if (lastSlashIndex === -1) {
                                                    res = '';
                                                    lastSegmentLength = 0;
                                                } else {
                                                    res = res.slice(0, lastSlashIndex);
                                                    lastSegmentLength = res.length - 1 - res.lastIndexOf('/');
                                                }
                                                lastSlash = i;
                                                dots = 0;
                                                continue;
                                            }
                                        } else if (res.length === 2 || res.length === 1) {
                                            res = '';
                                            lastSegmentLength = 0;
                                            lastSlash = i;
                                            dots = 0;
                                            continue;
                                        }
                                    }
                                    if (allowAboveRoot) {
                                        if (res.length > 0)
                                            res += '/..';
                                        else
                                            res = '..';
                                        lastSegmentLength = 2;
                                    }
                                } else {
                                    if (res.length > 0)
                                        res += '/' + path.slice(lastSlash + 1, i);
                                    else
                                        res = path.slice(lastSlash + 1, i);
                                    lastSegmentLength = i - lastSlash - 1;
                                }
                                lastSlash = i;
                                dots = 0;
                            } else if (code === 46 /*.*/ && dots !== -1) {
                                ++dots;
                            } else {
                                dots = -1;
                            }
                        }
                        return res;
                    }

                    function _format(sep, pathObject) {
                        var dir = pathObject.dir || pathObject.root;
                        var base = pathObject.base || (pathObject.name || '') + (pathObject.ext || '');
                        if (!dir) {
                            return base;
                        }
                        if (dir === pathObject.root) {
                            return dir + base;
                        }
                        return dir + sep + base;
                    }

                    var posix = {
                        // path.resolve([from ...], to)
                        resolve: function resolve() {
                            var resolvedPath = '';
                            var resolvedAbsolute = false;
                            var cwd;

                            for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
                                var path;
                                if (i >= 0)
                                    path = arguments[i];
                                else {
                                    if (cwd === undefined)
                                        cwd = process.cwd();
                                    path = cwd;
                                }

                                assertPath(path);

                                // Skip empty entries
                                if (path.length === 0) {
                                    continue;
                                }

                                resolvedPath = path + '/' + resolvedPath;
                                resolvedAbsolute = path.charCodeAt(0) === 47 /*/*/;
                            }

                            // At this point the path should be resolved to a full absolute path, but
                            // handle relative paths to be safe (might happen when process.cwd() fails)

                            // Normalize the path
                            resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);

                            if (resolvedAbsolute) {
                                if (resolvedPath.length > 0)
                                    return '/' + resolvedPath;
                                else
                                    return '/';
                            } else if (resolvedPath.length > 0) {
                                return resolvedPath;
                            } else {
                                return '.';
                            }
                        },

                        normalize: function normalize(path) {
                            assertPath(path);

                            if (path.length === 0) return '.';

                            var isAbsolute = path.charCodeAt(0) === 47 /*/*/;
                            var trailingSeparator = path.charCodeAt(path.length - 1) === 47 /*/*/;

                            // Normalize the path
                            path = normalizeStringPosix(path, !isAbsolute);

                            if (path.length === 0 && !isAbsolute) path = '.';
                            if (path.length > 0 && trailingSeparator) path += '/';

                            if (isAbsolute) return '/' + path;
                            return path;
                        },

                        isAbsolute: function isAbsolute(path) {
                            assertPath(path);
                            return path.length > 0 && path.charCodeAt(0) === 47 /*/*/;
                        },

                        join: function join() {
                            if (arguments.length === 0)
                                return '.';
                            var joined;
                            for (var i = 0; i < arguments.length; ++i) {
                                var arg = arguments[i];
                                assertPath(arg);
                                if (arg.length > 0) {
                                    if (joined === undefined)
                                        joined = arg;
                                    else
                                        joined += '/' + arg;
                                }
                            }
                            if (joined === undefined)
                                return '.';
                            return posix.normalize(joined);
                        },

                        relative: function relative(from, to) {
                            assertPath(from);
                            assertPath(to);

                            if (from === to) return '';

                            from = posix.resolve(from);
                            to = posix.resolve(to);

                            if (from === to) return '';

                            // Trim any leading backslashes
                            var fromStart = 1;
                            for (; fromStart < from.length; ++fromStart) {
                                if (from.charCodeAt(fromStart) !== 47 /*/*/)
                                    break;
                            }
                            var fromEnd = from.length;
                            var fromLen = fromEnd - fromStart;

                            // Trim any leading backslashes
                            var toStart = 1;
                            for (; toStart < to.length; ++toStart) {
                                if (to.charCodeAt(toStart) !== 47 /*/*/)
                                    break;
                            }
                            var toEnd = to.length;
                            var toLen = toEnd - toStart;

                            // Compare paths to find the longest common path from root
                            var length = fromLen < toLen ? fromLen : toLen;
                            var lastCommonSep = -1;
                            var i = 0;
                            for (; i <= length; ++i) {
                                if (i === length) {
                                    if (toLen > length) {
                                        if (to.charCodeAt(toStart + i) === 47 /*/*/) {
                                            // We get here if `from` is the exact base path for `to`.
                                            // For example: from='/foo/bar'; to='/foo/bar/baz'
                                            return to.slice(toStart + i + 1);
                                        } else if (i === 0) {
                                            // We get here if `from` is the root
                                            // For example: from='/'; to='/foo'
                                            return to.slice(toStart + i);
                                        }
                                    } else if (fromLen > length) {
                                        if (from.charCodeAt(fromStart + i) === 47 /*/*/) {
                                            // We get here if `to` is the exact base path for `from`.
                                            // For example: from='/foo/bar/baz'; to='/foo/bar'
                                            lastCommonSep = i;
                                        } else if (i === 0) {
                                            // We get here if `to` is the root.
                                            // For example: from='/foo'; to='/'
                                            lastCommonSep = 0;
                                        }
                                    }
                                    break;
                                }
                                var fromCode = from.charCodeAt(fromStart + i);
                                var toCode = to.charCodeAt(toStart + i);
                                if (fromCode !== toCode)
                                    break;
                                else if (fromCode === 47 /*/*/)
                                    lastCommonSep = i;
                            }

                            var out = '';
                            // Generate the relative path based on the path difference between `to`
                            // and `from`
                            for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
                                if (i === fromEnd || from.charCodeAt(i) === 47 /*/*/) {
                                    if (out.length === 0)
                                        out += '..';
                                    else
                                        out += '/..';
                                }
                            }

                            // Lastly, append the rest of the destination (`to`) path that comes after
                            // the common path parts
                            if (out.length > 0)
                                return out + to.slice(toStart + lastCommonSep);
                            else {
                                toStart += lastCommonSep;
                                if (to.charCodeAt(toStart) === 47 /*/*/)
                                    ++toStart;
                                return to.slice(toStart);
                            }
                        },

                        _makeLong: function _makeLong(path) {
                            return path;
                        },

                        dirname: function dirname(path) {
                            assertPath(path);
                            if (path.length === 0) return '.';
                            var code = path.charCodeAt(0);
                            var hasRoot = code === 47 /*/*/;
                            var end = -1;
                            var matchedSlash = true;
                            for (var i = path.length - 1; i >= 1; --i) {
                                code = path.charCodeAt(i);
                                if (code === 47 /*/*/) {
                                    if (!matchedSlash) {
                                        end = i;
                                        break;
                                    }
                                } else {
                                    // We saw the first non-path separator
                                    matchedSlash = false;
                                }
                            }

                            if (end === -1) return hasRoot ? '/' : '.';
                            if (hasRoot && end === 1) return '//';
                            return path.slice(0, end);
                        },

                        basename: function basename(path, ext) {
                            if (ext !== undefined && typeof ext !== 'string') throw new TypeError('"ext" argument must be a string');
                            assertPath(path);

                            var start = 0;
                            var end = -1;
                            var matchedSlash = true;
                            var i;

                            if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
                                if (ext.length === path.length && ext === path) return '';
                                var extIdx = ext.length - 1;
                                var firstNonSlashEnd = -1;
                                for (i = path.length - 1; i >= 0; --i) {
                                    var code = path.charCodeAt(i);
                                    if (code === 47 /*/*/) {
                                        // If we reached a path separator that was not part of a set of path
                                        // separators at the end of the string, stop now
                                        if (!matchedSlash) {
                                            start = i + 1;
                                            break;
                                        }
                                    } else {
                                        if (firstNonSlashEnd === -1) {
                                            // We saw the first non-path separator, remember this index in case
                                            // we need it if the extension ends up not matching
                                            matchedSlash = false;
                                            firstNonSlashEnd = i + 1;
                                        }
                                        if (extIdx >= 0) {
                                            // Try to match the explicit extension
                                            if (code === ext.charCodeAt(extIdx)) {
                                                if (--extIdx === -1) {
                                                    // We matched the extension, so mark this as the end of our path
                                                    // component
                                                    end = i;
                                                }
                                            } else {
                                                // Extension does not match, so our result is the entire path
                                                // component
                                                extIdx = -1;
                                                end = firstNonSlashEnd;
                                            }
                                        }
                                    }
                                }

                                if (start === end) end = firstNonSlashEnd; else if (end === -1) end = path.length;
                                return path.slice(start, end);
                            } else {
                                for (i = path.length - 1; i >= 0; --i) {
                                    if (path.charCodeAt(i) === 47 /*/*/) {
                                        // If we reached a path separator that was not part of a set of path
                                        // separators at the end of the string, stop now
                                        if (!matchedSlash) {
                                            start = i + 1;
                                            break;
                                        }
                                    } else if (end === -1) {
                                        // We saw the first non-path separator, mark this as the end of our
                                        // path component
                                        matchedSlash = false;
                                        end = i + 1;
                                    }
                                }

                                if (end === -1) return '';
                                return path.slice(start, end);
                            }
                        },

                        extname: function extname(path) {
                            assertPath(path);
                            var startDot = -1;
                            var startPart = 0;
                            var end = -1;
                            var matchedSlash = true;
                            // Track the state of characters (if any) we see before our first dot and
                            // after any path separator we find
                            var preDotState = 0;
                            for (var i = path.length - 1; i >= 0; --i) {
                                var code = path.charCodeAt(i);
                                if (code === 47 /*/*/) {
                                    // If we reached a path separator that was not part of a set of path
                                    // separators at the end of the string, stop now
                                    if (!matchedSlash) {
                                        startPart = i + 1;
                                        break;
                                    }
                                    continue;
                                }
                                if (end === -1) {
                                    // We saw the first non-path separator, mark this as the end of our
                                    // extension
                                    matchedSlash = false;
                                    end = i + 1;
                                }
                                if (code === 46 /*.*/) {
                                    // If this is our first dot, mark it as the start of our extension
                                    if (startDot === -1)
                                        startDot = i;
                                    else if (preDotState !== 1)
                                        preDotState = 1;
                                } else if (startDot !== -1) {
                                    // We saw a non-dot and non-path separator before our dot, so we should
                                    // have a good chance at having a non-empty extension
                                    preDotState = -1;
                                }
                            }

                            if (startDot === -1 || end === -1 ||
                                // We saw a non-dot character immediately before the dot
                                preDotState === 0 ||
                                // The (right-most) trimmed path component is exactly '..'
                                preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
                                return '';
                            }
                            return path.slice(startDot, end);
                        },

                        format: function format(pathObject) {
                            if (pathObject === null || typeof pathObject !== 'object') {
                                throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
                            }
                            return _format('/', pathObject);
                        },

                        parse: function parse(path) {
                            assertPath(path);

                            var ret = { root: '', dir: '', base: '', ext: '', name: '' };
                            if (path.length === 0) return ret;
                            var code = path.charCodeAt(0);
                            var isAbsolute = code === 47 /*/*/;
                            var start;
                            if (isAbsolute) {
                                ret.root = '/';
                                start = 1;
                            } else {
                                start = 0;
                            }
                            var startDot = -1;
                            var startPart = 0;
                            var end = -1;
                            var matchedSlash = true;
                            var i = path.length - 1;

                            // Track the state of characters (if any) we see before our first dot and
                            // after any path separator we find
                            var preDotState = 0;

                            // Get non-dir info
                            for (; i >= start; --i) {
                                code = path.charCodeAt(i);
                                if (code === 47 /*/*/) {
                                    // If we reached a path separator that was not part of a set of path
                                    // separators at the end of the string, stop now
                                    if (!matchedSlash) {
                                        startPart = i + 1;
                                        break;
                                    }
                                    continue;
                                }
                                if (end === -1) {
                                    // We saw the first non-path separator, mark this as the end of our
                                    // extension
                                    matchedSlash = false;
                                    end = i + 1;
                                }
                                if (code === 46 /*.*/) {
                                    // If this is our first dot, mark it as the start of our extension
                                    if (startDot === -1) startDot = i; else if (preDotState !== 1) preDotState = 1;
                                } else if (startDot !== -1) {
                                    // We saw a non-dot and non-path separator before our dot, so we should
                                    // have a good chance at having a non-empty extension
                                    preDotState = -1;
                                }
                            }

                            if (startDot === -1 || end === -1 ||
                                // We saw a non-dot character immediately before the dot
                                preDotState === 0 ||
                                // The (right-most) trimmed path component is exactly '..'
                                preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
                                if (end !== -1) {
                                    if (startPart === 0 && isAbsolute) ret.base = ret.name = path.slice(1, end); else ret.base = ret.name = path.slice(startPart, end);
                                }
                            } else {
                                if (startPart === 0 && isAbsolute) {
                                    ret.name = path.slice(1, startDot);
                                    ret.base = path.slice(1, end);
                                } else {
                                    ret.name = path.slice(startPart, startDot);
                                    ret.base = path.slice(startPart, end);
                                }
                                ret.ext = path.slice(startDot, end);
                            }

                            if (startPart > 0) ret.dir = path.slice(0, startPart - 1); else if (isAbsolute) ret.dir = '/';

                            return ret;
                        },

                        sep: '/',
                        delimiter: ':',
                        win32: null,
                        posix: null
                    };

                    posix.posix = posix;

                    module.exports = posix;

                }).call(this)
            }).call(this, require('_process'))
        }, { "_process": 2 }], 2: [function(require, module, exports) {
            // shim for using process in browser
            var process = module.exports = {};

            // cached from whatever global is present so that test runners that stub it
            // don't break things.  But we need to wrap it in a try catch in case it is
            // wrapped in strict mode code which doesn't define any globals.  It's inside a
            // function because try/catches deoptimize in certain engines.

            var cachedSetTimeout;
            var cachedClearTimeout;

            function defaultSetTimout() {
                throw new Error('setTimeout has not been defined');
            }
            function defaultClearTimeout() {
                throw new Error('clearTimeout has not been defined');
            }
            (function() {
                try {
                    if (typeof setTimeout === 'function') {
                        cachedSetTimeout = setTimeout;
                    } else {
                        cachedSetTimeout = defaultSetTimout;
                    }
                } catch (e) {
                    cachedSetTimeout = defaultSetTimout;
                }
                try {
                    if (typeof clearTimeout === 'function') {
                        cachedClearTimeout = clearTimeout;
                    } else {
                        cachedClearTimeout = defaultClearTimeout;
                    }
                } catch (e) {
                    cachedClearTimeout = defaultClearTimeout;
                }
            }())
            function runTimeout(fun) {
                if (cachedSetTimeout === setTimeout) {
                    //normal enviroments in sane situations
                    return setTimeout(fun, 0);
                }
                // if setTimeout wasn't available but was latter defined
                if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
                    cachedSetTimeout = setTimeout;
                    return setTimeout(fun, 0);
                }
                try {
                    // when when somebody has screwed with setTimeout but no I.E. maddness
                    return cachedSetTimeout(fun, 0);
                } catch (e) {
                    try {
                        // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
                        return cachedSetTimeout.call(null, fun, 0);
                    } catch (e) {
                        // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
                        return cachedSetTimeout.call(this, fun, 0);
                    }
                }


            }
            function runClearTimeout(marker) {
                if (cachedClearTimeout === clearTimeout) {
                    //normal enviroments in sane situations
                    return clearTimeout(marker);
                }
                // if clearTimeout wasn't available but was latter defined
                if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
                    cachedClearTimeout = clearTimeout;
                    return clearTimeout(marker);
                }
                try {
                    // when when somebody has screwed with setTimeout but no I.E. maddness
                    return cachedClearTimeout(marker);
                } catch (e) {
                    try {
                        // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
                        return cachedClearTimeout.call(null, marker);
                    } catch (e) {
                        // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
                        // Some versions of I.E. have different rules for clearTimeout vs setTimeout
                        return cachedClearTimeout.call(this, marker);
                    }
                }



            }
            var queue = [];
            var draining = false;
            var currentQueue;
            var queueIndex = -1;

            function cleanUpNextTick() {
                if (!draining || !currentQueue) {
                    return;
                }
                draining = false;
                if (currentQueue.length) {
                    queue = currentQueue.concat(queue);
                } else {
                    queueIndex = -1;
                }
                if (queue.length) {
                    drainQueue();
                }
            }

            function drainQueue() {
                if (draining) {
                    return;
                }
                var timeout = runTimeout(cleanUpNextTick);
                draining = true;

                var len = queue.length;
                while (len) {
                    currentQueue = queue;
                    queue = [];
                    while (++queueIndex < len) {
                        if (currentQueue) {
                            currentQueue[queueIndex].run();
                        }
                    }
                    queueIndex = -1;
                    len = queue.length;
                }
                currentQueue = null;
                draining = false;
                runClearTimeout(timeout);
            }

            process.nextTick = function(fun) {
                var args = new Array(arguments.length - 1);
                if (arguments.length > 1) {
                    for (var i = 1; i < arguments.length; i++) {
                        args[i - 1] = arguments[i];
                    }
                }
                queue.push(new Item(fun, args));
                if (queue.length === 1 && !draining) {
                    runTimeout(drainQueue);
                }
            };

            // v8 likes predictible objects
            function Item(fun, array) {
                this.fun = fun;
                this.array = array;
            }
            Item.prototype.run = function() {
                this.fun.apply(null, this.array);
            };
            process.title = 'browser';
            process.browser = true;
            process.env = {};
            process.argv = [];
            process.version = ''; // empty string to avoid regexp issues
            process.versions = {};

            function noop() { }

            process.on = noop;
            process.addListener = noop;
            process.once = noop;
            process.off = noop;
            process.removeListener = noop;
            process.removeAllListeners = noop;
            process.emit = noop;
            process.prependListener = noop;
            process.prependOnceListener = noop;

            process.listeners = function(name) { return [] }

            process.binding = function(name) {
                throw new Error('process.binding is not supported');
            };

            process.cwd = function() { return '/' };
            process.chdir = function(dir) {
                throw new Error('process.chdir is not supported');
            };
            process.umask = function() { return 0; };

        }, {}], 3: [function(require, module, exports) {
            module.exports = require('lzjb');

        }, { "lzjb": 5 }], 4: [function(require, module, exports) {
            (function(process, __filename) {
                (function() {
                    /** vim: et:ts=4:sw=4:sts=4
                     * @license amdefine 0.1.0 Copyright (c) 2011, The Dojo Foundation All Rights Reserved.
                     * Available via the MIT or new BSD license.
                     * see: http://github.com/jrburke/amdefine for details
                     */

                    /*jslint node: true */
                    /*global module, process */
                    'use strict';

                    /**
                     * Creates a define for node.
                     * @param {Object} module the "module" object that is defined by Node for the
                     * current module.
                     * @param {Function} [requireFn]. Node's require function for the current module.
                     * It only needs to be passed in Node versions before 0.5, when module.require
                     * did not exist.
                     * @returns {Function} a define function that is usable for the current node
                     * module.
                     */
                    function amdefine(module, requireFn) {
                        'use strict';
                        var defineCache = {},
                            loaderCache = {},
                            alreadyCalled = false,
                            path = require('path'),
                            makeRequire, stringRequire;

                        /**
                         * Trims the . and .. from an array of path segments.
                         * It will keep a leading path segment if a .. will become
                         * the first path segment, to help with module name lookups,
                         * which act like paths, but can be remapped. But the end result,
                         * all paths that use this function should look normalized.
                         * NOTE: this method MODIFIES the input array.
                         * @param {Array} ary the array of path segments.
                         */
                        function trimDots(ary) {
                            var i, part;
                            for (i = 0; ary[i]; i += 1) {
                                part = ary[i];
                                if (part === '.') {
                                    ary.splice(i, 1);
                                    i -= 1;
                                } else if (part === '..') {
                                    if (i === 1 && (ary[2] === '..' || ary[0] === '..')) {
                                        //End of the line. Keep at least one non-dot
                                        //path segment at the front so it can be mapped
                                        //correctly to disk. Otherwise, there is likely
                                        //no path mapping for a path starting with '..'.
                                        //This can still fail, but catches the most reasonable
                                        //uses of ..
                                        break;
                                    } else if (i > 0) {
                                        ary.splice(i - 1, 2);
                                        i -= 2;
                                    }
                                }
                            }
                        }

                        function normalize(name, baseName) {
                            var baseParts;

                            //Adjust any relative paths.
                            if (name && name.charAt(0) === '.') {
                                //If have a base name, try to normalize against it,
                                //otherwise, assume it is a top-level require that will
                                //be relative to baseUrl in the end.
                                if (baseName) {
                                    baseParts = baseName.split('/');
                                    baseParts = baseParts.slice(0, baseParts.length - 1);
                                    baseParts = baseParts.concat(name.split('/'));
                                    trimDots(baseParts);
                                    name = baseParts.join('/');
                                }
                            }

                            return name;
                        }

                        /**
                         * Create the normalize() function passed to a loader plugin's
                         * normalize method.
                         */
                        function makeNormalize(relName) {
                            return function(name) {
                                return normalize(name, relName);
                            };
                        }

                        function makeLoad(id) {
                            function load(value) {
                                loaderCache[id] = value;
                            }

                            load.fromText = function(id, text) {
                                //This one is difficult because the text can/probably uses
                                //define, and any relative paths and requires should be relative
                                //to that id was it would be found on disk. But this would require
                                //bootstrapping a module/require fairly deeply from node core.
                                //Not sure how best to go about that yet.
                                throw new Error('amdefine does not implement load.fromText');
                            };

                            return load;
                        }

                        makeRequire = function(systemRequire, exports, module, relId) {
                            function amdRequire(deps, callback) {
                                if (typeof deps === 'string') {
                                    //Synchronous, single module require('')
                                    return stringRequire(systemRequire, exports, module, deps, relId);
                                } else {
                                    //Array of dependencies with a callback.

                                    //Convert the dependencies to modules.
                                    deps = deps.map(function(depName) {
                                        return stringRequire(systemRequire, exports, module, depName, relId);
                                    });

                                    //Wait for next tick to call back the require call.
                                    if (callback) {
                                        process.nextTick(function() {
                                            callback.apply(null, deps);
                                        });
                                    }
                                }
                            }

                            amdRequire.toUrl = function(filePath) {
                                if (filePath.indexOf('.') === 0) {
                                    return normalize(filePath, path.dirname(module.filename));
                                } else {
                                    return filePath;
                                }
                            };

                            return amdRequire;
                        };

                        //Favor explicit value, passed in if the module wants to support Node 0.4.
                        requireFn = requireFn || function req() {
                            return module.require.apply(module, arguments);
                        };

                        function runFactory(id, deps, factory) {
                            var r, e, m, result;

                            if (id) {
                                e = loaderCache[id] = {};
                                m = {
                                    id: id,
                                    uri: __filename,
                                    exports: e
                                };
                                r = makeRequire(requireFn, e, m, id);
                            } else {
                                //Only support one define call per file
                                if (alreadyCalled) {
                                    throw new Error('amdefine with no module ID cannot be called more than once per file.');
                                }
                                alreadyCalled = true;

                                //Use the real variables from node
                                //Use module.exports for exports, since
                                //the exports in here is amdefine exports.
                                e = module.exports;
                                m = module;
                                r = makeRequire(requireFn, e, m, module.id);
                            }

                            //If there are dependencies, they are strings, so need
                            //to convert them to dependency values.
                            if (deps) {
                                deps = deps.map(function(depName) {
                                    return r(depName);
                                });
                            }

                            //Call the factory with the right dependencies.
                            if (typeof factory === 'function') {
                                result = factory.apply(m.exports, deps);
                            } else {
                                result = factory;
                            }

                            if (result !== undefined) {
                                m.exports = result;
                                if (id) {
                                    loaderCache[id] = m.exports;
                                }
                            }
                        }

                        stringRequire = function(systemRequire, exports, module, id, relId) {
                            //Split the ID by a ! so that
                            var index = id.indexOf('!'),
                                originalId = id,
                                prefix, plugin;

                            if (index === -1) {
                                id = normalize(id, relId);

                                //Straight module lookup. If it is one of the special dependencies,
                                //deal with it, otherwise, delegate to node.
                                if (id === 'require') {
                                    return makeRequire(systemRequire, exports, module, relId);
                                } else if (id === 'exports') {
                                    return exports;
                                } else if (id === 'module') {
                                    return module;
                                } else if (loaderCache.hasOwnProperty(id)) {
                                    return loaderCache[id];
                                } else if (defineCache[id]) {
                                    runFactory.apply(null, defineCache[id]);
                                    return loaderCache[id];
                                } else {
                                    if (systemRequire) {
                                        return systemRequire(originalId);
                                    } else {
                                        throw new Error('No module with ID: ' + id);
                                    }
                                }
                            } else {
                                //There is a plugin in play.
                                prefix = id.substring(0, index);
                                id = id.substring(index + 1, id.length);

                                plugin = stringRequire(systemRequire, exports, module, prefix, relId);

                                if (plugin.normalize) {
                                    id = plugin.normalize(id, makeNormalize(relId));
                                } else {
                                    //Normalize the ID normally.
                                    id = normalize(id, relId);
                                }

                                if (loaderCache[id]) {
                                    return loaderCache[id];
                                } else {
                                    plugin.load(id, makeRequire(systemRequire, exports, module, relId), makeLoad(id), {});

                                    return loaderCache[id];
                                }
                            }
                        };

                        //Create a define function specific to the module asking for amdefine.
                        function define(id, deps, factory) {
                            if (Array.isArray(id)) {
                                factory = deps;
                                deps = id;
                                id = undefined;
                            } else if (typeof id !== 'string') {
                                factory = id;
                                id = deps = undefined;
                            }

                            if (deps && !Array.isArray(deps)) {
                                factory = deps;
                                deps = undefined;
                            }

                            if (!deps) {
                                deps = ['require', 'exports', 'module'];
                            }

                            //Set up properties for this module. If an ID, then use
                            //internal cache. If no ID, then use the external variables
                            //for this node module.
                            if (id) {
                                //Put the module in deep freeze until there is a
                                //require call for it.
                                defineCache[id] = [id, deps, factory];
                            } else {
                                runFactory(id, deps, factory);
                            }
                        }

                        //define.require, which has access to all the values in the
                        //cache. Useful for AMD modules that all have IDs in the file,
                        //but need to finally export a value to node based on one of those
                        //IDs.
                        define.require = function(id) {
                            if (loaderCache[id]) {
                                return loaderCache[id];
                            }

                            if (defineCache[id]) {
                                runFactory.apply(null, defineCache[id]);
                                return loaderCache[id];
                            }
                        };

                        define.amd = {};

                        return define;
                    }

                    module.exports = amdefine;

                }).call(this)
            }).call(this, require('_process'), "/node_modules/amdefine/amdefine.js")
        }, { "_process": 2, "path": 1 }], 5: [function(require, module, exports) {
            if (typeof define !== 'function') { var define = require('amdefine')(module); }
            define(['./lib/freeze', './lib/Iuppiter'], function(freeze, Iuppiter) {
                'use strict';

                return freeze({
                    version: "0.0.1",
                    compressFile: Iuppiter.compressFile,
                    decompressFile: Iuppiter.decompressFile
                });
            });

        }, { "amdefine": 4 }]
    }, {}, [3])(3)
});
