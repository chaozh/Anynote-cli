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

    editorLoaded (_editor) {
        //fetch #line ?

    }
}
