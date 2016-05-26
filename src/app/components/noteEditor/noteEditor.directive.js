export function NoteEditorDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/components/noteEditor/noteEditor.html',
        scope: {
            tags: '=',
            getTags: '&'
        },
        controller: NoteEditorController,
        controllerAs: 'vm',
        bindToController: true,
        // link: function(scope, elm, attr) {

        //       scope.$watch('noteId', (newValue, oldValue) => {
        //           if (newValue !== oldValue) {
        //             // You actions here
        //             console.log("I got the new value! ", newValue);
        //           }
        //       }, true);
        //}
    };

    return directive;
}

class NoteEditorController {
    constructor ($state, $stateParams, noteService) {
        'ngInject';

         Object.assign(this, {
            $state, $stateParams, noteService
        });

        //compare id & noteId, watch
        var id = this.$stateParams.id;
        if (id !== undefined){
            noteService.getNote(id).then(note => {
                this.note = note;
            });
        } //else create new note

        this.refresh = false;
        this.editorOptions = {
            mode:'gfm',
            lineWrapping: true
            //lineNumbers: true
        };
        this.codemirrorLoaded = this.codemirrorLoaded.bind(this);
    }
    //http://codemirror.net/1/contrib/sql/index.html
    //http://langnostic.inaimathi.ca/posts/briefly-async-completions-with-code-mirror
    // new syntax & autocomplete
    codemirrorLoaded (_editor) {
        var _doc = _editor.getDoc();
        _editor.focus();
        //setup a timer for sync with server

        //fetch #line ?
        _editor.on('change', function(){

            //console.log(_doc);
        });
    }
}
