/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
define("vs/base/lifecycle", ["require", "exports"], function (e, t) {
    "use strict";
    function n(e) {
        for (var t = 0, n = e.length; n > t; t++)e[t].dispose();
        return[]
    }

    function r() {
        for (var e = [], n = 0; n < arguments.length - 0; n++)e[n] = arguments[n + 0];
        return{dispose: function () {
            return t.disposeAll(e)
        }}
    }

    function i(e) {
        for (; e.length > 0;)e.pop()()
    }

    t.disposeAll = n, t.combinedDispose = r, t.cAll = i
}), define("vs/languages/typescript/service/textEdit", ["require", "exports", "vs/base/strings"], function (e, t, n) {
    "use strict";
    function r(e) {
        return new s(e)
    }

    var i = n, o = function () {
        function e(e, t, n) {
            this.offset = e, this.length = t, this.text = n || "", this.parent = null, this.children = []
        }

        return e.prototype.isNoop = function () {
            return 0 === this.length && 0 === this.text.length
        }, e.prototype.isDelete = function () {
            return this.length > 0 && 0 === this.text.length
        }, e.prototype.isInsert = function () {
            return 0 === this.length && this.text.length > 0
        }, e.prototype.isReplace = function () {
            return this.length > 0 && this.text.length > 0
        }, e.prototype.getRightMostChild = function () {
            var e = this.children.length;
            return 0 === e ? this : this.children[e - 1].getRightMostChild()
        }, e.prototype.remove = function () {
            return this.parent ? this.parent.removeChild(this) : !1
        }, e.prototype.addChild = function (e) {
            e.parent = this;
            var t, n;
            for (t = 0, n = this.children.length; n > t && !(this.children[t].offset > e.offset); t++);
            this.children.splice(t, 0, e)
        }, e.prototype.removeChild = function (e) {
            var t = this.children.indexOf(e);
            return-1 === t ? !1 : (e.parent = null, this.children.splice(t, 1), !0)
        }, e.prototype.insert = function (e) {
            if (this.enclosedBy(e))return e.insert(this), e;
            var t, n, r;
            for (t = 0, n = this.children.length; n > t; t++)if (r = this.children[t], r.enclosedBy(e))this.removeChild(r), e.insert(r), n--, t--; else if (r.encloses(e))return r.insert(e), this;
            return this.addChild(e), this
        }, e.prototype.enclosedBy = function (e) {
            return e.encloses(this)
        }, e.prototype.encloses = function (e) {
            if (this.offset === this.offset && this.length === e.length)return!1;
            var t = this.length - e.length, n = e.offset - this.offset;
            return n >= 0 && t >= 0 && t >= n
        }, e
    }();
    t.Edit = o;
    var s = function () {
        function e(e) {
            this.model = e, this.modelVersion = e.versionId, this.edit = new o(0, this.model.getValue().length, null)
        }

        return e.prototype.replace = function (e, t, n) {
            "undefined" == typeof t && (t = 0), "undefined" == typeof n && (n = null);
            var r = new o(e, t, n);
            r.isNoop() || (this.edit = this.edit.insert(r))
        }, e.prototype.apply = function () {
            if (this.model.versionId !== this.modelVersion)throw new Error("illegal state - model has been changed");
            for (var e, t = this.model.getValue(); (e = this.edit.getRightMostChild()) !== this.edit;)t = i.splice(t, e.offset, e.length, e.text), e.parent.length += e.text.length - e.length, e.remove();
            return t
        }, e
    }();
    t.create = r
}), define("vs/languages/lib/javascriptSnippets", ["require", "exports", "vs/nls!vs/languages/typescript/typescriptWorker2"], function (e, t, n) {
    "use strict";
    var r = n;
    t.snippets = [
        {type: "snippet", label: "define", codeSnippet: ["define([", "	'require',", "	'{{require}}'", "], function(require, {{factory}}) {", "	'use strict';", "	{{}}", "});"].join("\n"), documentationLabel: r.localize("vs_languages_lib_javascriptSnippets", 0)},
        {type: "snippet", label: "for", codeSnippet: ["for (var {{index}} = 0; {{index}} < {{array}}.length; {{index}}++) {", "	var {{element}} = {{array}}[{{index}}];", "	{{}}", "}"].join("\n"), documentationLabel: r.localize("vs_languages_lib_javascriptSnippets", 1)},
        {type: "snippet", label: "foreach", codeSnippet: ["{{array}}.forEach(function({{element}}) {", "	{{}}", "}, this);"].join("\n"), documentationLabel: r.localize("vs_languages_lib_javascriptSnippets", 2)},
        {type: "snippet", label: "forin", codeSnippet: ["for (var {{key}} in {{object}}) {", "	if ({{object}}.hasOwnProperty({{key}})) {", "		var {{element}} = {{object}}[{{key}}];", "		{{}}", "	}", "}"].join("\n"), documentationLabel: r.localize("vs_languages_lib_javascriptSnippets", 3)},
        {type: "snippet", label: "function", codeSnippet: ["function {{name}}({{params}}) {", "	{{}}", "}"].join("\n"), documentationLabel: r.localize("vs_languages_lib_javascriptSnippets", 4)},
        {type: "snippet", label: "if", codeSnippet: ["if ({{condition}}) {", "	{{}}", "}"].join("\n"), documentationLabel: r.localize("vs_languages_lib_javascriptSnippets", 5)},
        {type: "snippet", label: "ifelse", codeSnippet: ["if ({{condition}}) {", "	{{}}", "} else {", "	", "}"].join("\n"), documentationLabel: r.localize("vs_languages_lib_javascriptSnippets", 6)},
        {type: "snippet", label: "new", codeSnippet: ["var {{name}} = new {{type}}({{arguments}});{{}}"].join("\n"), documentationLabel: r.localize("vs_languages_lib_javascriptSnippets", 7)},
        {type: "snippet", label: "switch", codeSnippet: ["switch ({{key}}) {", "	case {{value}}:", "		{{}}", "		break;", "", "	default:", "		break;", "}"].join("\n"), documentationLabel: r.localize("vs_languages_lib_javascriptSnippets", 8)},
        {type: "snippet", label: "while", codeSnippet: ["while ({{condition}}) {", "	{{}}", "}"].join("\n"), documentationLabel: r.localize("vs_languages_lib_javascriptSnippets", 9)},
        {type: "snippet", label: "dowhile", codeSnippet: ["do {", "	{{}}", "} while ({{condition}});"].join("\n"), documentationLabel: r.localize("vs_languages_lib_javascriptSnippets", 10)},
        {type: "snippet", label: "trycatch", codeSnippet: ["try {", "	{{}}", "} catch ({{error}}) {", "	", "}"].join("\n"), documentationLabel: r.localize("vs_languages_lib_javascriptSnippets", 11)},
        {type: "snippet", label: "log", codeSnippet: ["console.log({{message}});{{}}"].join("\n"), documentationLabel: r.localize("vs_languages_lib_javascriptSnippets", 12)},
        {type: "snippet", label: "settimeout", codeSnippet: ["setTimeout(function() {", "	{{}}", "}, {{timeout}});"].join("\n"), documentationLabel: r.localize("vs_languages_lib_javascriptSnippets", 13)}
    ]
}), define("vs/languages/typescript/service/typescriptSnippets", ["require", "exports", "vs/nls!vs/languages/typescript/typescriptWorker2"], function (e, t, n) {
    "use strict";
    var r = n;
    t.snippets = [
        {type: "snippet", label: "foreach =>", codeSnippet: ["{{array}}.forEach(({{element}}:{{type}}) => {", "	{{}}", "});"].join("\n"), documentationLabel: r.localize("vs_languages_typescript_service_typescriptSnippets", 0)},
        {type: "snippet", label: "jsdoc comment", codeSnippet: ["/**", " * {{}}", " */"].join("\n"), documentationLabel: r.localize("vs_languages_typescript_service_typescriptSnippets", 1)},
        {type: "snippet", label: "ctor", codeSnippet: ["/**", " *", " */", "constructor() {", "	super();", "	{{}}", "}"].join("\n"), documentationLabel: r.localize("vs_languages_typescript_service_typescriptSnippets", 2)},
        {type: "snippet", label: "class", codeSnippet: ["/**", " * {{name}}", " */", "class {{name}} {", "	constructor({{parameters}}) {", "		{{}}", "	}", "}"].join("\n"), documentationLabel: r.localize("vs_languages_typescript_service_typescriptSnippets", 3)},
        {type: "snippet", label: "public method", codeSnippet: ["/**", " * {{name}}", " */", "public {{name}}() {", "	{{}}", "}"].join("\n"), documentationLabel: r.localize("vs_languages_typescript_service_typescriptSnippets", 4)},
        {type: "snippet", label: "private method", codeSnippet: ["private {{name}}() {", "	{{}}", "}"].join("\n"), documentationLabel: r.localize("vs_languages_typescript_service_typescriptSnippets", 5)}
    ]
});
var __extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t)t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype, e.prototype = new n
};
define("vs/base/collections", ["require", "exports", "vs/base/errors"], function (e, t, n) {
    "use strict";
    var r = n, i = function () {
        function e() {
        }

        return e.prototype.toArray = function (e, t) {
            return"undefined" == typeof e && (e = new Array), "undefined" == typeof t && (t = 0), this.forEach(function (n) {
                e[t] = n, t += 1
            }), e
        }, Object.defineProperty(e.prototype, "count", {get: function () {
            var e = 0;
            return this.forEach(function () {
                e += 1
            }), e
        }, enumerable: !0, configurable: !0}), e.prototype.forEach = function () {
            throw r.notImplemented()
        }, e
    }();
    t.AbstractCollection = i;
    var o = function (e) {
        function t(t) {
            e.call(this), this.data = t
        }

        return __extends(t, e), t.prototype.forEach = function (e) {
            for (var t = 0; t < this.data.length; t++) {
                var n = this.data[t];
                if (e(n) === !1)return
            }
        }, t
    }(i);
    t.ArrayCollection = o;
    var s = function (e) {
        function t() {
            e.apply(this, arguments), this._dict = new c
        }

        return __extends(t, e), t.prototype.forEach = function (e) {
            this._dict.forEach(function (t) {
                e(t.key)
            })
        }, Object.defineProperty(t.prototype, "count", {get: function () {
            return this._dict.count
        }, enumerable: !0, configurable: !0}), t.prototype.clear = function () {
            this._dict.clear()
        }, t.prototype.add = function (e) {
            this._dict.add(e, !0)
        }, t.prototype.remove = function (e) {
            var t = this.count;
            return this._dict.remove(e), t !== this.count
        }, t.prototype.contains = function (e) {
            return this._dict.containsKey(e)
        }, t
    }(i);
    t.HashSet = s;
    var a = function (e) {
        function t(t) {
            e.call(this), this._dict = new l(t)
        }

        return __extends(t, e), t.prototype.forEach = function (e) {
            this._dict.forEach(function (t) {
                e(t.key)
            })
        }, Object.defineProperty(t.prototype, "count", {get: function () {
            return this._dict.count
        }, enumerable: !0, configurable: !0}), t.prototype.clear = function () {
            this._dict.clear()
        }, t.prototype.add = function (e) {
            this._dict.add(e, !0)
        }, t.prototype.remove = function (e) {
            var t = this.count;
            return this._dict.remove(e), t !== this.count
        }, t.prototype.contains = function (e) {
            return this._dict.containsKey(e)
        }, t
    }(i);
    t.DelegateHashSet = a;
    var l = function (e) {
        function t(t) {
            e.call(this), this.hashFn = t, this._data = {}, this._count = 0
        }

        return __extends(t, e), t.prototype.forEach = function (e) {
            for (var t in this._data)if (this._data.hasOwnProperty(t)) {
                var n = this._data[t];
                if (e(n) === !1)return
            }
        }, Object.defineProperty(t.prototype, "count", {get: function () {
            return this._count
        }, enumerable: !0, configurable: !0}), Object.defineProperty(t.prototype, "keys", {get: function () {
            var e = new Array;
            return this.forEach(function (t) {
                e.push(t.key)
            }), new o(e)
        }, enumerable: !0, configurable: !0}), Object.defineProperty(t.prototype, "values", {get: function () {
            var e = new Array;
            return this.forEach(function (t) {
                e.push(t.value)
            }), new o(e)
        }, enumerable: !0, configurable: !0}), t.prototype.clear = function () {
            this._data = {}, this._count = 0
        }, t.prototype.add = function (e, t) {
            var n = this.hashFn(e);
            this._data.hasOwnProperty(n) || (this._count += 1), this._data[n] = {key: e, value: t}
        }, t.prototype.get = function (e) {
            var t = this.hashFn(e);
            return this._data.hasOwnProperty(t) ? this._data[t].value : null
        }, t.prototype.remove = function (e) {
            var t = this.hashFn(e);
            this._data.hasOwnProperty(t) && (this._count -= 1, delete this._data[t])
        }, t.prototype.containsKey = function (e) {
            return this._data.hasOwnProperty(this.hashFn(e))
        }, t
    }(i);
    t.DelegateDictionary = l;
    var u = function (e) {
        function t() {
            e.call(this, function (e) {
                return String(e)
            })
        }

        return __extends(t, e), t
    }(l);
    t.StringDictionary = u;
    var c = function (e) {
        function t(t) {
            "undefined" == typeof t && (t = 10), e.call(this), this._elements = new Array(t), this._count = 0
        }

        return __extends(t, e), t.wrap = function (e) {
            return null === e ? t.NULL_PLACEHOLDER : "undefined" == typeof e ? t.UNDEFINED_PLACEHOLDER : e
        }, t.unwrap = function (e) {
            return e === t.NULL_PLACEHOLDER ? null : e === t.UNDEFINED_PLACEHOLDER ? void 0 : e
        }, t.prototype.forEach = function (e) {
            for (var n = 0; n < this._elements.length; n++) {
                var r = this._elements[n];
                if ("undefined" != typeof r)for (var i = 0; i < r.length; i++) {
                    var o = {key: t.unwrap(r[i].key), value: r[i].value};
                    if (e(o) === !1)return
                }
            }
        }, Object.defineProperty(t.prototype, "count", {get: function () {
            return this._count
        }, enumerable: !0, configurable: !0}), Object.defineProperty(t.prototype, "keys", {get: function () {
            var e = new Array;
            return this.forEach(function (n) {
                e.push(t.unwrap(n.key))
            }), new o(e)
        }, enumerable: !0, configurable: !0}), Object.defineProperty(t.prototype, "values", {get: function () {
            var e = new Array;
            return this.forEach(function (t) {
                e.push(t.value)
            }), new o(e)
        }, enumerable: !0, configurable: !0}), t.prototype.clear = function () {
            this._elements.length = 0, this._count = 0
        }, t.prototype.add = function (e, n) {
            e = t.wrap(e);
            var r = this.indexOf(e), i = this._elements[r];
            if ("undefined" == typeof i)this._elements[r] = [
                {key: e, value: n}
            ], this._count += 1; else {
                for (var o = 0; o < i.length; o++)if (e.equals(i[o].key))return;
                i.push({key: e, value: n}), this._count += 1
            }
        }, t.prototype.get = function (e) {
            e = t.wrap(e);
            var n = this.indexOf(e), r = this._elements[n];
            if ("undefined" != typeof r)for (var i = 0; i < r.length; i++)if (e.equals(r[i].key))return r[i].value;
            return null
        }, t.prototype.remove = function (e) {
            e = t.wrap(e);
            var n = this.indexOf(e), r = this._elements[n];
            if ("undefined" != typeof r)for (var i = 0; i < r.length; i++)if (e.equals(r[i].key))return r.splice(i, 1), this._count -= 1, !0;
            return!1
        }, t.prototype.containsKey = function (e) {
            e = t.wrap(e);
            var n = this.indexOf(e), r = this._elements[n];
            if ("undefined" != typeof r)for (var i = 0; i < r.length; i++)if (e.equals(r[i].key))return!0;
            return!1
        }, t.prototype.indexOf = function (e) {
            return e.hashCode() % this._elements.length
        }, t.UNDEFINED_PLACEHOLDER = {hashCode: function () {
            return 0
        }, equals: function (e) {
            return t.UNDEFINED_PLACEHOLDER === e
        }}, t.NULL_PLACEHOLDER = {hashCode: function () {
            return 0
        }, equals: function (e) {
            return t.NULL_PLACEHOLDER === e
        }}, t
    }(i);
    t.Dictionary = c
});
var __extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t)t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype, e.prototype = new n
};
define("vs/languages/typescript/resources/remoteModels", ["require", "exports", "vs/base/network", "vs/editor/core/model/mirrorModel"], function (e, t, n, r) {
    "use strict";
    var i = n, o = r, s = function (e) {
        function t(n, r, o) {
            if ("undefined" == typeof o && (o = !1), e.call(this, n.toExternal(), o ? -1 : 1, t.normalize(r), n), o) {
                var s = n.toExternal();
                this.actualResource = new i.URL(s.substring(0, s.length - 5) + ".ts")
            }
        }

        return __extends(t, e), t.normalize = function (e) {
            return e.length > 0 && e.charCodeAt(0) === t._bom && (e = e.substring(1)), e.replace(/\r\n/g, "\n")
        }, t.prototype.isGenerated = function () {
            return!!this.actualResource
        }, t.prototype.getActualResource = function () {
            return this.actualResource ? this.actualResource : this.getAssociatedResource()
        }, t._bom = 65279, t
    }(o.MirrorModel);
    t.RemoteModel = s;
    var a = function (e) {
        function t(t, n) {
            e.call(this, t, n, !1)
        }

        return __extends(t, e), t
    }(s);
    t.DefaultLibModel = a;
    var l = function (e) {
        function t(t, n) {
            e.call(this, t.toExternal(), -1, n, t)
        }

        return __extends(t, e), t
    }(o.MirrorModel);
    t.AllReferences = l
});
var __extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t)t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype, e.prototype = new n
};
define("vs/languages/typescript/service/lint", ["require", "exports", "vs/nls!vs/languages/typescript/typescriptWorker2", "vs/platform/markers/markers", "vs/languages/typescript/lib/typescriptServices"], function (e, t, n, r, i) {
    "use strict";
    var o, s = n, a = r, l = i;
    !function (e) {
        function t(e) {
            for (var t = 0, n = e.childCount(); n > t; t++) {
                var r = e.childAt(t);
                if (r.kind() === l.TypeScript.SyntaxKind.ExportKeyword)return!0
            }
            return!1
        }

        function n(e) {
            var t = e.fullText(), n = e.leadingTriviaWidth(), r = e.trailingTriviaWidth();
            return 0 === n && 0 === r ? t : t.substr(n, t.length - (n + r))
        }

        e.isExported = t, e.text = n
    }(o || (o = {}));
    var u = function (e) {
        function t(t, n, r) {
            e.call(this), this.filename = t, this.languageService = n, this.markers = r, this._id = "id", this.severity = a.Severity.Warning
        }

        return __extends(t, e), Object.defineProperty(t.prototype, "id", {get: function () {
            return this._id
        }, enumerable: !0, configurable: !0}), t.prototype.addMarker = function (e, t, n) {
            var r = a.createTextMarker(this.severity, 0, e, t, n);
            this.markers.push(r)
        }, t.prototype.isEnabled = function (e) {
            var t = [];
            e.collectTextElements(t);
            for (var n = 0, r = t.length; r > n; n++) {
                var i = /\/\*\s*-lint(:(\w+))?\s*\*\//.exec(t[n]);
                if (i && (!i[2] || i[2] === this.id))return!1
            }
            return!0
        }, t
    }(l.TypeScript.PositionTrackingWalker);
    t.Check = u;
    var c = function (e) {
        function t() {
            e.apply(this, arguments)
        }

        return __extends(t, e), t.prototype.visitBinaryExpression = function (n) {
            var r = this.position();
            if (e.prototype.visitBinaryExpression.call(this, n), n.left instanceof l.TypeScript.TypeOfExpressionSyntax && this.isEnabled(n)) {
                var i = o.text(n.right), a = i.charCodeAt(0), u = i.charCodeAt(i.length - 1);
                if (u === a && (a === t.SQU || a === t.DQU)) {
                    var c = i.substring(1, i.length - 1);
                    switch (c) {
                        case"undefined":
                        case"object":
                        case"function":
                        case"boolean":
                        case"number":
                        case"string":
                            return
                    }
                    this.addMarker(s.localize("vs_languages_typescript_service_lint", 0, c), r + n.leadingTriviaWidth(), n.width())
                }
            }
        }, t.SQU = "'".charCodeAt(0), t.DQU = '"'.charCodeAt(0), t
    }(u);
    t.TypeOfCheck = c;
    var p = function (e) {
        function t() {
            e.apply(this, arguments)
        }

        return __extends(t, e), t.prototype.visitImportDeclaration = function (t) {
            var n = this.position();
            if (e.prototype.visitImportDeclaration.call(this, t), this.isEnabled(t)) {
                var r = n + t.importKeyword.fullWidth() + t.identifier.width() - 1, i = this.languageService.getOccurrencesAtPosition(this.filename, r);
                1 === i.length && this.addMarker(s.localize("vs_languages_typescript_service_lint", 1, t.identifier.text()), n + t.leadingTriviaWidth(), t.width())
            }
        }, t
    }(u);
    t.UnusedImportCheck = p;
    var h = function (e) {
        function t() {
            e.apply(this, arguments)
        }

        return __extends(t, e), t.prototype.visitBinaryExpression = function (t) {
            var n = this.position();
            e.prototype.visitBinaryExpression.call(this, t);
            var r = t.operatorToken.kind();
            (r === l.TypeScript.SyntaxKind.EqualsEqualsToken || r === l.TypeScript.SyntaxKind.ExclamationEqualsToken) && this.isEnabled(t) && this.addMarker(s.localize("vs_languages_typescript_service_lint", 2, r === l.TypeScript.SyntaxKind.EqualsEqualsToken ? "===" : "!==", t.operatorToken.text()), n + t.left.fullWidth() + t.operatorToken.leadingTriviaWidth(), t.operatorToken.width())
        }, t
    }(u);
    t.EqualityCheck = h;
    var d = function (e) {
        function t() {
            e.apply(this, arguments)
        }

        return __extends(t, e), t.prototype.visitInterfaceDeclaration = function (e) {
            this.skip(e)
        }, t.prototype.visitParameter = function (t) {
            var n = this.position();
            if (e.prototype.visitParameter.call(this, t), this.isEnabled(t)) {
                var r = t.identifier, i = n + r.leadingTriviaWidth() + r.width() - 1;
                this.symbolAtPositionIsBeingRead(i) || this.addMarker(s.localize("vs_languages_typescript_service_lint", 3, r.text()), n, t.width())
            }
        }, t.prototype.visitVariableStatement = function (t) {
            return o.isExported(t.modifiers) ? this.skip(t) : e.prototype.visitVariableStatement.call(this, t)
        }, t.prototype.visitVariableDeclarator = function (t) {
            var n = this.position();
            e.prototype.visitVariableDeclarator.call(this, t);
            var r = t.identifier, i = n + r.leadingTriviaWidth() + r.width() - 1;
            this.symbolAtPositionIsBeingRead(i) || this.addMarker(s.localize("vs_languages_typescript_service_lint", 4, r.text()), n, t.width())
        }, t.prototype.symbolAtPositionIsBeingRead = function (e) {
            for (var t = this.languageService.getOccurrencesAtPosition(this.filename, e), n = 0, r = 0, i = t.length; i > r; r++)t[r].isWriteAccess || (n += 1);
            return n > 0
        }, t
    }(u);
    t.UnusedVariableCheck = d;
    var f = function (e) {
        function t() {
            e.apply(this, arguments)
        }

        return __extends(t, e), t.prototype.isComment = function (e) {
            return e.kind() === l.TypeScript.SyntaxKind.MultiLineCommentTrivia || e.kind() === l.TypeScript.SyntaxKind.SingleLineCommentTrivia
        }, t.prototype.visitBlock = function (t) {
            var n = this.position();
            if (e.prototype.visitBlock.call(this, t), this.isEnabled(t) && !(t.statements.childCount() > 0)) {
                for (var r = 0, i = t.childCount(); i > r; r++) {
                    for (var o = t.childAt(r).leadingTrivia(), a = t.childAt(r).trailingTrivia(), l = 0, u = o.count(); u > l; l++)if (this.isComment(o.syntaxTriviaAt(l)))return;
                    for (var l = 0, u = a.count(); u > l; l++)if (this.isComment(a.syntaxTriviaAt(l)))return
                }
                this.addMarker(s.localize("vs_languages_typescript_service_lint", 5), n, t.width())
            }
        }, t
    }(u);
    t.EmptyBlockCheck = f;
    var m = function (e) {
        function t() {
            e.apply(this, arguments)
        }

        return __extends(t, e), t.prototype.visitNode = function (t) {
            t.isTypeScriptSpecific() ? (this.reportAsTypeScriptSpecific(t), this.skip(t)) : e.prototype.visitNode.call(this, t)
        }, t.prototype.visitVariableStatement = function (t) {
            o.isExported(t.modifiers) ? (this.reportAsTypeScriptSpecific(t), this.skip(t)) : e.prototype.visitVariableStatement.call(this, t)
        }, t.prototype.visitFunctionDeclaration = function (t) {
            o.isExported(t.modifiers) ? (this.reportAsTypeScriptSpecific(t), this.skip(t)) : e.prototype.visitFunctionDeclaration.call(this, t)
        }, t.prototype.reportAsTypeScriptSpecific = function (e) {
            var t = this.position();
            this.addMarker(s.localize("vs_languages_typescript_service_lint", 6), t + e.leadingTriviaWidth(), e.width())
        }, t
    }(u);
    t.TypeScriptSpecificCheck = m;
    var g = function (e) {
        function t() {
            e.apply(this, arguments), this.loopStack = []
        }

        return __extends(t, e), t.prototype.insideALoop = function () {
            return this.loopStack.length > 0
        }, t.prototype.visitForStatement = function (t) {
            this.loopStack.push(t), e.prototype.visitForStatement.call(this, t), this.loopStack.pop()
        }, t.prototype.visitWhileStatement = function (t) {
            this.loopStack.push(t), e.prototype.visitWhileStatement.call(this, t), this.loopStack.pop()
        }, t.prototype.visitDoStatement = function (t) {
            this.loopStack.push(t), e.prototype.visitDoStatement.call(this, t), this.loopStack.pop()
        }, t.prototype.visitFunctionExpression = function (t) {
            var n = this.position();
            e.prototype.visitFunctionExpression.call(this, t), this.insideALoop() && this.isEnabled(t) && this.addMarker(s.localize("vs_languages_typescript_service_lint", 7), n + t.functionKeyword.leadingTriviaWidth(), t.functionKeyword.width())
        }, t.prototype.visitFunctionDeclaration = function (t) {
            var n = this.position();
            if (e.prototype.visitFunctionDeclaration.call(this, t), this.insideALoop() && this.isEnabled(t)) {
                var r, i, o = s.localize("vs_languages_typescript_service_lint", 8);
                t.identifier.width() > 0 ? (r = n + t.functionKeyword.fullWidth() + t.identifier.leadingTriviaWidth(), i = t.identifier.width()) : (r = n + t.functionKeyword.leadingTriviaWidth(), i = t.functionKeyword.width()), this.addMarker(o, r, i)
            }
        }, t
    }(u);
    t.FunctionInLoopsCheck = g;
    var y = function (e) {
        function t() {
            e.apply(this, arguments)
        }

        return __extends(t, e), t.prototype.visitIfStatement = function (t) {
            this.checkForEmptyStatement(t, t.statement), e.prototype.visitIfStatement.call(this, t)
        }, t.prototype.visitElseClause = function (t) {
            this.checkForEmptyStatement(t, t.statement), e.prototype.visitElseClause.call(this, t)
        }, t.prototype.visitWhileStatement = function (t) {
            this.checkForEmptyStatement(t, t.statement), e.prototype.visitWhileStatement.call(this, t)
        }, t.prototype.visitForStatement = function (t) {
            this.checkForEmptyStatement(t, t.statement), e.prototype.visitForStatement.call(this, t)
        }, t.prototype.visitForInStatement = function (t) {
            this.checkForEmptyStatement(t, t.statement), e.prototype.visitForInStatement.call(this, t)
        }, t.prototype.checkForEmptyStatement = function (e, t) {
            t.kind() === l.TypeScript.SyntaxKind.EmptyStatement && this.isEnabled(t) && this.addMarker(s.localize("vs_languages_typescript_service_lint", 9), this.position() + e.leadingTriviaWidth(), e.width() + t.leadingTriviaWidth() + t.width())
        }, t
    }(u);
    t.SemiColonInsteadOfBlockCheck = y
}), define("vs/languages/typescript/service/languageServiceAdapter", ["require", "exports", "vs/base/network", "vs/base/types", "vs/languages/typescript/service/lint", "vs/base/strings", "vs/platform/markers/markers", "vs/base/filters", "vs/editor/core/model/mirrorModel", "vs/languages/typescript/service/textEdit", "vs/languages/typescript/lib/typescriptServices", "vs/languages/typescript/resources/remoteModels", "vs/languages/lib/javascriptSnippets", "vs/languages/typescript/service/typescriptSnippets"], function (e, t, n, r, i, o, s, a, l, u, c, p, h, d) {
    "use strict";
    var f = n, m = r, g = i, y = o, v = s, T = a, S = l, b = u, _ = c, E = p, k = h, C = d, x = function () {
        function e(e, t, n) {
            this.host = e, this.resourceService = n, this.setLanguageService(t), this.setSuggestConfiguration({})
        }

        return e.prototype.setLanguageService = function (e) {
            this.languageService = e
        }, e.prototype.getLanguageSerivce = function () {
            return this.languageService
        }, e.prototype.setSuggestConfiguration = function (e) {
            this.suggestConfiguration = e
        }, e.prototype.getExtraDiagnostic = function (e) {
            var t = this, n = [];
            this.lintConfiguration.emptyBlock === !0 && n.push(g.EmptyBlockCheck), this.lintConfiguration.eqeqeq === !0 && n.push(g.EqualityCheck), this.lintConfiguration.functionsInLoops === !0 && n.push(g.FunctionInLoopsCheck), this.lintConfiguration.semiColonInsteadOfBlock === !0 && n.push(g.SemiColonInsteadOfBlockCheck), this.lintConfiguration["typeof"] === !0 && n.push(g.TypeOfCheck), this.lintConfiguration.unusedImport === !0 && n.push(g.UnusedImportCheck), this.lintConfiguration.unusedLocals === !0 && n.push(g.UnusedVariableCheck);
            var r = [], i = e.toExternal(), o = this.languageService.getSyntaxTree(i).sourceUnit();
            return n.forEach(function (e) {
                var n = m.create(e, i, t.languageService, r);
                o.accept(n)
            }), r
        }, e.prototype.getSyntacticDiagnostics = function (t) {
            var n = [], r = this.languageService.getSyntacticDiagnostics(t.toExternal());
            return e.appendMarkersFromDiagnostics(n, r), n
        }, e.prototype.getSemanticDiagnostics = function (t) {
            var n = [], r = this.languageService.getSemanticDiagnostics(t.toExternal());
            return e.appendMarkersFromDiagnostics(n, r), n
        }, e.appendMarkersFromDiagnostics = function (e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                e.push({type: "", code: -1, text: r.text(), severity: v.Severity.Error, offset: r.start(), length: r.length()})
            }
        }, e.prototype.format = function (e, t, n) {
            var r = this.resourceService.get(e), i = r.getAssociatedResource().toExternal(), o = r.getOffsetFromPosition({lineNumber: t.startLineNumber, column: t.startColumn}), s = r.getOffsetFromPosition({lineNumber: t.endLineNumber, column: t.endColumn}), a = this.languageService.getFormattingEditsForRange(i, o, s, this.createFormatOptions(n)), l = this.applyTextEdits(a, r, o, s);
            return l.text
        }, e.prototype.formatAfterKeystroke = function (e, t, n) {
            var r = this.resourceService.get(e), i = r.getAssociatedResource().toExternal(), o = r.getOffsetFromPosition(t), s = r.getOffsetFromPosition({lineNumber: t.lineNumber, column: 1}), a = r.getLineContent(t.lineNumber).length, l = r.getValueInRange({startColumn: t.column, endColumn: t.column + 1, startLineNumber: t.lineNumber, endLineNumber: t.lineNumber}), u = this.languageService.getFormattingEditsAfterKeystroke(i, 1 + o, l, this.createFormatOptions(n)), c = this.applyTextEdits(u, r, s, s + a);
            return c
        }, e.prototype.createFormatOptions = function (e) {
            var t = new _.Services.FormatCodeOptions;
            return t.ConvertTabsToSpaces = e.insertSpaces, t.TabSize = e.tabSize, t.IndentSize = e.tabSize, t.InsertSpaceAfterCommaDelimiter = !0, t.InsertSpaceBeforeAndAfterBinaryOperators = !0, t.InsertSpaceAfterSemicolonInForStatements = !0, t
        }, e.prototype.applyTextEdits = function (e, t, n, r) {
            for (var i, o = b.create(t), s = 0; s < e.length; s++)o.replace(e[s].minChar, e[s].limChar - e[s].minChar, e[s].text), n = Math.min(n, e[s].minChar), r = Math.max(r, e[s].limChar);
            return i = o.apply(), i = i.substring(n, r + (i.length - t.getValue().length)), {text: i, range: this.rangeFromMinAndLim({minChar: n, limChar: r}, t)}
        }, e.prototype.getActionsAtPosition = function (e, t) {
            var n = this.resourceService.get(e), r = n.getAssociatedResource().toExternal(), i = n.getOffsetFromPosition(t), o = [], s = this.languageService.getSyntaxTree(r), a = s.sourceUnit().findToken(i);
            if (a.kind() !== _.TypeScript.SyntaxKind.IdentifierName)return o;
            var l = this.languageService.getTypeAtPosition(r, i);
            return l && "" !== l.memberName.toString() && "any" !== l.memberName.toString() ? (o.push("editor.actions.rename"), o.push("editor.actions.referenceSearch.trigger"), o.push("editor.actions.previewDeclaration"), o.push("editor.actions.goToDeclaration"), o) : o
        }, e.prototype.getOutline = function (e) {
            var t = this, n = this.resourceService.get(e), r = n.getAssociatedResource().toExternal(), i = this.languageService.getScriptLexicalStructure(r), o = [], s = [];
            return i.filter(function (e) {
                switch (e.kind) {
                    case _.Services.ScriptElementKind.unknown:
                    case _.Services.ScriptElementKind.scriptElement:
                    case _.Services.ScriptElementKind.enumElement:
                        return!1
                }
                return r !== e.fileName ? !1 : r === e.name ? !1 : !0
            }).sort(function (e, t) {
                return e.minChar - t.minChar
            }).map(function (e) {
                var r = {label: e.name, type: e.kind, range: t.rangeFromMinAndLim(e, n), children: []};
                return r
            }).forEach(function (e) {
                for (; ;) {
                    var n = s[s.length - 1];
                    if (!n) {
                        s.push(e), o.push(e);
                        break
                    }
                    if (t.isSubRange(n.range, e.range)) {
                        n.children.push(e), s.push(e);
                        break
                    }
                    s.pop()
                }
            }), o
        }, e.prototype.getNavigateToItems = function (t) {
            for (var n, r = this.host.getScriptFileNames(), i = [], o = 0; o < r.length; o++) {
                n = this.languageService.getScriptLexicalStructure(r[o]);
                for (var s = 0; s < n.length; s++) {
                    var a = n[s], l = e.FILTER(t, n[s].name);
                    if (l) {
                        var u = this.resourceService.get(new f.URL(a.fileName));
                        u && !this.isBaseLibModel(u) && i.push({containerName: a.containerName, name: a.name, type: a.kind, matchKind: a.matchKind, resourceUrl: u.getAssociatedResource().toExternal(), range: this.rangeFromMinAndLim(a, u)})
                    }
                }
            }
            return i
        }, e.prototype.findOccurrences = function (e, t) {
            var n = this, r = this.resourceService.get(e), i = r.getAssociatedResource().toExternal(), o = r.getOffsetFromPosition(t), s = this.languageService.getOccurrencesAtPosition(i, o), a = s.map(function (e) {
                return{kind: e.isWriteAccess ? "write" : null, range: n.rangeFromMinAndLim(e, r)}
            });
            return a
        }, e.prototype.findDeclaration = function (e, t) {
            var n = this.resourceService.get(e), r = n.getAssociatedResource().toExternal(), i = n.getOffsetFromPosition(t), o = this.languageService.getDefinitionAtPosition(r, i);
            if (!o || 0 === o.length)return null;
            var s = o[0];
            if (!s.fileName)return null;
            var a = this.resourceService.get(new f.URL(s.fileName));
            if (this.isBaseLibModel(a))return null;
            var l = {resourceUrl: a.getAssociatedResource().toExternal(), range: this.rangeFromMinAndLim(s, a, !0), preview: this.preview(a, s.minChar, s.limChar)};
            return l
        }, e.prototype.findTypeDeclaration = function () {
            return null
        }, e.prototype.isExternallyVisibleSymbole = function (e, t) {
            var n = this.resourceService.get(e), r = n.getOffsetFromPosition(t), i = n.getAssociatedResource().toExternal(), o = this.languageService.getTypeAtPosition(i, r);
            if (!o)return!0;
            switch (o.kind) {
                case _.Services.ScriptElementKind.localVariableElement:
                case _.Services.ScriptElementKind.localFunctionElement:
                case _.Services.ScriptElementKind.parameterElement:
                    return!1
            }
            return!0
        }, e.prototype.findReferences = function (e, t) {
            var n = this, r = this.resourceService.get(e), i = r.getOffsetFromPosition(t), o = r.getAssociatedResource().toExternal(), s = this.languageService.getReferencesAtPosition(o, i), a = s.filter(function (e) {
                return!n.isBaseLibModel(n.resourceService.get(new f.URL(e.fileName)))
            }).map(function (e) {
                var t = n.resourceService.get(new f.URL(e.fileName)), r = {resourceUrl: t.getAssociatedResource().toExternal(), range: n.rangeFromMinAndLim(e, t), preview: n.preview(t, e.minChar, e.limChar)};
                return r
            });
            return a
        }, e.prototype.getTypeInformationAtPosition = function (e, t) {
            var n = this.resourceService.get(e), r = n.getOffsetFromPosition(t), i = n.getAssociatedResource().toExternal(), o = this.languageService.getTypeAtPosition(i, r);
            if (!o)return null;
            var s = [];
            s.push({className: "type", text: o.memberName.toString()}), s.push({className: "documentation", text: o.docComment});
            var a = {value: "", htmlContent: s, className: "typeInfo ts", range: this.rangeFromMinAndLim(o, n)};
            return a
        }, e.prototype.getRangesToPosition = function (e, t) {
            for (var n = this.resourceService.get(e), r = n.getOffsetFromPosition(t), i = n.getAssociatedResource().toExternal(), o = this.languageService.getSyntaxTree(i), s = o.sourceUnit().findToken(r), a = []; null !== s;)a.unshift({type: "node", range: this.rangeFromMinAndLim({minChar: s.start(), limChar: s.end()}, n)}), s = s.parent();
            return a
        }, e.append = function (e, t, n) {
            var r = n.type + n.label + n.codeSnippet;
            t[r] || (t[r] = !0, e.push(n))
        }, e.prototype.suggest = function (t, n) {
            var r = this.resourceService.get(t), i = t.toExternal(), o = r.getWordUntilPosition(n), s = r.getOffsetFromPosition(n), a = s - o.length, l = "." === r.getValue().charAt(a - 1), u = [], c = this.languageService.getCompletionsAtPosition(i, a, l);
            if (c) {
                l = c.isMemberCompletion;
                var p = {};
                c.entries.forEach(function (t) {
                    t.name && t.kind && e.append(u, p, {type: e.convertScriptElementKindToSuggestionType(t.kind), label: t.name, codeSnippet: t.name})
                })
            }
            var h = !l, d = this.suggestConfiguration.alwaysAllWords || !c || 0 === c.entries.length;
            return d && r.getAllUniqueWords(o).filter(function (e) {
                return!/^-?\d*\.?\d/.test(e)
            }).forEach(function (e) {
                var t = {type: "text", label: e, codeSnippet: e};
                u.push(t)
            }), h && (u.push.apply(u, k.snippets), u.push.apply(u, C.snippets)), u
        }, e.prototype.getSuggestionDetails = function (t, n, r) {
            var i = this.resourceService.get(t), o = t.toExternal(), s = i.getOffsetFromPosition(n), a = this.languageService.getCompletionEntryDetails(o, s, r.label);
            if (!a)return r;
            if (r.typeLabel = a.type, r.documentationLabel = a.docComment, this.suggestConfiguration.useCodeSnippetsOnMethodSuggest && "function" === r.type) {
                var l = e.parseMethodSignature(a.type), u = l.arguments.map(function (e) {
                    return"{{" + e.name.trim() + "}}"
                }), c = a.name;
                c += u.length > 0 ? "(" + u.join(", ") + "){{}}" : "()", r.codeSnippet = c
            }
            return r
        }, e.convertScriptElementKindToSuggestionType = function (e) {
            switch (e) {
                case _.Services.ScriptElementKind.primitiveType:
                case _.Services.ScriptElementKind.keyword:
                    return"keyword";
                case _.Services.ScriptElementKind.variableElement:
                case _.Services.ScriptElementKind.localVariableElement:
                case _.Services.ScriptElementKind.memberVariableElement:
                case _.Services.ScriptElementKind.memberGetAccessorElement:
                case _.Services.ScriptElementKind.memberSetAccessorElement:
                    return"field";
                case _.Services.ScriptElementKind.functionElement:
                case _.Services.ScriptElementKind.memberFunctionElement:
                case _.Services.ScriptElementKind.constructSignatureElement:
                case _.Services.ScriptElementKind.callSignatureElement:
                    return"function"
            }
            return e
        }, e.prototype.quickFix = function (t, n) {
            var r = this.resourceService.get(t), i = r.getAssociatedResource().toExternal(), o = r.getOffsetFromPosition(n), s = r.getWordUntilPosition(n), a = o - s.length, l = "." === r.getValue().charAt(a - 1), u = this.languageService.getCompletionsAtPosition(i, a, l), c = [];
            return u.entries.forEach(function (t) {
                var n = y.difference(s, t.name);
                n < s.length / 2 || c.push({type: e.convertScriptElementKindToSuggestionType(t.kind), label: t.name, codeSnippet: t.name, score: n})
            }), c.sort(function (e, t) {
                return t.score - e.score
            }), c.slice(0, 3)
        }, e.parseMethodSignature = function (e) {
            var t, n, r, i = [], o = "", s = "", a = !0, l = 1;
            for (t = 1, n = e.length; n > t; t++)if (r = e.charAt(t), ")" === r && l--, "(" === r && l++, 1 !== l || ":" !== r)if (1 !== l || "," !== r) {
                if (0 === l && ")" === r) {
                    "" !== o && i.push({name: o, type: s});
                    break
                }
                a ? o += r : s += r
            } else i.push({name: o, type: s}), o = "", s = "", a = !0; else a = !1;
            return{arguments: i, flatArguments: e.substr(0, t + 1), flatReturnType: e.substr(t + 5)}
        }, e.prototype.getParameterHints = function (t, n) {
            var r = this.resourceService.get(t), i = r.getOffsetFromPosition(n), o = r.getAssociatedResource().toExternal(), s = this.languageService.getSignatureAtPosition(o, i);
            if (!s)return null;
            var a = {currentSignature: Math.max(0, s.activeFormal), currentParameter: Math.max(0, s.actual.currentParameter), signatures: s.formal.map(function (t) {
                return e.transformSignature(t)
            })};
            return a
        }, e.transformParameter = function (e) {
            return{label: e.name, documentation: e.docComment, signatureLabelOffset: e.minChar, signatureLabelEnd: e.limChar}
        }, e.transformSignature = function (t) {
            return{label: t.signatureInfo, documentation: t.docComment, parameters: t.parameters.map(function (t) {
                return e.transformParameter(t)
            })}
        }, e.prototype.getEmitOutput = function (e, t) {
            var n = this.languageService.getEmitOutput(e.toExternal()), r = n.outputFiles;
            if (!r)return null;
            for (var i = 0, o = r.length; o > i; i++)if (y.endsWith(r[i].name, t))return r[i].text;
            return null
        }, e.prototype.isBaseLibModel = function (e) {
            return e instanceof E.DefaultLibModel
        }, e.prototype.rangeFromMinAndLim = function (e, t, n) {
            "undefined" == typeof n && (n = !1);
            var r = e.minChar, i = e.limChar - e.minChar;
            i = Math.max(1, i);
            var o = {};
            return o.startLineNumber = t.getLineNumberFromOffset(r), o.startColumn = 1 + r - t.getLineStart(o.startLineNumber), n ? (o.endLineNumber = o.startLineNumber, o.endColumn = o.startColumn) : (o.endLineNumber = t.getLineNumberFromOffset(r + i), o.endColumn = 1 + r + i - t.getLineStart(o.endLineNumber)), o
        }, e.prototype.preview = function (e, t, n, r) {
            "undefined" == typeof r && (r = 200);
            for (var i, o = this.languageService.getSyntaxTree(e.getAssociatedResource().toExternal()), s = o.sourceUnit().findToken(t); s && !i;)s.fullWidth() > r && (i = s), s = s.parent();
            i || (i = o.sourceUnit().findToken(t).root());
            var a = e.getValue().substring(i.fullStart(), i.fullEnd()), l = new S.MirrorModel("__temp_model_", 0, a), u = t - i.fullStart(), c = n - t, p = l.getLineNumberFromOffset(u), h = 1 + u - l.getLineStart(p), d = l.getLineNumberFromOffset(u + c), f = 1 + (u + c) - l.getLineStart(d);
            return l.dispose(), {text: a, range: {startLineNumber: p, startColumn: h, endLineNumber: d, endColumn: f}}
        }, e.prototype.isSubRange = function (e, t) {
            return e.startLineNumber > t.startLineNumber || e.endLineNumber < t.endLineNumber ? !1 : e.startLineNumber === t.startLineNumber && e.startColumn > t.startColumn ? !1 : e.endLineNumber === t.endLineNumber && e.endColumn < t.endColumn ? !1 : !0
        }, e.FILTER = T.or(T.matchesPrefix, T.matchesContiguousSubString, T.matchesCamelCase), e
    }();
    t.LanguageServiceAdapter = x
});
var __extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t)t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype, e.prototype = new n
};
define("vs/languages/typescript/service/languageServiceHost2", ["require", "exports", "vs/base/collections", "vs/languages/typescript/lib/typescriptServices"], function (e, t, n, r) {
    "use strict";
    var i = n, o = r, s = function () {
        function e() {
            this.logger = console.warn
        }

        return e.prototype.information = function () {
            return this.logger = console.log, !0
        }, e.prototype.debug = function () {
            return this.logger = console.log, !0
        }, e.prototype.warning = function () {
            return this.logger = console.warn, !0
        }, e.prototype.error = function () {
            return this.logger = console.error, !0
        }, e.prototype.fatal = function () {
            return this.logger = console.error, !0
        }, e.prototype.log = function () {
        }, e
    }();
    t.ConsoleLogger = s;
    var a = function () {
        function e(e) {
            this.model = e, this.versionId = e.versionId, this.open = !1, this.value = e.getValue(), this.length = this.value.length, this.changeRange = new o.TypeScript.TextChangeRange(new o.TypeScript.TextSpan(0, this.length), this.length)
        }

        return e.prototype.getText = function (e, t) {
            return this.value.substring(e, t)
        }, e.prototype.getLength = function () {
            return this.length
        }, e.prototype.getLineStartPositions = function () {
            if (!this.lineStarts) {
                this.lineStarts = [];
                for (var e = 0, t = this.model.getLineCount(); t > e; e++)this.lineStarts.push(this.model.getLineStart(e + 1))
            }
            return this.lineStarts
        }, e.prototype.getTextChangeRangeSinceVersion = function () {
            return null
        }, e
    }(), l = function (e) {
        function t() {
            e.call(this), this._compilationSettings = new o.TypeScript.CompilationSettings, this._resourceSet = new i.StringDictionary
        }

        return __extends(t, e), t.prototype.updateResources = function (e) {
            for (var t = 0, n = e.length; n > t; t++) {
                var r = e[t], i = r.toExternal(), o = this._resourceService.get(r);
                if (o) {
                    var s = o.versionId;
                    this._resourceSet.containsKey(i) && this._resourceSet.get(i).versionId === s || this._resourceSet.add(i, new a(o))
                } else console.warn(r.toExternal() + " NOT found"), this._resourceSet.remove(i)
            }
        }, Object.defineProperty(t.prototype, "resourceService", {set: function (e) {
            this._resourceService = e
        }, enumerable: !0, configurable: !0}), Object.defineProperty(t.prototype, "compilationSettings", {set: function (e) {
            this._compilationSettings = e
        }, enumerable: !0, configurable: !0}), t.prototype.isScriptFileName = function (e) {
            return this._resourceSet.containsKey(e)
        }, t.prototype.getCompilationSettings = function () {
            return this._compilationSettings
        }, t.prototype.getScriptFileNames = function () {
            return this._resourceSet.keys.toArray()
        }, t.prototype.getScriptVersion = function (e) {
            return this._resourceSet.get(e).versionId
        }, t.prototype.getScriptIsOpen = function () {
            return!0
        }, t.prototype.getLocalizedDiagnosticMessages = function () {
            return null
        }, t.prototype.getScriptByteOrderMark = function () {
            return ByteOrderMark.None
        }, t.prototype.getScriptSnapshot = function (e) {
            return this._resourceSet.get(e)
        }, t.prototype.getDiagnosticsObject = function () {
            return this
        }, t
    }(s);
    t.LanguageServiceHost = l
}), define("vs/languages/typescript/resources/moduleConfiguration", ["require", "exports"], function (e, t) {
    "use strict";
    var n = function () {
        function e(e, t) {
            this.requestService = e, this.configuration = t
        }

        return e.prototype.setConfiguration = function (e) {
            this.configuration = e
        }, e.prototype.getModuleConfiguration = function (e) {
            var t = "", n = "/", r = Object.keys(this.configuration), i = this.requestService.getPath("root", e);
            r.sort(function (e, t) {
                return t.length - e.length
            });
            for (var o = 0; !t && o < r.length; o++) {
                var s = r[o];
                0 === i.indexOf(s) && (t = this.configuration[s].type, n = s)
            }
            return{baseurl: n, moduleType: t}
        }, e
    }();
    t.ModuleSystemConfigurations = n
});
var __extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t)t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype, e.prototype = new n
};
define("vs/languages/typescript/service/references", ["require", "exports", "../lib/typescriptServices", "vs/base/objects", "vs/base/lib/winjs.base"], function (e, t, n, r, i) {
    "use strict";
    function o(e, t) {
        var n = e.nodes().filter(function (e) {
            return!t.hasOwnProperty(e.getName())
        });
        return 0 === n.length ? null : (n.sort(function (e, t) {
            var n = e.getIncoming().length - t.getIncoming().length;
            return 0 === n && (n = t.getOutgoing().length - e.getOutgoing().length), 0 === n && (n = e.getName().localeCompare(t.getName())), n
        }), n[0])
    }

    function s(e) {
        for (var t, n, r = [], i = {}; null !== (t = o(e, i));)e.traverse(t.getName(), function (e) {
            n = e.getName(), i[n] || (i[n] = !0, r.unshift(e))
        });
        return r
    }

    function a(e, n, r) {
        var i, o, s = new f, a = new S;
        return n = n.slice(0), n.sort(function (e, t) {
            return t.references.length - e.references.length
        }), new h.Promise(function (l) {
            function u() {
                return 0 === n.length ? (l(s), void 0) : (i = n.shift(), (o = s.hasNode(r.nodeName(i.path))) ? u() : (i.resolve(e, a.consume.bind(a), r).then(function () {
                    t.fillGraph(s, s.insertNode(r.nodeName(i.path)), r, i), u()
                }), void 0))
            }

            u()
        })
    }

    function l(e, n, r, i) {
        i.references.forEach(function (o) {
            if (o.error && !o.file) {
                var s = {message: o.error.message, path: r.nodeName(i.path), offset: o.offset, length: o.length, referenceType: o instanceof g ? 1 : 2};
                e.insertEdge(n.getName(), "error:" + JSON.stringify(s))
            } else if (o.file) {
                var a = e.insertEdge(n.getName(), r.nodeName(o.file.path));
                o.error || t.fillGraph(e, a, r, o.file)
            }
        })
    }

    function u(e) {
        return(new S).consume(e)
    }

    var c = n, p = r, h = i, d = function () {
        function e(e) {
            this.name = e, this.outgoing = {}, this.incoming = {}
        }

        return e.prototype.getName = function () {
            return this.name
        }, e.prototype.getOutgoing = function () {
            return Object.keys(this.outgoing)
        }, e.prototype.getIncoming = function () {
            return Object.keys(this.incoming)
        }, e
    }(), f = function () {
        function e() {
            this.store = {}
        }

        return e.prototype.clone = function () {
            var t = new e;
            return t.store = p.clone(this.store), t
        }, e.prototype.merge = function (e) {
            var t = this;
            if (this !== e) {
                var n = Object.keys(e.store);
                n.forEach(function (e) {
                    t.hasNode(e) || t.insertNode(e)
                }), n.forEach(function (n) {
                    var r = e.store[n];
                    r.getOutgoing().forEach(function (e) {
                        t.insertEdge(n, e)
                    })
                })
            }
        }, e.prototype.isEmpty = function () {
            return 0 === Object.keys(this.store).length
        }, e.prototype.hasNode = function (e) {
            return this.store.hasOwnProperty(e)
        }, e.prototype.insertNode = function (e) {
            var t = new d(e);
            return this.store[e] = t, t
        }, e.prototype.insertEdge = function (e, t) {
            return this.hasNode(e) || this.insertNode(e), this.hasNode(t) || this.insertNode(t), this.store[e].outgoing[t] = !0, this.store[t].incoming[e] = !0, this.store[t]
        }, e.prototype.removeEdges = function (e) {
            for (var t = [], n = 0; n < arguments.length - 1; n++)t[n] = arguments[n + 1];
            if (this.hasNode(e)) {
                var r, i, o = this.store[e], s = t.length;
                for (0 === t.length && (t = Object.keys(o.outgoing), s = t.length), r = 0; s > r; r++)this.store.hasOwnProperty(t[r]) && (i = this.store[t[r]], delete o.outgoing[i.name], delete i.incoming[e])
            }
        }, e.prototype.removeNode = function (e) {
            var t = this;
            return this.store.hasOwnProperty(e) ? (delete this.store[e], Object.keys(this.store).forEach(function (n) {
                var r = t.store[n];
                delete r.incoming[e], delete r.outgoing[e]
            }), !0) : !1
        }, e.prototype.nodes = function () {
            var e = this;
            return Object.keys(this.store).map(function (t) {
                return e.store[t]
            })
        }, e.prototype.node = function (e) {
            return this.store.hasOwnProperty(e) ? this.store[e] : null
        }, e.prototype.traverse = function (e, t, n) {
            "undefined" == typeof n && (n = {});
            var r = this;
            if (this.store.hasOwnProperty(e) && n[e] !== !0) {
                n[e] = !0;
                var i = this.store[e];
                t(i), Object.keys(i.outgoing).forEach(function (e) {
                    r.traverse(e, t, n)
                })
            }
        }, e.prototype.toJSON = function () {
            for (var e = Object.keys(this.store), t = {}, n = {}, r = [], i = 0; i < e.length; i++) {
                var o = e[i];
                t[o] = i, n[i] = o
            }
            for (var i = 0; i < e.length; i++) {
                var o = e[i], s = this.store[o].getOutgoing();
                r.push(i), r.push(s.length);
                for (var a = 0; a < s.length; a++) {
                    var l = s[a], u = t[l];
                    r.push(u)
                }
            }
            return{i: n, g: r}
        }, e.fromJSON = function (t) {
            var n, r, i = new e;
            for (var o in t.i)t.i.hasOwnProperty(o) && (n = t.i[o], i.insertNode(n));
            for (var s = 0, a = t.g.length; a > s; s++)for (n = t.i[t.g[s]], r = t.g[++s]; r > 0;)i.insertEdge(n, t.i[t.g[++s]]), r -= 1;
            return i
        }, e
    }();
    t.Graph = f, t.computeTransitiveClosure = s, t.buildDependencyGraph = a, t.fillGraph = l;
    var m = function () {
        function e(e, t, n) {
            this.offset = e, this.length = t, this.path = n
        }

        return e
    }();
    t.Reference = m;
    var g = function (e) {
        function t() {
            e.apply(this, arguments)
        }

        return __extends(t, e), t.REGEXP = /^(\/\/\/\s*<reference\s+path=)('|")(.+?)\2\s*(static=('|")(.+?)\2\s*)*/im, t
    }(m);
    t.TripleSlashReference = g;
    var y = function (e) {
        function t(t, n, r) {
            e.call(this, t, n, r), this.isRelative = 0 === this.path.indexOf("./") || 0 === this.path.indexOf("../"), this.isRooted = 0 === this.path.indexOf("/"), this.isAbsolute = !this.isRelative && !this.isRooted
        }

        return __extends(t, e), t.TS = ".ts", t.DTS = ".d.ts", t
    }(m);
    t.ImportReference = y;
    var v = function () {
        function e(e, t) {
            this.path = e, this.content = t, this.references = []
        }

        return e.prototype.resolve = function (t, n, r, i) {
            "undefined" == typeof i && (i = {});
            var o = this;
            return this.references = n(this.content), i[this.path] = !0, new h.Promise(function (s, a) {
                var l = o.references.length, u = function () {
                    0 === --l && s(null)
                }, c = function () {
                    l += 1
                };
                return 0 === l ? (s(null), void 0) : (o.references.forEach(function (s) {
                    t.load(o.path, s, r).then(function (o) {
                        o && i[o.path] ? (s.file = o, s.error = {message: "cyclic reference", path: o.path}) : (s.file = o, r.recursive && s.file instanceof e && (c(), o.resolve(t, n, r, i).then(function () {
                            u()
                        }, a))), u()
                    }, function (e) {
                        s.error = e, u()
                    })
                }), void 0)
            })
        }, e
    }();
    t.File = v;
    var T = function () {
        function e(e) {
            this.value = e;
            var t = c.TypeScript.SimpleText.fromString(e);
            this.scanner = new c.TypeScript.Scanner(null, t, c.TypeScript.LanguageVersion.EcmaScript5), this.nextTokens = [], this.offset = 0
        }

        return e.prototype.next = function () {
            if (0 === this.nextTokens.length) {
                var e = this.scanner.scan([], !0), t = e.leadingTrivia(), n = e.trailingTrivia();
                this.scanner.absoluteIndex();
                for (var r = 0, i = t.count(); i > r; r++) {
                    var o = t.syntaxTriviaAt(r);
                    this.add(o.kind(), this.offset, o.fullWidth(), o.fullText()), this.offset += o.fullWidth()
                }
                this.add(e.kind(), this.offset, e.width(), e.valueText()), this.offset += e.width();
                for (var r = 0, i = n.count(); i > r; r++) {
                    var o = n.syntaxTriviaAt(r);
                    this.add(o.kind(), this.offset, o.fullWidth(), o.fullText()), this.offset += o.fullWidth()
                }
            }
            return this.nextTokens.shift()
        }, e.prototype.add = function (e, t, n, r) {
            switch (e) {
                case c.TypeScript.SyntaxKind.WhitespaceTrivia:
                case c.TypeScript.SyntaxKind.NewLineTrivia:
                    return
            }
            this.nextTokens.push({kind: e, offset: t, length: n, text: r})
        }, e
    }(), S = function () {
        function e() {
            this.references = []
        }

        return e.prototype.consume = function (e) {
            function t() {
                return n = i.next()
            }

            for (var n, r = this.references.length, i = new T(e); t().kind !== c.TypeScript.SyntaxKind.EndOfFileToken;)if (n.kind === c.TypeScript.SyntaxKind.ImportKeyword) {
                if (t(), n.kind === c.TypeScript.SyntaxKind.IdentifierName && (t(), n.kind === c.TypeScript.SyntaxKind.EqualsToken && (t(), n.kind === c.TypeScript.SyntaxKind.ModuleKeyword && (t(), n.kind === c.TypeScript.SyntaxKind.OpenParenToken && (t(), n.kind === c.TypeScript.SyntaxKind.StringLiteral))))) {
                    var o = n.text, s = n.offset, a = n.length;
                    t(), n.kind === c.TypeScript.SyntaxKind.CloseParenToken && this.references.push(new y(s + 1, -2 + a, o))
                }
            } else if (n.kind === c.TypeScript.SyntaxKind.SingleLineCommentTrivia) {
                var l = n.text, s = n.offset, a = n.length, u = g.REGEXP.exec(l);
                u && this.references.push(new g(s + u[1].length + u[2].length, u[3].length, u[3]))
            }
            return this.references.slice(r)
        }, e
    }();
    t.ScannerBasedCollector = S, t.collect = u
});
var __extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t)t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype, e.prototype = new n
};
define("vs/languages/typescript/resources/referenceCollection", ["require", "exports", "vs/languages/typescript/service/references", "vs/editor/worker/resourceService", "vs/base/lib/winjs.base", "vs/base/eventEmitter", "vs/editor/core/constants"], function (e, t, n, r, i, o, s) {
    "use strict";
    var a = n, l = i, u = o, c = s, p = function (e) {
        function t(t, n) {
            e.call(this), this.target = t, this.throttleDelay = n, this.throttle = l.Promise.as(null)
        }

        return __extends(t, e), t.prototype.onChange = function (e) {
            var t = this, n = e.some(function (e) {
                switch (e.getType()) {
                    case c.EventType.ModelContentChangedLineChanged:
                    case c.EventType.ModelContentChangedLinesInserted:
                    case c.EventType.ModelContentChangedLinesDeleted:
                    case c.EventType.ModelContentChangedFlush:
                        return!0;
                    default:
                        return!1
                }
            });
            n || (this.throttle.cancel(), this.throttle = l.Promise.timeout(this.throttleDelay), this.throttle.then(function () {
                t.onContentChange()
            }))
        }, t.prototype.onContentChange = function () {
            throw new Error("implement me")
        }, t
    }(u.EventEmitter);
    t.MirrorModelListener = p;
    var h = function (e) {
        function t(t) {
            e.call(this, t, 500), this.references = a.collect(this.target.getValue()), this.referencesVersionId = this.target.versionId
        }

        return __extends(t, e), t.prototype.needsUpdate = function () {
            return this.graph ? this.referencesVersionId > this.graphVersionId ? !0 : !1 : !0
        }, t.prototype.setGraph = function (e, t) {
            this.graph = e, this.graphVersionId = t
        }, t.prototype.getGraph = function () {
            return this.graph
        }, t.prototype.getReferences = function () {
            return this.references
        }, t.prototype.onContentChange = function () {
            function e(e) {
                return e.path + e.offset + e.length
            }

            var n = a.collect(this.target.getValue()), r = !1;
            if (n.length !== this.references.length)r = !0; else {
                var i = {};
                this.references.forEach(function (t) {
                    i[e(t)] = !0
                }), r = n.some(function (t) {
                    return!i[e(t)]
                })
            }
            r && (this.references = n, this.referencesVersionId = this.target.versionId, this.emit(t.EVENTS.OnReferencesChanged, {resource: this.target.getAssociatedResource()}))
        }, t.NAME = "typescript.ReferencesState", t.EVENTS = {OnReferencesChanged: "onReferencesChanged"}, t
    }(p);
    t.ReferencesState = h
}), define("vs/languages/typescript/resources/dependencyResolverDummy", ["require", "exports", "vs/nls!vs/languages/typescript/typescriptWorker2", "vs/base/lib/winjs.base", "vs/base/lifecycle", "vs/languages/typescript/service/references", "vs/editor/core/model/mirrorModel", "vs/platform/markers/markers", "./referenceCollection"], function (e, t, n, r, i, o, s, a, l) {
    "use strict";
    var u = n, c = r, p = i, h = o, d = s, f = a, m = l, g = function () {
        function e(e, t) {
            this.resourceService = e, this.markerService = t, this.callOnDispose = []
        }

        return e.prototype.fetchDependencies = function (e) {
            var t = this, n = this.resourceService.get(e);
            if (!(n instanceof d.MirrorModel))return c.Promise.as([]);
            var r = n, i = this.resourceService.getLinked(e, m.ReferencesState.NAME);
            return i || (i = new m.ReferencesState(r), this.resourceService.insertLinked(e, m.ReferencesState.NAME, i), this.callOnDispose.push(i.addListener(m.ReferencesState.EVENTS.OnReferencesChanged, function (e) {
                return t.onReferenceStateChanged(e)
            })), this.onReferenceStateChanged({resource: e})), c.Promise.as([])
        }, e.prototype.onReferenceStateChanged = function (t) {
            var n = this;
            this.markerService.createPublisher().changeMarkers(t.resource, e.ID, function (e) {
                for (var r = n.resourceService.getLinked(t.resource, m.ReferencesState.NAME), i = r.getReferences(), o = 0, s = i.length; s > o; o++){
                    i[o]instanceof h.TripleSlashReference
                    && i[o].path !== "https://github.com/borisyankov/DefinitelyTyped/blob/master/jquery/jquery.d.ts"
                        && e.addMarker(
                            f.createTextMarker(f.Severity.Error, 1, u.localize("vs_languages_typescript_resources_dependencyResolverDummy", 0), i[o].offset, i[o].length))
                }
            })
        }, e.prototype.dispose = function () {
            p.cAll(this.callOnDispose)
        }, e.ID = "typescript.dependency.nullResolver", e
    }();
    t.DummyDependencyResolver = g
}), define("vs/languages/typescript/resources/dependencyResolver", ["require", "exports", "vs/base/lib/winjs.base", "vs/base/types"], function (e, t, n, r) {
    "use strict";
    var i = n, o = r;
    !function (e) {
        e.OnReferencesChanged = "onReferencesChanged"
    }(t.Events || (t.Events = {})), t.Events;
    var s = function () {
        function e() {
        }

        return e.prototype.fetchDependencies = function () {
            return i.Promise.as([])
        }, e
    }();
    t.NullDependencyResolver = s;
    var a = function () {
        function e(e) {
            this.delegates = e
        }

        return e.prototype.fetchDependencies = function (e) {
            var t = this.delegates.map(function (t) {
                return t.fetchDependencies(e)
            });
            return i.Promise.join(t).then(function (e) {
                for (var t = [], n = 0; n < e.length; n++) {
                    var r = e[n];
                    t.push.apply(t, r)
                }
                return t
            })
        }, e.prototype.dispose = function () {
            for (var e = 0; e < this.delegates.length; e++) {
                var t = this.delegates[e];
                o.isFunction(t.dispose) && t.dispose()
            }
        }, e
    }();
    t.CompositeDependencyResolver = a
});
var __extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t)t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype, e.prototype = new n
};
define("vs/languages/typescript/resources/dependencyResolverFiles", ["require", "exports", "vs/base/lib/winjs.base", "vs/base/network", "vs/base/eventEmitter", "vs/base/arrays", "vs/base/lifecycle", "./remoteModels", "./referenceCollection", "../service/references", "vs/editor/core/model/mirrorModel", "./dependencyResolver", "vs/platform/markers/markers"], function (e, t, n, r, i, o, s, a, l, u, c, p, h) {
    "use strict";
    var d, f = n, m = r, g = i, y = o, v = s, T = a, S = l, b = u, _ = c, E = p, k = h;
    !function (e) {
        function t(e) {
            return e.replace(/\\/g, "/")
        }

        function n(e) {
            var t = e.lastIndexOf("/");
            return-1 === t ? e : e.substring(0, t)
        }

        function r() {
            for (var e = [], t = 0; t < arguments.length - 0; t++)e[t] = arguments[t + 0];
            for (var n = [], r = 0; r < e.length; r++)n.push.apply(n, e[r].split("/"));
            for (var r = 0; r < n.length; r++) {
                var i = n[r];
                "." === i ? (n.splice(r, 1), r -= 1) : r > 0 && ".." === i && (n.splice(r - 1, 2), r -= 2)
            }
            return n.join("/")
        }

        e.normalize = t, e.dirname = n, e.join = r
    }(d || (d = {}));
    var C = function () {
        function e(e, t) {
            this.resourceService = e, this.requestService = t
        }

        return e.prototype.load = function (e, t) {
            var n = this;
            if (!(t instanceof b.TripleSlashReference))return f.Promise.wrapError("only triple slash references are supported");
            var r = new m.URL(d.join(d.dirname(e), d.normalize(t.path))), i = this.requestService.getPath("root", r), o = new m.URL(this.requestService.getRequestUrl("root", i, !0));
            if (this.resourceService.contains(o)) {
                var s = this.resourceService.get(o);
                return f.Promise.as(new b.File(o.toExternal(), s.getValue()))
            }
            return this.requestService.makeRequest({url: o.toExternal()}).then(function (e) {
                var t = new b.File(o.toExternal(), e.responseText), r = new T.RemoteModel(o, e.responseText);
                return n.resourceService.contains(o) || n.resourceService.insert(o, r), t
            })
        }, e.prototype.dispose = function () {
        }, e
    }(), x = function (e) {
        function t(t, n, r) {
            e.call(this), this.resourceService = t, this.requestService = n, this.markerService = r, this.callOnDispose = [], this.fileLoader = new C(t, n), this.loadRecursivelyValue = !0
        }

        return __extends(t, e), t.prototype.dispose = function () {
            v.cAll(this.callOnDispose)
        }, t.prototype.loadRecursively = function (e) {
            return"undefined" != typeof e && (this.loadRecursivelyValue = e), this.loadRecursivelyValue
        }, t.prototype.fetchDependencies = function (e) {
            var t = this;
            if (!e || e.getScheme() === m.schemas.inMemory)return f.Promise.as([]);
            var n = this.resourceService.get(e);
            if (!(n instanceof _.MirrorModel))return f.Promise.as([]);
            var r = n, i = this.resourcesFromReferenceState(r);
            if (i)return f.Promise.as(i);
            var o = this.resourceService.getLinked(e, S.ReferencesState.NAME), s = new b.File(e.toExternal(), r.getValue()), a = r.versionId;
            return b.buildDependencyGraph(this.fileLoader, [s], {recursive: this.loadRecursively(), nodeName: function (e) {
                return e
            }}).then(function (n) {
                var r = [];
                return n.nodes().forEach(function (e) {
                    if (0 === e.getName().indexOf("error:")) {
                        n.removeNode(e.getName());
                        var t = JSON.parse(e.getName().substring(6));
                        r.push(t)
                    }
                }), t.markerService.createPublisher().batchChanges(function (e) {
                    for (var n = 0, i = r.length; i > n; n++) {
                        var o = r[n];
                        if (1 === o.referenceType) {
                            var s = new m.URL(t.requestService.getRequestUrl("root", o.path, !0)), a = k.createTextMarker(k.Severity.Error, 1, o.message, o.offset, o.length);
                            e.changeMarkers(s, function (e) {
                                e.addMarker(a)
                            })
                        }
                    }
                }), o.setGraph(n, a), t.resourcesFromGraph(n, e)
            })
        }, t.prototype.resourcesFromReferenceState = function (e) {
            var t = this, n = e.getAssociatedResource(), r = this.resourceService.getLinked(n, S.ReferencesState.NAME);
            return r ? r.needsUpdate() ? null : this.resourcesFromGraph(r.getGraph(), n) : (r = new S.ReferencesState(e), this.callOnDispose.push(r.addListener(S.ReferencesState.EVENTS.OnReferencesChanged, function (e) {
                return t.onReferenceStateChanged(e)
            })), this.resourceService.insertLinked(n, S.ReferencesState.NAME, r), null)
        }, t.prototype.onReferenceStateChanged = function (e) {
            this.emit(E.Events.OnReferencesChanged, e)
        }, t.prototype.resourcesFromGraph = function (e, t) {
            var n = [];
            return e.traverse(t.toExternal(), function (e) {
                n.unshift(new m.URL(e.getName()))
            }), n.pop(), n
        }, t.ID = "typescript.resolver.file", t
    }(g.EventEmitter);
    t.FileBasedResolver = x;
    var w = function () {
        function t(e, t, n) {
            this.resourceService = e, this.requestService = t, this.delegate = n, this.baselibs = []
        }

        return t.prototype.setBaselibs = function (e) {
            this.baselibs = e
        }, t.prototype.fetchDependencies = function () {
            var n = this, r = [];
            return this.baselibs.forEach(function (i) {
                n.resourceService.contains(i) ? r.push(f.Promise.as(i)) : 0 === i.toExternal().indexOf(t.MODULE_PREFIX) ? r.push(new f.Promise(function (t) {
                    e([i.toExternal()], function (e) {
                        var r = new T.DefaultLibModel(i, e);
                        n.resourceService.insert(i, r), t(i)
                    })
                })) : r.push(n.requestService.makeRequest({url: i.toExternal()}).then(function (e) {
                    var t = new T.DefaultLibModel(i, e.responseText);
                    return n.resourceService.insert(i, t), i
                }, function () {
                    return console.warn("TS - " + i.toExternal() + " can not be loaded as base lib"), null
                }))
            }), f.Promise.join(r).then(function (e) {
                return r = [], e.forEach(function (e) {
                    e && r.push(n.delegate.fetchDependencies(e).then(function (t) {
                        return t.push(e), t
                    }))
                }), f.Promise.join(r)
            }).then(function (e) {
                return y.merge(e)
            })
        }, t.MODULE_PREFIX = "vs/text!", t
    }();
    t.BaselibDependencyResolver = w;
    var A = function () {
        function e(e, t, n, r) {
            this.projectFile = e, this.resourceService = t, this.requestService = n, this.delegate = r, this.loadFailureCount = 0
        }

        return e.prototype.fetchDependencies = function () {
            var e, t = this;
            return this.loadFailureCount >= 3 ? f.Promise.as([]) : (e = this.resourceService.contains(this.projectFile) ? f.Promise.as(this.projectFile) : this.requestService.makeRequest({url: this.projectFile.toExternal()}).then(function (e) {
                var n = new T.DefaultLibModel(t.projectFile, e.responseText);
                return t.resourceService.insert(t.projectFile, n), t.projectFile
            }, function (e) {
                throw t.loadFailureCount++, e
            }), e.then(function () {
                return t.delegate.fetchDependencies(t.projectFile)
            }, function () {
                return f.Promise.as([])
            }))
        }, e
    }();
    t.ProjectFileDependencyResolver = A
});
var __extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t)t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype, e.prototype = new n
};
define("vs/languages/typescript/resources/dependencyResolverGraph", ["require", "exports", "vs/base/lib/winjs.base", "vs/base/strings", "vs/base/env", "vs/base/network", "vs/editor/core/model/mirrorModel", "./remoteModels", "./referenceCollection", "../service/references", "./dependencyResolverFiles", "vs/platform/markers/markers"], function (e, t, n, r, i, o, s, a, l, u, c, p) {
    "use strict";
    var h, d = n, f = r, m = i, g = o, y = s, v = a, T = l, S = u, b = c, _ = p;
    !function (e) {
        function t(e) {
            for (var t, n, r = 0, i = {}; ;) {
                if (t = e.indexOf(":", r), n = e.indexOf("\n", t + 1), 0 > t || 0 > n)break;
                i[e.substring(r, t).trim()] = e.substring(t + 1, n).trim(), r = n + 1
            }
            return i
        }

        function n(e, n) {
            function r(e) {
                if (u)return o("canceled"), void 0;
                var n = e.indexOf("\r\n\r\n", a);
                if (-1 !== n) {
                    var i = t(e.substring(a, n)), c = Number(i["Content-Length"]);
                    n + 4 + c > e.length || (l.push({header: i, body: e.substr(n + 4, c)}), s(l[l.length - 1]), a = n + 4 + c, r(e))
                }
            }

            var i, o, s, a = 0, l = [], u = !1, c = new d.Promise(function (e, t, n) {
                i = e, o = t, s = n
            }, function () {
                u = !0
            });
            return e.makeRequest(n).then(function (e) {
                r(e.responseText), i(l)
            },function (e) {
                o(e)
            },function (e) {
                m.browser.isIE10 || 3 === e.readyState && r(e.responseText)
            }).done(null, function (e) {
                o(e)
            }), c
        }

        e.parseHeader = t, e.fetchChunkedData = n
    }(h || (h = {}));
    var E = function (e) {
        function t() {
            e.apply(this, arguments)
        }

        return __extends(t, e), t.prototype.setModuleSystems = function (e) {
            this.modules = e
        }, t.prototype.onReferenceStateChanged = function (e) {
            var t = this;
            "undefined" != typeof this.delayHandle && clearTimeout(this.delayHandle), this.delayHandle = setTimeout(function () {
                t.superOnReferenceStateChanged(e)
            }, 1e3)
        }, t.prototype.superOnReferenceStateChanged = function (t) {
            e.prototype.onReferenceStateChanged.call(this, t)
        }, t.prototype.fetchDependencies = function (t) {
            var n = this;
            if (!t)return d.Promise.as([]);
            var r = this.requestService.getPath("root", t);
            if (!r)return e.prototype.fetchDependencies.call(this, t);
            var i = this.resourceService.get(t);
            if (!(i instanceof y.MirrorModel))return d.Promise.as([]);
            var o = i, s = this.resourcesFromReferenceState(o);
            if (s)return d.Promise.as(s);
            var a = this.builtRequestUrl(t, "typeScriptDependencyGraph"), l = o.versionId, u = this.resourceService.getLinked(t, T.ReferencesState.NAME);
            return this.requestService.makeRequest({url: a}).then(function (e) {
                var r = JSON.parse(e.responseText), i = [], o = n.parseGraph(r, i);
                return n.markerService.createPublisher().batchChanges(function (e) {
                    for (var t = 0, r = i.length; r > t; t++) {
                        var o = i[t];
                        if (1 === o.referenceType) {
                            var s = new g.URL(n.requestService.getRequestUrl("root", o.path, !0)), a = _.createTextMarker(_.Severity.Error, 1, o.message, o.offset, o.length);
                            e.changeMarkers(s, function (e) {
                                e.addMarker(a)
                            })
                        }
                    }
                }), u.setGraph(o, l), n.resourcesFromGraph(o, t)
            }).then(function (e) {
                for (var t = [], r = 0; r < e.length; r++)n.resourceService.contains(e[r]) || t.push(n.requestService.getPath("root", e[r]));
                return 0 === t.length ? d.Promise.as(e) : h.fetchChunkedData(n.requestService, {type: "POST", url: n.requestService.getRequestUrl("typeScriptFiles"), headers: {"Content-Type": "application/json"}, data: JSON.stringify(t)}).then(function () {
                    return e
                }, function () {
                    return e
                }, function (e) {
                    if ("undefined" == typeof e.header.IsError) {
                        var t = e.header.Path, r = new g.URL(n.requestService.getRequestUrl("root", t, !0)), i = new v.RemoteModel(r, e.body);
                        n.resourceService.contains(r) || n.resourceService.insert(r, i)
                    }
                })
            })
        }, t.prototype.builtRequestUrl = function (e, t) {
            var n = this.requestService.getPath("root", e), r = this.modules.getModuleConfiguration(e), i = f.format("{0}?type={1}&baseurl={2}", this.requestService.getRequestUrl(t, n), encodeURIComponent(r.moduleType), encodeURIComponent(r.baseurl));
            return this.loadRecursively() || (i += "&flat"), i
        }, t.prototype.parseGraph = function (e, t) {
            for (var n = this.requestService.getRequestUrl("root", "", !0), r = Object.keys(e.i), i = 0; i < r.length; i++)0 !== e.i[r[i]].indexOf("error:") && (e.i[r[i]] = n + e.i[r[i]].substring(1));
            for (var o = S.Graph.fromJSON(e), s = o.nodes(), i = 0; i < s.length; i++) {
                var a = s[i];
                0 === a.getName().indexOf("error:") && (o.removeNode(a.getName()), t.push(JSON.parse(a.getName().substring(6))))
            }
            return o
        }, t.ID = "typescript.graphResolver", t
    }(b.FileBasedResolver);
    t.GraphBasedResolver = E
});
var __extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t)t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype, e.prototype = new n
};
define("vs/languages/typescript/typescriptWorker2", ["require", "exports", "vs/base/lib/winjs.base", "vs/base/objects", "vs/base/network", "vs/base/strings", "vs/base/errors", "vs/base/lifecycle", "vs/editor/worker/modesWorker", "vs/editor/core/model/mirrorModel", "vs/languages/typescript/service/languageServiceAdapter", "vs/languages/typescript/service/languageServiceHost2", "vs/languages/typescript/resources/remoteModels", "vs/languages/typescript/lib/typescriptServices", "./resources/moduleConfiguration", "vs/languages/typescript/resources/dependencyResolverFiles", "vs/languages/typescript/resources/dependencyResolverGraph", "vs/languages/typescript/resources/dependencyResolverDummy", "vs/languages/typescript/resources/dependencyResolver"], function (e, t, n, r, i, o, s, a, l, u, c, p, h, d, f, m, g, y, v) {
    "use strict";
    var T = n, S = r, b = i, _ = o, E = s, k = a, C = l, x = u, w = c, A = p, L = h, N = d, I = f, M = m, O = g, D = y, P = v, R = function (e) {
        function t() {
            e.call(this), this.shouldEmitStatus = !1, this.callOnDispose = [], this.validationId = "typescript.worker.syntactic=true.semantic=true"
        }

        return __extends(t, e), t.prototype.dispose = function () {
            k.cAll(this.callOnDispose), this.noDependencyResolver.dispose(), this.fileDependencyResolver.dispose(), this.projectDependencyResolver.dispose()
        }, t.prototype.injectTelemetryService = function (e) {
            this.telemetryService = e
        }, t.prototype.injectRequestService = function (e) {
            this.requestService = e
        }, t.prototype.injectResourceService = function (t) {
            e.prototype.injectResourceService.call(this, t), this.host = new A.LanguageServiceHost, this.host.resourceService = t;
            var n = new N.Services.LanguageService(this.host);
            this.adapter = new w.LanguageServiceAdapter(this.host, n, t)
        }, t.prototype.setExtraData = function (e) {
            this.extraData = S.mixin(S.clone(t.defaultExtraData), e || {}), this.validationId = _.format("typescript.worker.syntactic={0}.semantic={1}", this.extraData.syntacticValidation, this.extraData.semanticValidation)
        }, t.prototype.configure = function (e) {
            this.delays = S.clone(t.defaultDelays), this.options = S.mixin(S.clone(t.defaultOptions), e || {}), this.options.extraBaseLibs.unshift("vs/text!vs/languages/typescript/lib/lib.d.ts");
            var n = new N.TypeScript.CompilationSettings;
            return n.codeGenTarget = N.TypeScript.LanguageVersion.EcmaScript5, n.moduleGenTarget = N.TypeScript.ModuleGenTarget.Asynchronous, this.host.compilationSettings = n, this.adapter.setSuggestConfiguration({useCodeSnippetsOnMethodSuggest: this.options.completeFunctionsAsInvocation}), this.adapter.lintConfiguration = this.options.lint, this.createDependencyResolver(), T.Promise.as(null)
        }, t.prototype.createDependencyResolver = function () {
            var e = this, t = function (t) {
                "undefined" == typeof t && (t = !0);
                var n;
                if (e.requestService.getRequestUrl("typeScriptDependencyGraph")) {
                    var r = new I.ModuleSystemConfigurations(e.requestService, e.options.moduleSystems), i = new O.GraphBasedResolver(e.resourceService, e.requestService, e.markerService);
                    i.setModuleSystems(r), n = i
                } else n = e.requestService.getRequestUrl("root") ? new M.FileBasedResolver(e.resourceService, e.requestService, e.markerService) : new D.DummyDependencyResolver(e.resourceService, e.markerService);
                return n instanceof M.FileBasedResolver && (e.callOnDispose.push(n.addListener(P.Events.OnReferencesChanged, function (t) {
                    e.validate(t.resource)
                })), n.loadRecursively(t)), n
            };
            this.noDependencyResolver = new P.NullDependencyResolver;
            var n = new M.BaselibDependencyResolver(this.resourceService, this.requestService, t());
            if (n.setBaselibs(this.options.extraBaseLibs.map(function (e) {
                return new b.URL(e)
            })), this.fileDependencyResolver = new P.CompositeDependencyResolver([n, t()]), this.projectDependencyResolver = this.fileDependencyResolver, this.requestService.getRequestUrl("root")) {
                var r = new M.ProjectFileDependencyResolver(new b.URL(this.requestService.getRequestUrl("root", "all.references.ts", !0)), this.resourceService, this.requestService, t(!1));
                this.projectDependencyResolver = new P.CompositeDependencyResolver([this.fileDependencyResolver, r])
            }
        }, t.prototype.getHost = function () {
            return this.host
        }, t.prototype.fetchDependenciesAndUpdateLanguageService = function (e, t) {
            var n = this, r = !1;
            return new T.Promise(function (i, o) {
                t.fetchDependencies(e).then(function (t) {
                    return r ? (o({name: "Canceled"}), void 0) : (e && t.push(e), n.host.updateResources(t), void 0)
                }).then(function () {
                    try {
                        n.doUpdateLanguageService(), i(n)
                    } catch (e) {
                        o(e)
                    }
                }, o)
            }, function () {
                r = !0
            })
        }, t.prototype.doUpdateLanguageService = function () {
            if (this.currentError)throw{name: "Canceled", message: "updating language service BLOCK because current state caused errors"}
        }, t.prototype.onError = function (e, t) {
            var n = this;
            if ("Canceled" !== t.name) {
                this.telemetryService.log("typescript.languageService.update.failure", {detail: E.toErrorMessage(t, !0)}), console.error("ERROR updating language service (file a bug against TypeScript)"), console.error(t), this.currentError = t;
                var r;
                r = this.resourceService.addBulkListener(function () {
                    r(), n.currentError = null, console.warn("creating NEW language service after last update failed");
                    var e = new N.Services.LanguageService(n.host);
                    n.adapter.setLanguageService(e)
                })
            }
            return e
        }, t.prototype.setStatusReporting = function (e) {
            this.shouldEmitStatus = e
        }, t.prototype.emitStatus = function (e) {
            this.shouldEmitStatus && this.publisher.sendMessage("ts.statusUpdate", {status: e})
        }, t.prototype.run = function (e, t, n, r) {
            "undefined" == typeof r && (r = null);
            var i = this;
            return this.emitStatus(3), this.fetchDependenciesAndUpdateLanguageService(e, t).then(function () {
                try {
                    i.emitStatus(1);
                    var e = n();
                    return i.emitStatus(0), e
                } catch (t) {
                    return i.emitStatus(2), i.onError(r, t)
                }
            }, function (e) {
                return i.emitStatus(2), i.onError(r, e)
            })
        }, t.prototype.doValidate = function (t, n) {
            var r = this;
            this.extraData.syntacticValidation && this.run(t, this.noDependencyResolver, function () {
                n.changeMarkers(t, r.validationId, function (e) {
                    var n = r.adapter.getSyntacticDiagnostics(t);
                    n.forEach(function (t) {
                        e.addMarker(t)
                    })
                })
            }), this.extraData.semanticValidation && (this.run(t, this.fileDependencyResolver, function () {
                n.changeMarkers(t, r.validationId, function (e) {
                    var n = r.adapter.getSemanticDiagnostics(t);
                    n.forEach(function (t) {
                        e.addMarker(t)
                    })
                })
            }), this.run(t, this.noDependencyResolver, function () {
                n.changeMarkers(t, function (e) {
                    var n = r.adapter.getExtraDiagnostic(t);
                    n.forEach(function (t) {
                        e.addMarker(t)
                    })
                })
            })), "undefined" != typeof this.fullCheckHandle && clearTimeout(this.fullCheckHandle), this.fullCheckHandle = setTimeout(function () {
                e.prototype.triggerValidateParticipation.call(r, t, n, r.adapter.getLanguageSerivce()), r.resourceService.all().filter(function (e) {
                    return e instanceof x.MirrorModel ? e instanceof L.RemoteModel ? !1 : !0 : !1
                }).map(function (e) {
                    return e.getAssociatedResource()
                }).forEach(function (e) {
                    if (r.host.isScriptFileName(e.toExternal()) && e.toExternal() !== t.toExternal()) {
                        var i = r.extraData.syntacticValidation ? r.adapter.getSyntacticDiagnostics(e) : [], o = r.extraData.semanticValidation ? r.adapter.getSemanticDiagnostics(e) : [];
                        n.changeMarkers(e, r.validationId, function (e) {
                            i.forEach(function (t) {
                                e.addMarker(t)
                            }), o.forEach(function (t) {
                                e.addMarker(t)
                            })
                        })
                    }
                })
            }, 0)
        }, t.prototype.doSuggest = function (e, t) {
            var n = this;
            return this.run(e, this.fileDependencyResolver, function () {
                return n.adapter.suggest(e, t)
            }, [])
        }, t.prototype.getSuggestionDetails = function (e, t, n) {
            var r = this;
            return this.run(e, this.fileDependencyResolver, function () {
                return r.adapter.getSuggestionDetails(e, t, n)
            }, n)
        }, t.prototype.quickFix = function (e, t) {
            var n = this;
            return this.run(e, this.fileDependencyResolver, function () {
                return n.adapter.quickFix(e, t)
            }, [])
        }, t.prototype.getParameterHints = function (e, t) {
            var n = this;
            return this.run(e, this.fileDependencyResolver, function () {
                return n.adapter.getParameterHints(e, t)
            })
        }, t.prototype.getEmitOutput = function (e, t) {
            var n = this;
            return this.run(e, this.noDependencyResolver, function () {
                return n.adapter.getEmitOutput(e, t)
            })
        }, t.prototype.format = function (e, t, n) {
            var r = this;
            return this.run(e, this.noDependencyResolver, function () {
                return r.adapter.format(e, t, n)
            }, "")
        }, t.prototype.formatAfterKeystroke = function (e, t, n) {
            var r = this;
            return this.run(e, this.noDependencyResolver, function () {
                return r.adapter.formatAfterKeystroke(e, t, n)
            }, null)
        }, t.prototype.getActionsAtPosition = function (e, t) {
            var n = this;
            return this.run(e, this.noDependencyResolver, function () {
                return n.adapter.getActionsAtPosition(e, t)
            }, [])
        }, t.prototype.getOutline = function (e) {
            var t = this;
            return this.run(e, this.fileDependencyResolver, function () {
                return t.adapter.getOutline(e)
            }, [])
        }, t.prototype.getNavigateToItems = function (e) {
            var t = this;
            return this.run(null, this.noDependencyResolver, function () {
                return t.adapter.getNavigateToItems(e)
            }, [])
        }, t.prototype.findOccurrences = function (e, t, n) {
            var r = this;
            return this.run(e, this.fileDependencyResolver, function () {
                return r.adapter.findOccurrences(e, t, n)
            }, [])
        }, t.prototype.findDeclaration = function (e, t) {
            var n = this;
            return this.run(e, this.fileDependencyResolver, function () {
                return n.adapter.findDeclaration(e, t)
            })
        }, t.prototype.findTypeDeclaration = function (e, t) {
            var n = this;
            return this.run(e, this.fileDependencyResolver, function () {
                return n.adapter.findTypeDeclaration(e, t)
            })
        }, t.prototype.findReferences = function (e, t) {
            var n = this, r = !0;
            return this.run(e, this.fileDependencyResolver,function () {
                return r = n.adapter.isExternallyVisibleSymbole(e, t), []
            }, []).then(function () {
                var i = r ? n.projectDependencyResolver : n.fileDependencyResolver;
                return n.run(e, i, function () {
                    return n.adapter.findReferences(e, t)
                }, [])
            })
        }, t.prototype.computeInfo = function (e, t) {
            var n = this;
            return this.run(e, this.fileDependencyResolver, function () {
                return n.adapter.getTypeInformationAtPosition(e, t)
            })
        }, t.prototype.getRangesToPosition = function (e, t) {
            var n = this;
            return this.run(e, this.noDependencyResolver, function () {
                return n.adapter.getRangesToPosition(e, t)
            }, [])
        }, t.prototype.textReplace = function (e, t) {
            var n = [
                ["true", "false"],
                ["string", "number", "boolean"],
                ["private", "public"]
            ];
            return this.valueSetsReplace(n, e, t)
        }, t.defaultOptions = {lint: {}, moduleSystems: {"/": {type: "commonjs"}}, extraBaseLibs: [], showTypeScriptWarnings: !1, completeFunctionsAsInvocation: !1}, t.defaultExtraData = {resolveDependencies: !0, syntacticValidation: !1, semanticValidation: !0}, t.defaultDelays = {updateSoon: 500, validateSoon: 500}, t
    }(C.AbstractWorkerMode);
    t.TypeScriptWorker2 = R, t.value = new R
});