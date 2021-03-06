/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
!function (e) {
    "use strict";
    function t(e, t) {
        return e.length >= t.length && e.substr(0, t.length) === t
    }

    function n(e, t) {
        return e.length >= t.length && e.substr(e.length - t.length) === t
    }

    function r(e) {
        this.options = e || {}, this.options.baseUrl || (this.options.baseUrl = ""), this.options.baseUrl.length > 0 && (n(this.options.baseUrl, "/") || (this.options.baseUrl += "/")), this.options.paths || (this.options.paths = {}), this.options.shim || (this.options.shim = {}), "undefined" == typeof this.options.catchError && (this.options.catchError = !1), "undefined" == typeof this.options.urlArgs && (this.options.urlArgs = ""), "undefined" == typeof this.options.onError && (this.options.onError = y), this.options.ignoreDuplicateModules || (this.options.ignoreDuplicateModules = []), this.ignoreDuplicateModulesMap = {};
        for (var t = 0; t < this.options.ignoreDuplicateModules.length; t++)this.ignoreDuplicateModulesMap[this.options.ignoreDuplicateModules[t]] = !0
    }

    function i(e) {
        if (!e || "object" != typeof e)return e;
        var t, n, r = e instanceof Array ? [] : {};
        for (t in e)e.hasOwnProperty(t) && (n = e[t], r[t] = n && "object" == typeof n ? i(n) : n);
        return r
    }

    function o(e, t) {
        if (!t || "object" != typeof t)return e;
        for (var n in t)t.hasOwnProperty(n) && (e[n] = t[n]);
        return e
    }

    function s(e, t) {
        this._config = e, this.fromModuleId = t, this.fromModulePath = this._pathOf(this.fromModuleId)
    }

    function a(e, t, n, r) {
        this._id = e, this._dependencies = t, this._dependenciesValues = [], this._callback = n, this._moduleIdResolver = r, this._exports = {}, this._exportsPassedIn = !1, this._digestDependencies(), 0 === this._unresolvedDependenciesCount && this._complete()
    }

    function l(e) {
        this._defaultConfig = new r, this._scriptLoader = e, this._modules = {}, this._knownModules = {}, this._inverseDependencies = {}, this._dependencies = {}, this._inversePluginDependencies = {}, this._queuedDefineCalls = [], this._loadingScriptsCount = 0
    }

    function u() {
    }

    function c() {
        this.loadCalls = [], this.loadTimeout = -1
    }

    function p(e, t, n) {
        "string" != typeof e && (n = t, t = e, e = null), "object" == typeof t && t instanceof Array || (n = t, t = null), t || (t = []), e ? T.enqueueDefineModule(e, t, n) : T.enqueueDefineAnonymousModule(t, n)
    }

    function h(e, t) {
        if (t)T.setConfig(new r(e)); else {
            var n = T.getConfig();
            T.setConfig(n.cloneAndMerge(e))
        }
    }

    function d() {
        if (1 === arguments.length) {
            if (arguments[0]instanceof Object && !(arguments[0]instanceof Array))return h(arguments[0]), void 0;
            if ("string" == typeof arguments[0])return T.synchronousRequire(arguments[0])
        }
        if (2 === arguments.length && arguments[0]instanceof Array)return T.defineModule(f(), arguments[0], arguments[1]), void 0;
        throw new Error("Unrecognized require call")
    }

    if ("function" != typeof e.define || !e.define.amd) {
        var f = function () {
            var e = 1;
            return function () {
                return"===anonymous" + e++ + "==="
            }
        }(), m = function (e) {
            return 0 === e.indexOf("===anonymous")
        }, g = "function" == typeof e.importScripts;
        e.console || (e.console = {}), e.console.log || (e.console.log = function () {
        }), e.console.debug || (e.console.debug = e.console.log), e.console.info || (e.console.info = e.console.log), e.console.warn || (e.console.warn = e.console.log), e.console.error || (e.console.error = e.console.log);
        var y = function (e) {
            return"load" === e.errorCode ? (console.error('Loading "' + e.moduleId + '" failed'), console.error("Detail: ", e.detail), console.error("Here are the modules that depend on it:"), console.error(e.neededBy), void 0) : "factory" === e.errorCode ? (console.error('The factory method of "' + e.moduleId + '" has thrown an exception'), console.error(e.detail), void 0) : void 0
        };
        r.prototype.getOptionsLiteral = function () {
            return this.options
        }, r.prototype._applyPaths = function (e) {
            for (var n in this.options.paths)if (this.options.paths.hasOwnProperty(n) && t(e, n))return this.options.paths[n] + e.substr(n.length);
            return e
        }, r.prototype.addUrlArgsIfNecessary = function (e) {
            if (this.options.urlArgs) {
                var t = e.indexOf("?") >= 0;
                return t ? e + "&" + this.options.urlArgs : e + "?" + this.options.urlArgs
            }
            return e
        }, r.prototype.moduleIdToPath = function (e) {
            var r = null;
            return n(e, ".js") ? r = e : (e = this._applyPaths(e) + ".js", r = t(e, "http://") || t(e, "https://") ? e : this.options.baseUrl + e), this.addUrlArgsIfNecessary(r)
        }, r.prototype.requireToUrl = function (e) {
            return this.addUrlArgsIfNecessary(this.options.baseUrl + this._applyPaths(e))
        }, r.prototype.isShimmed = function (e) {
            return this.options.shim.hasOwnProperty(e)
        }, r.prototype.cloneAndMerge = function (e) {
            e = e || {};
            var t = i(this.options);
            return("" === e.baseUrl || e.baseUrl) && (t.baseUrl = e.baseUrl), o(t.paths, e.paths), o(t.shim, e.shim), "undefined" != typeof e.catchError && (t.catchError = e.catchError), "undefined" != typeof e.urlArgs && (t.urlArgs = e.urlArgs), "undefined" != typeof e.onError && (t.onError = e.onError), e.ignoreDuplicateModules && t.ignoreDuplicateModules.push.apply(t.ignoreDuplicateModules, e.ignoreDuplicateModules), new r(t)
        }, r.prototype.getShimmedModuleDefine = function (t) {
            var n = this.options.shim[t];
            if (!n)return null;
            var r = {};
            return n instanceof Array ? r.dependencies = n : (r.dependencies = n.deps || [], r.callback = n.exports ? n.exports instanceof Function ? n.exports : n.exports instanceof String ? function () {
                return e[n.exports]
            } : {} : {}), r
        }, r.prototype.isDuplicateMessageIgnoredFor = function (e) {
            return this.ignoreDuplicateModulesMap.hasOwnProperty(e)
        }, r.prototype.shouldCatchError = function () {
            return!!this.options.catchError
        }, r.prototype.onError = function (e) {
            this.options.onError(e)
        }, s.prototype._pathOf = function (e) {
            var t = e.lastIndexOf("/");
            return-1 !== t ? e.substr(0, t + 1) : ""
        }, s.prototype._normalizePath = function (e) {
            for (; t(e, "/../");)e = e.substr(3);
            for (var n = e.length > 0 && "/" === e.charAt(0), r = e.split("/"), i = 0; i < r.length; i++)"." === r[i] || "" === r[i] ? (r.splice(i, 1), i--) : i > 0 && ".." === r[i] && ".." !== r[i - 1] && (r.splice(i - 1, 2), i -= 2);
            return(n ? "/" : "") + r.join("/")
        }, s.prototype._normalizeModuleId = function (e) {
            var n = e, r = t(n, "http://"), i = t(n, "https://"), o = "";
            if (i || r) {
                n = i ? n.substr(8) : n.substr(7);
                var s = n.indexOf("/");
                s >= 0 && (o = n.substring(0, s), n = n.substr(s))
            }
            var a = "";
            return i ? a += "https://" : r && (a += "http://"), a += o, a += this._normalizePath(n)
        }, s.prototype.resolveModule = function (e) {
            var n = null;
            return n = t(e, "./") || t(e, "../") ? this.fromModulePath + e : e, this._normalizeModuleId(n)
        }, s.prototype.moduleIdToPath = function (e) {
            return this._config.moduleIdToPath(e)
        }, s.prototype.requireToUrl = function (e) {
            return this._config.requireToUrl(e)
        }, s.prototype.shouldCatchError = function () {
            return this._config.shouldCatchError()
        }, s.prototype.onError = function (e) {
            this._config.onError(e)
        }, a.prototype._digestDependencies = function () {
            this._unresolvedDependenciesCount = this._dependencies.length, this._managerDependencies = [], this._managerDependenciesMap = {};
            var e, t, n;
            for (e = 0, t = this._dependencies.length; t > e; e++)if (n = this._dependencies[e])if ("exports" === n)this._exportsPassedIn = !0, this._dependenciesValues[e] = this._exports, this._unresolvedDependenciesCount--; else if ("module" === n)this._dependenciesValues[e] = {id: this._id}, this._unresolvedDependenciesCount--; else if ("require" === n)this._managerDependencies.push(n), this._managerDependenciesMap[n] = e; else {
                var r = n.indexOf("!");
                if (r >= 0) {
                    var i = n.substring(0, r), o = n.substring(r + 1, n.length);
                    n = this._moduleIdResolver.resolveModule(i) + "!" + o
                } else n = this._moduleIdResolver.resolveModule(n);
                this._managerDependencies.push(n), this._managerDependenciesMap[n] = e
            } else console.warn("Please check module " + this._id + ", the dependency list looks broken"), this._dependenciesValues[e] = null, this._unresolvedDependenciesCount--
        }, a.prototype.renameDependency = function (e, t) {
            if (!this._managerDependenciesMap.hasOwnProperty(e))throw new Error("Loader: Cannot rename an unknown dependency!");
            var n = this._managerDependenciesMap[e];
            delete this._managerDependenciesMap[e], this._managerDependenciesMap[t] = n
        }, a.prototype.getId = function () {
            return this._id
        }, a.prototype.getModuleIdResolver = function () {
            return this._moduleIdResolver
        }, a.prototype.isExportsPassedIn = function () {
            return this._exportsPassedIn
        }, a.prototype.getExports = function () {
            return this._exports
        }, a.prototype.getDependencies = function () {
            return this._managerDependencies
        }, a.prototype._complete = function () {
            var t = null;
            if (this._callback)if ("function" == typeof this._callback) {
                var n;
                if (this._moduleIdResolver.shouldCatchError())try {
                    n = this._callback.apply(e, this._dependenciesValues), this._exportsPassedIn || (this._exports = n)
                } catch (r) {
                    t = r
                } else n = this._callback.apply(e, this._dependenciesValues), this._exportsPassedIn || (this._exports = n)
            } else this._exports = this._callback;
            t && this.getModuleIdResolver().onError({errorCode: "factory", moduleId: this._id, detail: t})
        }, a.prototype.cleanUp = function () {
            this._dependencies = null, this._dependenciesValues = null, this._callback = null, this._moduleIdResolver = null, this._managerDependencies = null, this._managerDependenciesMap = null
        }, a.prototype.resolveDependency = function (e, t) {
            if (!this._managerDependenciesMap.hasOwnProperty(e))throw new Error("Cannot resolve a dependency I do not have!");
            this._dependenciesValues[this._managerDependenciesMap[e]] = t, this._unresolvedDependenciesCount--, 0 === this._unresolvedDependenciesCount && this._complete()
        }, a.prototype.isComplete = function () {
            return 0 === this._unresolvedDependenciesCount
        }, l.prototype.enqueueDefineModule = function (e, t, n) {
            0 === this._loadingScriptsCount ? this.defineModule(e, t, n) : this._queuedDefineCalls.push({id: e, dependencies: t, callback: n})
        }, l.prototype.enqueueDefineAnonymousModule = function (e, t) {
            this._queuedDefineCalls.push({id: null, dependencies: e, callback: t})
        }, l.prototype.defineModule = function (e, t, n, r) {
            if (this._modules.hasOwnProperty(e))return this._defaultConfig.isDuplicateMessageIgnoredFor(e) || console.warn("Duplicate definition of module '" + e + "'"), void 0;
            var i = new a(e, t, n, r || new s(this._defaultConfig, e));
            this._modules[e] = i, this._resolve(i)
        }, l.prototype._relativeRequire = function (e, t, n) {
            return"string" == typeof t ? this.synchronousRequire(t, e) : (this.defineModule(f(), t, n, e), void 0)
        }, l.prototype.synchronousRequire = function (e, t) {
            t = t || new s(this._defaultConfig, e);
            var n = t.resolveModule(e);
            if (!this._modules.hasOwnProperty(n))throw new Error("Check dependency list! Synchronous require cannot resolve module '" + n + "'. This is the first mention of this module!");
            var r = this._modules[n];
            if (!r.isComplete())throw new Error("Check dependency list! Synchronous require cannot resolve module '" + n + "'. This module has not been resolved completely yet.");
            return r.getExports()
        }, l.prototype.setConfig = function (e) {
            this._defaultConfig = e
        }, l.prototype.getConfig = function () {
            return this._defaultConfig
        }, l.prototype._onLoad = function (e) {
            var t;
            if (this._loadingScriptsCount--, this._defaultConfig.isShimmed(e))t = this._defaultConfig.getShimmedModuleDefine(e), this.defineModule(e, t.dependencies, t.callback); else if (0 === this._queuedDefineCalls.length)console.warn("No define call received from module " + e + ". This might be a problem."); else for (; this._queuedDefineCalls.length > 0;) {
                if (t = this._queuedDefineCalls.shift(), t.id === e || null === t.id) {
                    t.id = e, this.defineModule(t.id, t.dependencies, t.callback);
                    break
                }
                this.defineModule(t.id, t.dependencies, t.callback)
            }
            if (0 === this._loadingScriptsCount)for (; this._queuedDefineCalls.length > 0;)t = this._queuedDefineCalls.shift(), null === t.id ? console.warn("Found an unmatched anonymous define call in the define queue. Ignoring it!") : this.defineModule(t.id, t.dependencies, t.callback)
        }, l.prototype._onLoadError = function (e, t) {
            this._loadingScriptsCount--, this.getConfig().onError({errorCode: "load", moduleId: e, neededBy: this._inverseDependencies[e] ? this._inverseDependencies[e].slice(0) : [], detail: t})
        }, l.prototype._onModuleComplete = function (e, t) {
            var n, r, i, o, s;
            if (this._inverseDependencies.hasOwnProperty(e))for (i = this._inverseDependencies[e], delete this._inverseDependencies[e], n = 0, r = i.length; r > n; n++)o = i[n], s = this._modules[o], s.resolveDependency(e, t), s.isComplete() && this._onModuleComplete(o, s.getExports());
            if (this._inversePluginDependencies.hasOwnProperty(e))for (i = this._inversePluginDependencies[e], delete this._inversePluginDependencies[e], n = 0, r = i.length; r > n; n++)this._resolvePluginDependencySync(i[n].moduleId, i[n].dependencyId, t);
            m(e) ? (delete this._modules[e], delete this._dependencies[e]) : this._modules[e].cleanUp()
        }, l.prototype._hasDependencyPath = function (e, t) {
            var n, r, i, o, s, a = {}, l = [];
            for (l.push(e), a[e] = !0; l.length > 0;)if (i = l.shift(), this._dependencies.hasOwnProperty(i))for (o = this._dependencies[i], n = 0, r = o.length; r > n; n++) {
                if (s = o[n], s === t)return!0;
                a.hasOwnProperty(s) || (a[s] = !0, l.push(s))
            }
            return!1
        }, l.prototype._findCyclePath = function (e, t, n) {
            if (e === t || 50 === n)return[e];
            if (!this._dependencies.hasOwnProperty(e))return null;
            for (var r, i = this._dependencies[e], o = 0, s = i.length; s > o; o++)if (r = this._findCyclePath(i[o], t, n + 1), null !== r)return r.push(e), r;
            return null
        }, l.prototype._createRequire = function (e) {
            var t = this._relativeRequire.bind(this, e);
            return t.toUrl = function (t) {
                return e.requireToUrl(e.resolveModule(t))
            }, t
        }, l.prototype._resolvePluginDependencySync = function (e, t, n) {
            var r = this._modules[e], i = r.getModuleIdResolver(), o = t.indexOf("!"), s = t.substring(0, o), a = t.substring(o + 1, t.length), l = function (e) {
                return i.resolveModule(e)
            }.bind(this);
            a = "function" == typeof n.normalize ? n.normalize(a, l) : l(a);
            var u = t;
            t = s + "!" + a, r.renameDependency(u, t);
            var c = function () {
                var e = this._createRequire(i), r = function (e) {
                    this.defineModule(t, [], e)
                }.bind(this);
                r.error = function (e) {
                    this.getConfig().onError({errorCode: "load", moduleId: t, neededBy: this._inverseDependencies[t] ? this._inverseDependencies[t].slice(0) : [], detail: e})
                }.bind(this), n.load(a, e, r, this._defaultConfig.getOptionsLiteral())
            }.bind(this);
            this._resolveDependency(e, t, c)
        }, l.prototype._resolvePluginDependencyAsync = function (e, t) {
            var n = this._modules[e], r = t.indexOf("!"), i = t.substring(0, r);
            this._inversePluginDependencies[i] = this._inversePluginDependencies[i] || [], this._inversePluginDependencies[i].push({moduleId: e, dependencyId: t}), this._modules.hasOwnProperty(i) || this._knownModules.hasOwnProperty(i) || (this._knownModules[i] = !0, this._loadModule(n.getModuleIdResolver(), i))
        }, l.prototype._resolvePluginDependency = function (e, t) {
            var n = t.indexOf("!"), r = t.substring(0, n);
            this._modules.hasOwnProperty(r) && this._modules[r].isComplete() ? this._resolvePluginDependencySync(e, t, this._modules[r].getExports()) : this._resolvePluginDependencyAsync(e, t)
        }, l.prototype._injectedShimModuleFactory = function (e, t) {
            t(e)
        }, l.prototype._resolveShimmedDependency = function (e, t, n) {
            var r = this._defaultConfig.getShimmedModuleDefine(t);
            r.dependencies.length > 0 ? this.defineModule(f(), r.dependencies, this._injectedShimModuleFactory.bind(this, t, n), new s(this._defaultConfig, t)) : n(t)
        }, l.prototype._resolveDependency = function (e, t, n) {
            var r = this._modules[e];
            if (this._modules.hasOwnProperty(t) && this._modules[t].isComplete())r.resolveDependency(t, this._modules[t].getExports()); else if (this._dependencies[e].push(t), this._hasDependencyPath(t, e)) {
                console.warn("There is a dependency cycle between '" + t + "' and '" + e + "'. The cyclic path follows:");
                var i = this._findCyclePath(t, e, 0);
                i.reverse(), i.push(t), console.warn(i.join(" => \n"));
                var o, s = this._modules.hasOwnProperty(t) ? this._modules[t] : null;
                s && s.isExportsPassedIn() && (o = s.getExports()), r.resolveDependency(t, o)
            } else this._inverseDependencies[t] = this._inverseDependencies[t] || [], this._inverseDependencies[t].push(e), this._modules.hasOwnProperty(t) || this._knownModules.hasOwnProperty(t) || (this._knownModules[t] = !0, this._defaultConfig.isShimmed(t) ? this._resolveShimmedDependency(e, t, n) : n(t))
        }, l.prototype._loadModule = function (e, t) {
            this._loadingScriptsCount++, this._scriptLoader.load(e.moduleIdToPath(t), this._onLoad.bind(this, t), this._onLoadError.bind(this, t))
        }, l.prototype._resolve = function (e) {
            var t, n, r, i, o, s;
            for (r = e.getId(), i = e.getDependencies(), s = e.getModuleIdResolver(), this._dependencies[r] = [], t = 0, n = i.length; n > t; t++)o = i[t], "require" !== o ? o.indexOf("!") >= 0 ? this._resolvePluginDependency(r, o) : this._resolveDependency(r, o, this._loadModule.bind(this, s)) : e.resolveDependency(o, this._createRequire(s));
            e.isComplete() && this._onModuleComplete(r, e.getExports())
        }, u.prototype.attachListeners = function () {
            return e.attachEvent ? function (e, t, n) {
                var r = null, i = null, o = function () {
                    e.detachEvent("onreadystatechange", r), e.addEventListener && e.removeEventListener("error", i)
                };
                r = function () {
                    ("loaded" === e.readyState || "complete" === e.readyState) && (o(), t())
                }, i = function (e) {
                    o(), n(e)
                }, e.attachEvent("onreadystatechange", r), e.addEventListener && e.addEventListener("error", i)
            } : function (e, t, n) {
                var r = null, i = null, o = function () {
                    e.removeEventListener("load", r), e.removeEventListener("error", i)
                };
                r = function () {
                    o(), t()
                }, i = function (e) {
                    o(), n(e)
                }, e.addEventListener("load", r), e.addEventListener("error", i)
            }
        }(), u.prototype.load = function (e, t, n) {
            var r = document.createElement("script");
            r.setAttribute("async", "async"), r.setAttribute("type", "text/javascript"), this.attachListeners(r, t, n), r.setAttribute("src", e), document.getElementsByTagName("head")[0].appendChild(r)
        }, c.prototype.load = function (e, t, n) {
            this.loadCalls.push({scriptSrc: e, callback: t, errorback: n}), navigator.userAgent.indexOf("Firefox") >= 0 ? this._load() : -1 === this.loadTimeout && (this.loadTimeout = setTimeout(this._load.bind(this), 0))
        }, c.prototype._load = function () {
            this.loadTimeout = -1;
            var e = this.loadCalls;
            this.loadCalls = [];
            var t, n = e.length, r = [];
            for (t = 0; n > t; t++)r.push(e[t].scriptSrc);
            try {
                for (importScripts.apply(null, r), t = 0; n > t; t++)e[t].callback()
            } catch (i) {
                for (t = 0; n > t; t++)e[t].errorback(i)
            }
        };
        var v = g ? new c : new u, T = new l(v);
        d.config = h, g || (window.onload = function () {
            var e, t, n, i, o = document.getElementsByTagName("script");
            for (e = 0, t = o.length; t > e && (n = o[e], !(i = n.getAttribute("data-main"))); e++);
            i && T.defineModule(f(), [i], null, new s(new r, ""))
        }), p.amd = {jQuery: !0}, e.define = p, "undefined" != typeof e.require && "[object Function]" !== Object.prototype.toString.call(e.require) && d.config(e.require), e.require = d
    }
}(this), function (e) {
    "use strict";
    function t(e, t) {
        var n = e.replace(/\{(\d+)\}/g, function (e, n) {
            var r = n[0];
            return"undefined" != typeof t[r] ? t[r] : e
        });
        return self && self.document && self.document.URL.match(/[^\?]*\?[^\#]*pseudo=true/) && (n = "［" + n.replace(/[aouei]/g, "$&$&") + "］"), n
    }

    function n(e, t) {
        var n = e[t];
        return n ? n : (n = e["*"], n ? n : null)
    }

    function r(e, n) {
        for (var r = [], i = 0; i < arguments.length - 2; i++)r[i] = arguments[i + 2];
        return t(n, r)
    }

    var i = e.Plugin && e.Plugin.Resources ? e.Plugin.Resources : void 0, o = "i-default";
    define("vs/nls", {load: function (e, s, a, l) {
        if (l = l || {}, !e || 0 === e.length || l.isBuild)a({localize: r}); else {
            var u;
            if (i)u = ".nls.keys", s([e + u], function (e) {
                a({localize: function (t, n) {
                    for (var r = [], o = 0; o < arguments.length - 2; o++)r[o] = arguments[o + 2];
                    if (!e[t])return"NLS error: unkown key " + t;
                    var s = e[t];
                    if (n >= s.length)return"NLS error unknow index " + n;
                    var a = s[n];
                    return i.getString(t + "_" + a, r)
                }})
            }); else {
                var c = l["vs/nls"] || {}, p = c.availableLanguages ? n(c.availableLanguages, e) : null;
                u = ".nls", null !== p && p !== o && (u = u + "." + p), s([e + u], function (e) {
                    a({localize: function (n, r) {
                        for (var i = [], o = 0; o < arguments.length - 2; o++)i[o] = arguments[o + 2];
                        if (!e[n])return"NLS error: unkown key " + n;
                        var s = e[n];
                        return r >= s.length ? "NLS error unknow index " + r : t(s[r], i)
                    }})
                })
            }
        }
    }, localize: r})
}(this), function (e) {
    "use strict";
    function t() {
        this._pendingLoads = 0
    }

    function n() {
        t.call(this), this._blockedLoads = [], this._mergeStyleSheetsTimeout = -1
    }

    function r() {
        n.call(this)
    }

    function i() {
        this.fs = require.nodeRequire("fs")
    }

    function o(e, t, n) {
        return n.replace(/url\(\s*([^\)]+)\s*\)?/g, function (n, r) {
            if (('"' === r.charAt(0) || "'" === r.charAt(0)) && (r = r.substring(1)), ('"' === r.charAt(r.length - 1) || "'" === r.charAt(r.length - 1)) && (r = r.substring(0, r.length - 1)), !s(r, "/") && !s(r, "http://") && !s(r, "https://")) {
                var i = h(a(e) + r);
                r = c(t, i)
            }
            return"url(" + r + ")"
        })
    }

    function s(e, t) {
        return e.length >= t.length && e.substr(0, t.length) === t
    }

    function a(e) {
        var t = e.lastIndexOf("/");
        return-1 !== t ? e.substr(0, t + 1) : ""
    }

    function l(e, t) {
        var n, r, i;
        for (n = 0, r = e.length, i = t.length; r > n && i > n; n++)if (e[n] !== t[n])return e.substring(0, n);
        return e.substring(0, Math.min(r, i))
    }

    function u(e, t) {
        var n = l(e, t), r = n.lastIndexOf("/");
        return-1 === r ? "" : n.substring(0, r + 1)
    }

    function c(e, t) {
        var n = u(e, t);
        e = e.substr(n.length), t = t.substr(n.length);
        for (var r = e.split("/").length, i = "", o = 1; r > o; o++)i += "../";
        return i += t
    }

    function p(e) {
        for (; s(e, "/../");)e = e.substr(3);
        for (var t = s(e, "/"), n = e.split("/"), r = 0; r < n.length; r++)"." === n[r] || "" === n[r] ? (n.splice(r, 1), r--) : r > 0 && ".." === n[r] && ".." !== n[r - 1] && (n.splice(r - 1, 2), r -= 2);
        return(t ? "/" : "") + n.join("/")
    }

    function h(e) {
        var t = e, n = s(t, "http://"), r = s(t, "https://"), i = "";
        if (r || n) {
            t = r ? t.substr(8) : t.substr(7);
            var o = t.indexOf("/");
            o >= 0 && (i = t.substring(0, o), t = t.substr(o))
        }
        var a = "";
        return r ? a += "https://" : n && (a += "http://"), a += i, a += p(t)
    }

    var d = 65279;
    t.prototype.attachListeners = function (e, t, n, r) {
        var i = null, o = null, s = function () {
            t.removeEventListener("load", i), t.removeEventListener("error", o)
        };
        i = function () {
            s(), n()
        }, o = function (e) {
            s(), r(e)
        }, t.addEventListener("load", i), t.addEventListener("error", o)
    }, t.prototype._onLoad = function (e, t) {
        this._pendingLoads--, t()
    }, t.prototype._onLoadError = function (e, t) {
        this._pendingLoads--, t()
    }, t.prototype._insertLinkNode = function (e) {
        this._pendingLoads++;
        var t = document.head || document.getElementsByTagName("head")[0], n = t.getElementsByTagName("link") || document.head.getElementsByTagName("script");
        n.length > 0 ? t.insertBefore(e, n[n.length - 1]) : t.appendChild(e)
    }, t.prototype.createLinkTag = function (e, t, n, r) {
        var i = document.createElement("link");
        i.setAttribute("rel", "stylesheet"), i.setAttribute("type", "text/css"), i.setAttribute("data-name", e);
        var o = this._onLoad.bind(this, e, n), s = this._onLoadError.bind(this, e, r);
        return this.attachListeners(e, i, o, s), i.setAttribute("href", t), i
    }, t.prototype._linkTagExists = function (e, t) {
        var n, r, i, o, s = document.getElementsByTagName("link");
        for (n = 0, r = s.length; r > n; n++)if (i = s[n].getAttribute("data-name"), o = s[n].getAttribute("href"), i === e || o === t)return!0;
        return!1
    }, t.prototype.load = function (e, t, n, r) {
        if (this._linkTagExists(e, t))return n(), void 0;
        var i = this.createLinkTag(e, t, n, r);
        this._insertLinkNode(i)
    }, n.prototype = new t, n.prototype.load = function (e, t, n, r) {
        if (this._linkTagExists(e, t))return n(), void 0;
        var i = this.createLinkTag(e, t, n, r);
        this._styleSheetCount() < 31 ? this._insertLinkNode(i) : (this._blockedLoads.push(i), this._handleBlocked())
    }, n.prototype._styleSheetCount = function () {
        var e = document.getElementsByTagName("link").length, t = document.getElementsByTagName("style").length;
        return e + t
    }, n.prototype._onLoad = function (e, n) {
        t.prototype._onLoad.call(this, e, n), this._handleBlocked()
    }, n.prototype._onLoadError = function (e, n) {
        t.prototype._onLoadError.call(this, e, n), this._handleBlocked()
    }, n.prototype._handleBlocked = function () {
        var e = this._blockedLoads.length;
        e > 0 && -1 === this._mergeStyleSheetsTimeout && (this._mergeStyleSheetsTimeout = window.setTimeout(this._mergeStyleSheets.bind(this), 0))
    }, n.prototype._mergeStyleSheet = function (e, t, n, r) {
        for (var i = 0; i < r.rules.length; i++)t.insertRule(o(n, e, r.rules[i].cssText), r.rules.length)
    }, n.prototype._mergeStyleSheets = function () {
        this._mergeStyleSheetsTimeout = -1;
        var e, t = this._blockedLoads.length, n = document.getElementsByTagName("link"), r = n.length, i = [];
        for (e = 0; r > e; e++)("loaded" === n[e].readyState || "complete" === n[e].readyState) && i.push({linkNode: n[e], rulesLength: n[e].styleSheet.rules.length});
        var o = i.length, s = Math.min(o / 2, t);
        i.sort(function (e, t) {
            return t.rulesLength - e.rulesLength
        });
        var a, l;
        for (e = 0; s > e; e++)a = i.length - 1 - e, l = e % (i.length - s), this._mergeStyleSheet(i[l].linkNode.href, i[l].linkNode.styleSheet, i[a].linkNode.href, i[a].linkNode.styleSheet), i[a].linkNode.parentNode.removeChild(i[a].linkNode), r--;
        for (var u = this._styleSheetCount(); 31 > u && this._blockedLoads.length > 0;)this._insertLinkNode(this._blockedLoads.shift()), u++
    }, r.prototype = new n, r.prototype.attachListeners = function (e, t, n) {
        t.onload = function () {
            t.onload = null, n()
        }
    }, i.prototype.load = function (e, t, n) {
        var r = this.fs.readFileSync(t, "utf8");
        r.charCodeAt(0) === d && (r = r.substring(1)), n(r)
    };
    var f = null;
    f = "undefined" != typeof process && process.versions && process.versions.node ? new i : navigator.userAgent.indexOf("MSIE 9") >= 0 ? new n : navigator.userAgent.indexOf("MSIE 8") >= 0 ? new r : new t;
    var m = {};
    define("vs/css", {load: function (e, t, n, r) {
        r = r || {};
        var i = t.toUrl(e + ".css");
        f.load(e, i, function (t) {
            r.isBuild && (m[e] = t), n()
        }, function () {
            "function" == typeof n.error && n.error("Could not find " + i + " or it was empty")
        })
    }, write: function (t, n, r) {
        var i = r.getEntryPoint();
        e.entryPoints = e.entryPoints || {}, e.entryPoints[i] = e.entryPoints[i] || [], e.entryPoints[i].push({moduleName: n, contents: m[n]}), r.asModule(t + "!" + n, "define(['vs/css!" + i + "'], {});")
    }, _rewriteUrls: function (e, t, n) {
        return o(e, t, n)
    }, writeFile: function (t, n, r, i) {
        if (e.entryPoints && e.entryPoints.hasOwnProperty(n)) {
            for (var o = r.toUrl(n + ".css"), s = ["/*---------------------------------------------------------", " * Copyright (C) Microsoft Corporation. All rights reserved.", " *--------------------------------------------------------*/"], a = e.entryPoints[n], l = 0; l < a.length; l++)s.push(this._rewriteUrls(a[l].moduleName, n, a[l].contents));
            i(o, s.join("\r\n"))
        }
    }})
}(this), function () {
    "use strict";
    function e() {
    }

    function t() {
        this.fs = require.nodeRequire("fs")
    }

    function n(e) {
        for (var t, n = "\b".charCodeAt(0), r = "\f".charCodeAt(0), i = "\n".charCodeAt(0), o = 0, s = "\r".charCodeAt(0), a = "	".charCodeAt(0), l = "".charCodeAt(0), u = "\\".charCodeAt(0), c = '"'.charCodeAt(0), p = 0, h = null, d = [], f = 0, m = e.length; m > f; f++) {
            switch (t = e.charCodeAt(f)) {
                case n:
                    h = "\\b";
                    break;
                case r:
                    h = "\\f";
                    break;
                case i:
                    h = "\\n";
                    break;
                case o:
                    h = "\\0";
                    break;
                case s:
                    h = "\\r";
                    break;
                case a:
                    h = "\\t";
                    break;
                case l:
                    h = "\\v";
                    break;
                case u:
                    h = "\\\\";
                    break;
                case c:
                    h = '\\"'
            }
            null !== h && (d.push(e.substring(p, f)), d.push(h), p = f + 1, h = null)
        }
        return d.push(e.substring(p, m)), d.join("")
    }

    var r = 65279;
    e.prototype.load = function (e, t, n, r) {
        var i = new XMLHttpRequest;
        i.onreadystatechange = function () {
            4 === i.readyState && (i.status >= 200 && i.status < 300 || 1223 === i.status ? n(i.responseText) : r(i), i.onreadystatechange = function () {
            })
        }, i.open("GET", t, !0), i.responseType = "", i.setRequestHeader("X-Requested-With", "XMLHttpRequest"), i.send(null)
    }, t.prototype.load = function (e, t, n) {
        var i = this.fs.readFileSync(t, "utf8");
        i.charCodeAt(0) === r && (i = i.substring(1)), n(i)
    };
    var i = null;
    i = "undefined" != typeof process && process.versions && process.versions.node ? new t : new e;
    var o = {};
    define("vs/text", {load: function (e, t, n, r) {
        r = r || {};
        var s = t.toUrl(e);
        i.load(e, s, function (t) {
            r.isBuild && (o[e] = t), n(t)
        }, function () {
            "function" == typeof n.error && n.error("Could not find " + s)
        })
    }, write: function (e, t, r) {
        if (o.hasOwnProperty(t)) {
            var i = n(o[t]);
            r('define("' + e + "!" + t + '", function () { return "' + i + '"; });')
        }
    }})
}(this);