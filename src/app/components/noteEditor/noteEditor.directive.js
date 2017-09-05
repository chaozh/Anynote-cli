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
        bindToController: true
    };

    return directive;
}

class NoteEditorController {
    constructor ($scope, $state, $stateParams, NOTE_EVENTS) {
        'ngInject';

         Object.assign(this, {
            $scope, $state, $stateParams, NOTE_EVENTS
        });

        this.delta = false;
        this.revisions = [];
        //for editor
        this.editorOptions = {
            mode:'note',
            autosave: {
                enabled: true,
                uniqueId: "noteEditor"
            },
            hideIcons: ["guide"],
            renderingConfig: {
                singleLineBreaks: false,
                codeSyntaxHighlighting: true
            },
            previewRender: (plainText, preview) => {

            }
        };
        this.editorLoaded = this.editorLoaded.bind(this);
    }

    editorLoaded (_editor) {
        //fetch #line ?
        this.editor = _editor;
        // watch content tag

        // timer to revisions & update
        this.$scope.$emit(this.NOTE_EVENTS.noteUpdate, this.revisions);

        // apply or digest
        this.$scope.$on(this.NOTE_EVENTS.noteInit, (event, data) => {
            _editor.value(data);
        });
        this.$scope.$on(this.NOTE_EVENTS.noteSync, (event, data) => {
            _editor.value(data);
        });
    }
}
