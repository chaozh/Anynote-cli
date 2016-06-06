export function NoteEditorDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/components/noteEditor/noteEditor.html',
        scope: {
            note: '=',
            preview: '='
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
    constructor ($state, $stateParams) {
        'ngInject';

         Object.assign(this, {
            $state, $stateParams
        });

        this.saving = false;
        this.delta = false;
        this.revisions = [];
        this.revNumber = 0;
        //for editor
        this.editorOptions = {
            mode:'note',
            lineWrapping: true
            //lineNumbers: true
        };
        this.codemirrorLoaded = this.codemirrorLoaded.bind(this);
    }

    codemirrorLoaded (_editor) {
        //fetch #line ?
        _editor.on('change', function(){
            //this.delta = true;
        });
    }

    autoUpdate(_editor) {
        // Save baseModel
        this.baseModel = _editor.getValue();
        // Start from `baseModel`
        var lastModel = this.baseModel;
        _editor.focus();
        //setup a timer for sync with server
        setInterval(function(){
            this.$apply(function(){
                // Show message
                this.saving = true;
                // compute delta and add to the revisions
                var currentModel = _editor.getValue();
                var delta = _editor.get(lastModel, currentModel);
                // auto update
                if (delta) {
                    //trigger event
                }
                // update last revision
                lastModel = currentModel;
                // Hide saving message
                this.saving = false;

                this.changed = false;
            });
        }, 10000);
    }
}
