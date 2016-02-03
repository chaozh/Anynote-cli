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
        book: "book",
        tags: "tag",
        math: "math",
        toc: "toc"
    };

    var regexs = {
        //@(示例笔记本)[马克飞象|帮助|Markdown]
        //d = /^@(?:\((.*)\))?(?:\[(.*)\])?/m,
        book: /^ *@(\((.*)\))?(\[(.*?)\])? *(?:\n+|$)/,
        //tags: 马克飞象, 帮助, Markdown
        tags: /\s*[\,\|\uff0c]\s*/,
        math: /$$(.*)$$/,
        toc: /[TOC]/
    };

    var noteOverlay = {
        startState: function() {
            return {
                bookBlock: false,
                tagsBlock: false,
                mathBlock: false,
                tocBlock: false
                //tableBlock: false, difficult to highlight syntax
                //flowchatBlock: false same as codeBlock
            };
        },

        copyState: function(s) {
            return {
                bookBlock: s.bookBlock,
                tagsBlock: s.tagsBlock,
                mathBlock: s.mathBlock,
                todoBlock: s.todoBlock
            }
        },

        token: function(stream, state) {
            // Check tags
            if (state.bookBlock){

            }

        },

        blankLine: function(state) {
            //state.code = false;
            return null;
        }
    }

    var gfmConfig = {
        underscoresBreakWords: false,
        taskLists: true,
        strikethrough: true
    };
    for (var attr in modeConfig) {
        gfmConfig[attr] = modeConfig[attr];
    }
    gfmConfig.name = "gfm";
    return CodeMirror.overlayMode(CodeMirror.getMode(config, gfmConfig), noteOverlay);
});
    CodeMirror.defineMIME("text/x-note", "note");
});
