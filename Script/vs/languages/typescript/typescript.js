/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
var __extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t)t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype, e.prototype = new n
};
define("vs/languages/vsxml/vsxml", ["require", "exports", "vs/base/objects", "vs/base/errors", "vs/editor/modes/modesExtensions"], function (e, t, n, r, i) {
    "use strict";
    var o = n, s = r, a = i, l = '<>"=/', u = "	 ", c = o.createKeywordMatcher(["summary", "reference", "returns", "param", "loc"]), p = o.createKeywordMatcher(["type", "path", "name", "locid", "filename", "format", "optional"]), h = o.createKeywordMatcher(l.split("")), d = function (e) {
        function t(t, n, r) {
            e.call(this, t), this.state = n, this.parentState = r
        }

        return __extends(t, e), t.prototype.getParentState = function () {
            return this.parentState
        }, t.prototype.makeClone = function () {
            return new t(this.getMode(), null === this.state ? null : this.state.clone(), null === this.parentState ? null : this.parentState.clone())
        }, t.prototype.equals = function (n) {
            if (!e.prototype.equals.call(this, n))return!1;
            if (!(n instanceof t))return!1;
            var r = n;
            return null === this.state && null === r.state ? !0 : null === this.state || null === r.state ? !1 : null === this.parentState && null === r.parentState ? !0 : null === this.parentState || null === r.parentState ? !1 : this.state.equals(r.state) && this.parentState.equals(r.parentState)
        }, t.prototype.setState = function (e) {
            this.state = e
        }, t.prototype.postTokenize = function (e) {
            return e
        }, t.prototype.tokenize = function (e) {
            var t = this.state.tokenize(e);
            return void 0 !== t.nextState && this.setState(t.nextState), t.nextState = this, this.postTokenize(t, e)
        }, t
    }(a.AbstractState);
    t.EmbeddedState = d;
    var f = function (e) {
        function t(t, n, r) {
            e.call(this, t, n, r)
        }

        return __extends(t, e), t.prototype.setState = function (t) {
            e.prototype.setState.call(this, t), this.getParentState().setVSXMLState(t)
        }, t.prototype.postTokenize = function (e, t) {
            return t.eos() && (e.nextState = this.getParentState()), e
        }, t
    }(d);
    t.VSXMLEmbeddedState = f;
    var m = function (e) {
        function t(t, n, r, i) {
            "undefined" == typeof i && (i = ""), e.call(this, t), this.name = n, this.parent = r, this.whitespaceTokenType = i
        }

        return __extends(t, e), t.prototype.equals = function (n) {
            return e.prototype.equals.call(this, n) ? n instanceof t && this.getMode() === n.getMode() && this.name === n.name && (null === this.parent && null === n.parent || null !== this.parent && this.parent.equals(n.parent)) : !1
        }, t.prototype.tokenize = function (e) {
            return e.setTokenRules(l, u), e.skipWhitespace().length > 0 ? {type: this.whitespaceTokenType} : this.stateTokenize(e)
        }, t.prototype.stateTokenize = function () {
            throw s.notImplemented()
        }, t
    }(a.AbstractState);
    t.VSXMLState = m;
    var g = function (e) {
        function t(t, n) {
            e.call(this, t, "string", n, "attribute.value.vs")
        }

        return __extends(t, e), t.prototype.makeClone = function () {
            return new t(this.getMode(), this.parent ? this.parent.clone() : null)
        }, t.prototype.stateTokenize = function (e) {
            for (; !e.eos();) {
                var t = e.nextToken();
                if ('"' === t)return{type: "attribute.value.vs", nextState: this.parent}
            }
            return{type: "attribute.value.vs", nextState: this.parent}
        }, t
    }(m);
    t.VSXMLString = g;
    var y = function (e) {
        function t(t, n) {
            e.call(this, t, "expression", n, "vs")
        }

        return __extends(t, e), t.prototype.makeClone = function () {
            return new t(this.getMode(), this.parent ? this.parent.clone() : null)
        }, t.prototype.stateTokenize = function (e) {
            var t = e.nextToken(), n = this.whitespaceTokenType;
            return">" === t ? {type: "delimiter.vs", nextState: this.parent} : '"' === t ? {type: "attribute.value.vs", nextState: new g(this.getMode(), this)} : (c(t) ? n = "tag.vs" : p(t) ? n = "attribute.name.vs" : h(t) && (n = "delimiter.vs"), {type: n, nextState: this})
        }, t
    }(m);
    t.VSXMLTag = y;
    var v = function (e) {
        function t(t, n) {
            e.call(this, t, "expression", n, "vs")
        }

        return __extends(t, e), t.prototype.makeClone = function () {
            return new t(this.getMode(), this.parent ? this.parent.clone() : null)
        }, t.prototype.stateTokenize = function (e) {
            var t = e.nextToken();
            return"<" === t ? {type: "delimiter.vs", nextState: new y(this.getMode(), this)} : {type: this.whitespaceTokenType, nextState: this}
        }, t
    }(m);
    t.VSXMLExpression = v
}), define("vs/languages/javascript/jsdoc", ["require", "exports", "vs/editor/modes/modes", "vs/base/strings", "vs/base/arrays"], function (e, t, n, r, i) {
    "use strict";
    function o(e, t, n) {
        var r = e[n];
        if ("*" !== r)return null;
        if (e.indexOf("*/", n) > -1)return null;
        for (var i = null, o = 0; o < t.length; o++) {
            var s = t[o];
            if (s.startIndex > n)break;
            i = s
        }
        return i ? l.startsWith(s.type, "comment.doc") ? "/*" !== e.substring(i.startIndex, n) ? null : {appendText: "*/"} : null : null
    }

    function s(e, t, n) {
        var r, i, o = u.findIndexInSegmentsArray(t, n), s = t[o];
        return s ? l.startsWith(s.type, "comment.doc") ? (r = e.indexOf("/**"), i = e.indexOf("*/"), -1 === r && -1 === i ? {indentAction: a.IndentAction.None, appendText: "* "} : -1 !== r && n >= r + 3 && -1 !== i && i >= n ? {indentAction: a.IndentAction.IndentOutdent, appendText: " * ", indentOutdentAppendText: " "} : -1 !== r && n >= r + 3 ? {indentAction: a.IndentAction.None, appendText: " * "} : null) : null : null
    }

    var a = n, l = r, u = i;
    t.onElectricCharacter = o, t.onEnter = s
});
var __extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t)t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype, e.prototype = new n
};
define("vs/languages/typescript/typescript", ["require", "exports", "vs/editor/modes/autoIndentation/autoIndentation", "vs/editor/modes/modes", "vs/editor/modes/modesExtensions", "vs/languages/vsxml/vsxml", "vs/languages/javascript/jsdoc", "./lib/typescriptServices", "vs/base/objects", "vs/base/env", "vs/base/arrays"], function (e, t, n, r, i, o, s, a, l, u, c) {
    "use strict";
    var p = n, h = r, d = i, f = o, m = s, g = a, y = l, v = u, T = c, S = new p.Brackets([
        {tokenType: "delimiter.bracket.ts", open: "{", close: "}", isElectric: !0},
        {tokenType: "delimiter.array.ts", open: "[", close: "]", isElectric: !0},
        {tokenType: "delimiter.parenthesis.ts", open: "(", close: ")", isElectric: !0}
    ]);
    !function (e) {
        !function (e) {
            e[e.Start = 0] = "Start", e[e.InMultiLineCommentTrivia = 1] = "InMultiLineCommentTrivia", e[e.InDocMultiLineCommentTrivia = 2] = "InDocMultiLineCommentTrivia", e[e.InSingleQuoteStringLiteral = 3] = "InSingleQuoteStringLiteral", e[e.InDoubleQuoteStringLiteral = 4] = "InDoubleQuoteStringLiteral"
        }(e.EndOfLineState || (e.EndOfLineState = {}));
        var t = e.EndOfLineState, n = [];
        n[g.TypeScript.SyntaxKind.IdentifierName] = !0, n[g.TypeScript.SyntaxKind.StringLiteral] = !0, n[g.TypeScript.SyntaxKind.NumericLiteral] = !0, n[g.TypeScript.SyntaxKind.RegularExpressionLiteral] = !0, n[g.TypeScript.SyntaxKind.ThisKeyword] = !0, n[g.TypeScript.SyntaxKind.PlusPlusToken] = !0, n[g.TypeScript.SyntaxKind.MinusMinusToken] = !0, n[g.TypeScript.SyntaxKind.CloseParenToken] = !0, n[g.TypeScript.SyntaxKind.CloseBracketToken] = !0, n[g.TypeScript.SyntaxKind.CloseBraceToken] = !0, n[g.TypeScript.SyntaxKind.TrueKeyword] = !0, n[g.TypeScript.SyntaxKind.FalseKeyword] = !0;
        var r = function () {
            function e() {
                this.characterWindow = g.TypeScript.ArrayUtilities.createArray(2048, 0), this.diagnostics = []
            }

            return e.prototype.getClassificationsForLine = function (e, r) {
                var o = 0;
                r !== t.Start && (r === t.InDoubleQuoteStringLiteral ? e = '"\\\n' + e : r === t.InSingleQuoteStringLiteral ? e = "'\\\n" + e : r === t.InMultiLineCommentTrivia ? e = "/*\n" + e : r === t.InDocMultiLineCommentTrivia && (e = "/**\n" + e), o = 3);
                var s = new i;
                this.scanner = new g.TypeScript.Scanner("", g.TypeScript.SimpleText.fromString(e), g.TypeScript.LanguageVersion.EcmaScript5, this.characterWindow);
                for (var a = g.TypeScript.SyntaxKind.None; this.scanner.absoluteIndex() < e.length;) {
                    this.diagnostics.length = 0;
                    var l = this.scanner.scan(this.diagnostics, !n[a]);
                    a = l.tokenKind, this.processToken(e, o, l, s)
                }
                return s
            }, e.prototype.processToken = function (e, n, r, i) {
                if (this.processTriviaList(e, n, r.leadingTrivia(), i), this.addResult(e, n, i, r.width(), r.tokenKind, r.valueText()), this.processTriviaList(e, n, r.trailingTrivia(), i), this.scanner.absoluteIndex() >= e.length) {
                    if (this.diagnostics.length > 0 && this.diagnostics[this.diagnostics.length - 1].diagnosticKey() === g.TypeScript.DiagnosticCode._StarSlash__expected)return i.finalLexState = -1 !== e.indexOf("/**") ? t.InDocMultiLineCommentTrivia : t.InMultiLineCommentTrivia, void 0;
                    if (r.tokenKind === g.TypeScript.SyntaxKind.StringLiteral) {
                        var o = r.text();
                        if (o.length > 0 && o.charCodeAt(o.length - 1) === g.TypeScript.CharacterCodes.backslash) {
                            var s = o.charCodeAt(0);
                            return i.finalLexState = s === g.TypeScript.CharacterCodes.doubleQuote ? t.InDoubleQuoteStringLiteral : t.InSingleQuoteStringLiteral, void 0
                        }
                    }
                }
            }, e.prototype.processTriviaList = function (e, t, n, r) {
                for (var i = 0, o = n.count(); o > i; i++) {
                    var s = n.syntaxTriviaAt(i);
                    this.addResult(e, t, r, s.fullWidth(), s.kind(), s.fullText())
                }
            }, e.prototype.addResult = function (e, t, n, r, i, s) {
                r > 0 && (0 === n.entries.length && (r -= t), n.entries.push(new o(r, i, s)))
            }, e
        }();
        e.Classifier = r;
        var i = function () {
            function e() {
                this.finalLexState = t.Start, this.entries = []
            }

            return e
        }();
        e.ClassificationResult = i;
        var o = function () {
            function e(e, t, n) {
                if (this.length = e, this.type = "", this.bracket = h.Bracket.None, S.characterIsBracket(n))this.bracket = S.bracketTypeFromChar(n), this.type = S.tokenTypeFromChar(n); else if (g.TypeScript.SyntaxFacts.isAnyPunctuation(t))this.type = "delimiter.ts"; else if (g.TypeScript.SyntaxFacts.isAnyKeyword(t))switch (t) {
                    case g.TypeScript.SyntaxKind.IfKeyword:
                    case g.TypeScript.SyntaxKind.ElseKeyword:
                    case g.TypeScript.SyntaxKind.CaseKeyword:
                    case g.TypeScript.SyntaxKind.WhileKeyword:
                    case g.TypeScript.SyntaxKind.DoKeyword:
                    case g.TypeScript.SyntaxKind.BreakKeyword:
                    case g.TypeScript.SyntaxKind.ContinueKeyword:
                    case g.TypeScript.SyntaxKind.ReturnKeyword:
                    case g.TypeScript.SyntaxKind.ThrowKeyword:
                        this.type = "keyword.flow.ts";
                        break;
                    case g.TypeScript.SyntaxKind.ExportKeyword:
                    case g.TypeScript.SyntaxKind.PublicKeyword:
                    case g.TypeScript.SyntaxKind.PrivateKeyword:
                        this.type = "keyword.visibility.ts";
                        break;
                    case g.TypeScript.SyntaxKind.VarKeyword:
                    case g.TypeScript.SyntaxKind.ClassKeyword:
                    case g.TypeScript.SyntaxKind.InterfaceKeyword:
                    case g.TypeScript.SyntaxKind.EnumKeyword:
                    case g.TypeScript.SyntaxKind.FunctionKeyword:
                    case g.TypeScript.SyntaxKind.ModuleKeyword:
                    case g.TypeScript.SyntaxKind.StaticKeyword:
                    case g.TypeScript.SyntaxKind.ImportKeyword:
                        this.type = "keyword.declare.ts";
                        break;
                    case g.TypeScript.SyntaxKind.BoolKeyword:
                    case g.TypeScript.SyntaxKind.BooleanKeyword:
                    case g.TypeScript.SyntaxKind.NumberKeyword:
                    case g.TypeScript.SyntaxKind.StringKeyword:
                    case g.TypeScript.SyntaxKind.AnyKeyword:
                        this.type = "keyword.datatype.ts";
                        break;
                    case g.TypeScript.SyntaxKind.NullKeyword:
                        this.type = "keyword.null.ts";
                        break;
                    default:
                        this.type = "keyword.ts"
                } else {
                    switch (t) {
                        case g.TypeScript.SyntaxKind.MultiLineCommentTrivia:
                            this.type = n.length >= 3 && "*" === n.charAt(2) ? "comment.doc.ts" : "comment.block.ts";
                            break;
                        case g.TypeScript.SyntaxKind.SingleLineCommentTrivia:
                            this.type = "comment.line.ts"
                    }
                    switch (t) {
                        case g.TypeScript.SyntaxKind.StringLiteral:
                            this.type = "string.ts";
                            break;
                        case g.TypeScript.SyntaxKind.NumericLiteral:
                            this.type = "number.ts";
                            break;
                        case g.TypeScript.SyntaxKind.RegularExpressionLiteral:
                            this.type = "regexp.ts"
                    }
                }
            }

            return e
        }();
        e.ClassificationInfo = o
    }(t.TypeScriptClassifier || (t.TypeScriptClassifier = {}));
    var b = t.TypeScriptClassifier, _ = function (e) {
        function t(t, n, r, i) {
            e.call(this, t), this.lineTokens = n, this.vsState = r, this.classifier = new b.Classifier, this.endOfLineState = i
        }

        return __extends(t, e), t.prototype.setVSXMLState = function (e) {
            this.vsState = e
        }, t.prototype.makeClone = function () {
            return new t(this.getMode(), y.clone(this.lineTokens), this.vsState.clone(), this.endOfLineState)
        }, t.prototype.equals = function (n) {
            return e.prototype.equals.call(this, n) && n instanceof t && this.getMode() === n.getMode() && this.endOfLineState === n.endOfLineState && y.equals(this.lineTokens, n.lineTokens) && this.vsState.equals(n.vsState)
        }, t.prototype.tokenize = function (e) {
            if (0 === this.lineTokens.length) {
                if (e.advanceIfRegExp(/^\s*\/\/\//).length > 0)return e.eos() ? {type: "comment.vs"} : "/" === e.peek() ? (e.advanceToEOS(), {type: "comment.ts"}) : {type: "comment.vs", nextState: new f.VSXMLEmbeddedState(this.getMode(), this.vsState, this)};
                var t = e.advanceToEOS();
                e.goBack(t.length);
                var n = this.classifier.getClassificationsForLine(t, this.endOfLineState);
                this.endOfLineState = n.finalLexState, this.lineTokens = n.entries
            }
            if (this.lineTokens.length > 0) {
                var r = this.lineTokens.shift();
                return e.advance(r.length), r
            }
            return e.advanceToEOS(), {type: ""}
        }, t
    }(d.AbstractState);
    t.TypeScriptState = _;
    var E = function () {
        function e(e) {
            this.mode = e
        }

        return e.prototype.findReferences = function (e, t) {
            return this.mode.request("findReferences", this.mode.bigWorker, e, t)
        }, e.prototype.getNavigateToItems = function (e) {
            return this.mode.request("getNavigateToItems", this.mode.bigWorker, e)
        }, e.prototype.quickFix = function (e, t) {
            return this.mode.request("quickFix", this.mode.smallWorker, e, t)
        }, e.prototype.getRangesToPosition = function (e, t) {
            return this.mode.request("getRangesToPosition", this.mode.smallWorker, e, t)
        }, e.prototype.findDeclaration = function (e, t) {
            return this.mode.request("findDeclaration", this.mode.smallWorker, e, t)
        }, e.prototype.findTypeDeclaration = function (e, t) {
            return this.mode.request("findTypeDeclaration", this.mode.smallWorker, e, t)
        }, e.prototype.computeInfo = function (e, t) {
            return this.mode.request("computeInfo", this.mode.smallWorker, e, t)
        }, e.prototype.getActionsAtPosition = function (e, t) {
            return this.mode.request("getActionsAtPosition", this.mode.smallWorker, e, t)
        }, e.prototype.getAutoFormatTriggerCharacters = function () {
            return[";"]
        }, e.prototype.format = function (e, t, n) {
            return this.mode.request("format", this.mode.smallWorker, e, t, n)
        }, e.prototype.formatAfterKeystroke = function (e, t, n) {
            return this.mode.request("formatAfterKeystroke", this.mode.smallWorker, e, t, n)
        }, e
    }(), C = function (e) {
        function t() {
            e.call(this, "vs.languages.typescript", v.browser.hasWorkers ? "vs/languages/typescript/typescriptWorker2" : "vs/languages/typescript/typescriptWorkerMonitored");
            var t = new E(this);
            this.referenceSupport = t, this.navigateTypesSupport = t, this.extraInfoSupport = t, this.inEditorActionsSupport = t, this.formattingSupport = t, this.declarationSupport = t, this.quickFixSupport = t, this.logicalSelectionSupport = t, this.parameterHintsSupport = this, this.outlineSupport = this
        }

        return __extends(t, e), t.prototype.newWorker = function (t) {
            return"undefined" == typeof t && (t = {}), v.browser.hasWorkers ? (this.smallWorker = e.prototype.newWorker.call(this, {syntacticValidation: !0, semanticValidation: !1}, "ts-1"), this.bigWorker = e.prototype.newWorker.call(this, {syntacticValidation: !1, semanticValidation: !0}, "ts-2")) : (this.bigWorker = e.prototype.newWorker.call(this, {syntacticValidation: !0, semanticValidation: !0}, "ts-1"), this.smallWorker = this.bigWorker), this.smallWorker
        }, t.prototype.getInitialState = function () {
            return new _(this, [], new f.VSXMLExpression(this, null), b.EndOfLineState.Start)
        }, t.prototype.getNonWordTokenTypes = function () {
            return["delimiter.ts", "delimiter.parenthesis.ts", "delimiter.bracket.ts", "delimiter.array.ts"]
        }, t.prototype.getElectricCharacters = function () {
            return["*"].concat(S.getElectricBrackets())
        }, t.prototype.getAutoClosingPairs = function () {
            return[
                {open: "{", close: "}"},
                {open: "[", close: "]"},
                {open: "(", close: ")"},
                {open: '"', close: '"'},
                {open: "'", close: "'"}
            ]
        }, t.prototype.shouldAutoClosePairImpl = function (e, t, n, r) {
            var i = T.findIndexInSegmentsArray(n, r), o = n[i];
            return o && "string.ts" === o.type ? !1 : !0
        }, t.prototype.onEnterImpl = function (e, t, n) {
            var r = m.onEnter(e, t, n);
            return r ? r : S.onEnter(e, t, n)
        }, t.prototype.onElectricCharacterImpl = function (e, t, n) {
            return m.onElectricCharacter(e, t, n) || S.onElectricCharacter(e, t, n)
        }, t.prototype.getCommentsConfiguration = function () {
            return{lineCommentTokens: ["//"], blockCommentStartToken: "/*", blockCommentEndToken: "*/"}
        }, t.prototype.getTriggerCharacters = function () {
            return["."]
        }, t.prototype.shouldAutotriggerSuggestImpl = function (e, t, n) {
            if (0 === t.length)return!1;
            var r = T.findIndexInSegmentsArray(t, n - 1), i = t[r].type;
            return i.indexOf("string") >= 0 || i.indexOf("comment") >= 0 || i.indexOf("number") >= 0 ? !1 : !0
        }, t.prototype.findOccurrences = function (t, n, r) {
            return"undefined" == typeof r && (r = !1), e.prototype.findOccurrences.call(this, t, n, r, this.smallWorker)
        }, t.prototype.getOutline = function (e) {
            return this.request("getOutline", this.smallWorker, e)
        }, t.prototype.suggest = function (t, n) {
            return e.prototype.suggest.call(this, t, n, this.smallWorker)
        }, t.prototype.getSuggestionDetails = function (e, t, n) {
            return this.request("getSuggestionDetails", this.smallWorker, e, t, n)
        }, t.prototype.getParameterHints = function (e, t) {
            return this.request("getParameterHints", this.smallWorker, e, t)
        }, t.prototype.getEmitOutput = function (e, t) {
            return this.request("getEmitOutput", this.smallWorker, e, t)
        }, t.prototype.navigateValueSet = function (t, n, r) {
            return e.prototype.navigateValueSet.call(this, t, n, r, this.smallWorker)
        }, t.prototype.computeDiff = function (t, n) {
            return e.prototype.computeDiff.call(this, t, n, this.smallWorker)
        }, t
    }(d.AbstractMode);
    t.TypeScriptMode = C
});