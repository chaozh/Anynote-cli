//an overlay mode for note sytax

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"), require("../gfm/gfm"), require("../../addon/mode/overlay"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror", "../gfm/gfm", "../../addon/mode/overlay"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
    "use strict";
CodeMirror.defineMode("note", function(config, modeConfig) {
    var codeDepth = 0;

    var tokenTypes = {
        book: "link",
        tags: "tag",
        math: "comment",
        toc: "link"
    };

    var regexs = {
        //@(示例笔记本)[马克飞象|帮助|Markdown]
        //d = /^@(?:\((.*)\))?(?:\[(.*)\])?/m,
        book: /^\@(\((.*)\))/,
        //tags: 马克飞象, 帮助, Markdown
        tags: /\s*[\,\|\uff0c]\s*/,
        math: /\$\$(.*)\$\$/,
        toc: "[toc]"
    };

    var noteOverlay = {
        startState: function() {
            //state object
            return {
                tagsBlock: false
                //tableBlock: false, difficult to highlight syntax
            };
        },

        copyState: function(s) {
            return {
                tagsBlock: s.tagsBlock
            };
        },
        // pass in word stream & state object
        token: function(stream, state) {
            // Check book
            if (stream.sol() && stream.match(regexs.book)) {
                // check tags
                stream.eatSpace();
                // start tag state
                if (stream.peek() === '[') {
                    stream.next();
                    state.tagsBlock = true;
                    return tokenTypes.book;
                }
            }

            if (state.tagsBlock) {
                state.tagsBlock = false;
                if (stream.skipTo("]")){
                    return tokenTypes.tags;
                }
            }

            // check math esp within $$
            if (stream.match(regexs.math)) {
                return tokenTypes.math;
            }

            // check toc esp with blank line
            if (stream.sol() && stream.match(regexs.toc, true, true)) {
                stream.eatSpace();
                if(stream.eol()){
                    return tokenTypes.toc;
                }
            }

            // rest markdown
            stream.next();
            return null;
        },

        blankLine: function(state) {
            state.tagsBlock = false;
            return null;
        }
    };

    return CodeMirror.overlayMode(CodeMirror.getMode(config), noteOverlay);
}, "gfm");

    CodeMirror.defineMIME("text/x-note", "note");

    // deal with hint
    var Pos = CodeMirror.Pos;
    function getCompletions(token, context, keywords, options) {

    }

    function fetchStartPoint(token) {
        var index = token.string.lastIndexOf("\.");
        if (index < 0) {
            return token.start + 1;
        } else {
            return token.start + index + 1;
        }
    }

    function noteHint(editor, options) {
        var cur = editor.getCursor(), token = editor.getTokenAt(cur), tprop = token;
        return {
            list : getCompletions(token, CodeMirror.noteContext, CodeMirror.noteContext, options),
            from : Pos(cur.line, fetchStartPoint(token)),
            to : Pos(cur.line, token.end)
        };
    };
    CodeMirror.registerHelper("hint", "note", noteHint);
});
