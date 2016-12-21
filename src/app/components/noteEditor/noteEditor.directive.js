export function NoteEditorDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/components/noteEditor/noteEditor.html',
        scope: {
            note: '='
        },
        controller: NoteEditorController,
        controllerAs: 'vm',
        bindToController: true
    };

    return directive;
}

class NoteEditorController {
    constructor ($scope, $state, $stateParams) {
        'ngInject';

         Object.assign(this, {
            $scope, $state, $stateParams
        });

        this.delta = false;
        this.revisions = [];
        this.revNumber = 0;
        //for editor
        this.editorOptions = {
            mode:'note',
            renderingConfig: {
                singleLineBreaks: false,
                codeSyntaxHighlighting: true
            }
        };
        this.editorLoaded = this.editorLoaded.bind(this);
    }

    editorLoaded (_editor) {
        //fetch #line ?
        this.editor = _editor;
        // watch content tag
        //this.$scope.$on(NOTE_EVENTS.noteUpdated, this.sync);
        // timer to revisions & update
    }
}
