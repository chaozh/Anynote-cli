export function NoteEditorDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        require: 'simplemde',
        templateUrl: 'app/components/noteEditor/noteEditor.html',
        scope: {
            note: '='
        },
        controller: NoteEditorController,
        controllerAs: 'vm',
        bindToController: true,
        link: function(scope, elm, attr, simplemde) {
            var editor = simplemde.get();
            this.scope.editor = editor;
        }
    };

    return directive;
}

class NoteEditorController {
    constructor ($scope, $state, $stateParams) {
        'ngInject';

         Object.assign(this, {
            $scope, $state, $stateParams
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
        this.editorLoaded = this.editorLoaded.bind(this);
    }

    editorLoaded (editor) {
        //fetch #line ?

    }

    autoUpdate(_editor) {
        // Save baseModel
        this.baseModel = _editor.getValue();
        // Start from `baseModel`
        var lastModel = this.baseModel;
        _editor.focus();
        //setup a timer for sync with server
        setInterval(() => {
            this.$apply(() => {
                // change note status: title,content

                // Show message
                this.saving = true;
                // compute delta and add to the revisions
                let currentModel = _editor.getValue();
                let delta = _editor.get(lastModel, currentModel);
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
