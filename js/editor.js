var require = {
    baseUrl: "Script"
};

(function () {
    'use strict';

    var startTime = (new Date()).getTime();

    var lhs = {
        domNode: document.getElementById('typescriptEditor'),
        editor: null
    };

    var IDLE_STATE = 0,
        EDITORS_RENDERED = 1,
        SAMPLE_RENDERED = 2,
        SAMPLE_COMPILED = 4,
        FINISHED = 5,
        state = IDLE_STATE;

    (function () {

        var editorLoaded = false, typescriptModeLoaded = false, sampleLoaded = false;
        var typescriptMode = null, sample = '';

        require(['vs/editor/editor.main', 'vs/nls!vs/editor/editor.main', 'vs/css!vs/editor/editor.main'], function () {
            editorLoaded = true;

            Monaco.Editor.getOrCreateMode('text/typescript').then(function (mode) {
                typescriptModeLoaded = true;
                typescriptMode = mode;
                onSomethingLoaded();
            });

            onSomethingLoaded();
        });

        (function () {
            var queryStringSrcStart = window.location.hash.indexOf("#src=");
            var localStorageStart = window.localStorage;
            if (queryStringSrcStart == 0) {
                var encoded = window.location.hash.substring("#src=".length);
                try {
                    sample = decodeURIComponent(encoded);
                    sampleLoaded = true;
                    onSomethingLoaded();
                    return;
                } catch (e) {
                    console.log("unable to parse #src= uri component");
                    // intentionally fall through to alternatives if decode fails
                }
            } else if (localStorageStart) {
                sampleLoaded = true;
                sample = window.localStorage["src"] || '';
                onSomethingLoaded();
            }
        })();

        function onSomethingLoaded() {
            if (state === IDLE_STATE && editorLoaded) {
                lhs.editor = Monaco.Editor.create(lhs.domNode, {
                    value: '',
                    mode: 'text/plain',
                    fontIsMonospace: true,
                    suggestOnTriggerCharacters: true,
                    showTypeScriptWarnings: false
                });
                state = EDITORS_RENDERED;
                console.info('editors rendered @ ' + ((new Date()).getTime() - startTime) + 'ms');
            }
            if (state === EDITORS_RENDERED && sampleLoaded) {
                lhs.editor.getModel().setValue(sample);
                state = SAMPLE_RENDERED;
                console.info('sample rendered @ ' + ((new Date()).getTime() - startTime) + 'ms');
            }
            if (state === SAMPLE_RENDERED && typescriptModeLoaded) {
                lhs.editor.getModel().setValue(lhs.editor.getModel().getValue(), typescriptMode);
                console.info('sample colored @ ' + ((new Date()).getTime() - startTime) + 'ms');
                console.info('starting compilation @ ' + ((new Date()).getTime() - startTime) + 'ms');
                triggerCompile();
                lhs.editor.addListener("change", function () {
                    triggerCompile();
                });
                state = SAMPLE_COMPILED;
                console.info('sample compiled @ ' + ((new Date()).getTime() - startTime) + 'ms');
            }
            if (state === SAMPLE_COMPILED && javascriptModeLoaded) {
                state = FINISHED;
                console.info('sample compiled & colored @ ' + ((new Date()).getTime() - startTime) + 'ms');
            }
        }
    })();

    // ------------ Resize logic
    function resize() {
        // incorporate header and footer and adaptive layout
        var headerSize = 0; // 120
        var footerSize = 500;

        var horizontalSpace = 10;
        var windowHeight = window.innerHeight || document.body.offsetHeight || document.documentElement.offsetHeight;

        // Layout lhs
        var lhsSizeDiff = headerSize + footerSize;
        lhs.domNode.style.width = "100%";
        lhs.domNode.style.height = "400px";
        $('.tutorial').css('height', windowHeight - 430 + "px");
        if (lhs.editor) {
            lhs.editor.layout();
        }
    }

    resize();
    window.onresize = resize;

    // ------------ Compilation logic
    var compilerTriggerTimeoutID = null;
    var triggerCompile = function () {
        if (compilerTriggerTimeoutID !== null) {
            window.clearTimeout(compilerTriggerTimeoutID);
        }

        compilerTriggerTimeoutID = window.setTimeout(function () {
            try {
                var model = lhs.editor.getModel();
                var mode = model.getMode();

                mode.getEmitOutput(model.getAssociatedResource(), 'js').then(function (output) {
                    if (typeof output === "string") {
                        var tsOutput = window.document.getElementById('ts-output');
                        tsOutput.textContent = output;
                    }
                }, function (err) {
                    if (err.name === 'Canceled') {
                        return;
                    }
                    console.error(err);
                });
            } catch (e) {
                console.log("Error from compilation: " + e + "  " + (e.stack || ""));
            }
        }, 100);
    };

    // ------------ Execution logic
    /*document.getElementById("execute").onclick = */
    var toto = function () {
        var external = window.open();
        var script = external.window.document.createElement("script");
        //script.textContent =
        external.window.document.body.appendChild(script);
    };

    var ignoreHashChange = false;

    document.getElementById("share").onclick = function () {
        if (state < SAMPLE_RENDERED)
            return;
        var text = lhs.editor.getModel().getValue();
        var encoded = encodeURIComponent(text);
        ignoreHashChange = true;
        window.location = "#src=" + encoded;

        document.getElementById("share-message").style.display = "inline";
        var decodedHashLength;
        try {
            // this can throw when the hash gets cut off due to URI length in the middle of a %OA style escape
            decodedHashLength = decodeURIComponent(window.location.hash).length;
        } catch (e) {
            decodedHashLength = -1;
        }
        if (decodedHashLength === text.length + 5) {
            document.getElementById("share-message").textContent = " Shareable link now in address bar. ";
        } else {
            document.getElementById("share-message").textContent = " Text buffer too large to share. ";
        }
        lhs.editor.addOneTimeListener("change", function () {
            document.getElementById("share-message").style.display = "none";
        });
    };

    if ("onhashchange" in window) {
        window.onhashchange = function () {
            if (ignoreHashChange) {
                ignoreHashChange = false;
                return;
            }
            var queryStringSrcStart = window.location.hash.indexOf("#src=");
            if (queryStringSrcStart == 0) {
                var encoded = window.location.hash.substring("#src=".length);
                try {
                    var text = decodeURIComponent(encoded);
                    if (state >= SAMPLE_RENDERED) {
                        lhs.editor.getModel().setValue(text);
                    }
                } catch (e) {
                    console.log("unable to parse #src= uri component");
                }
            }
        }
    }

    // Save buffer to localStorage every second if there are changes to model
    if (window.localStorage) {
        var lastVersion;
        setInterval(function () {
            if (state < SAMPLE_RENDERED)
                return;
            var model = lhs.editor.getModel();
            var version = model.getVersionId();
            if (version !== lastVersion) {
                window.localStorage["src"] = model.getValue();
                lastVersion = version;
            }
        }, 1000);
    }

})();