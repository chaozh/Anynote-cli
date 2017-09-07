export function PostEditorDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/components/postEditor/postEditor.html',
        scope: {
           notes: '='
        },
        controller: PostEditorController,
        controllerAs: 'editor',
        bindToController: true
    };

    return directive;
}

class NotesModalController {
    constructor($uibModalInstance, notes, note) {
        'ngInject';

        this.$uibModalInstance = $uibModalInstance;
        this.notes = notes;
        this.note = note;
    }

    ok() {
        this.$uibModalInstance.close();
    }

    cancel() {
        this.$uibModalInstance.dismiss('cancel');
    }

    edit(id) {
        this.note = this.note.find(note => note.NID === id);
    }
}

class PostEditorController {
    constructor ($uibModal) {
        'ngInject';

        Object.assign(this, {
            $uibModal
        });
        this.note = null;
    }

    addNote() {
        let modalInstance = this.$uibModal.open({
              templateUrl: 'notesModal.html',
              controller: NotesModalController,
              controllerAs: 'vm',
              bindToController : true,
              resolve: {
                notes: () => {
                    return this.notes;
                },
                note: () => {
                    return this.note;
                }
              }
        });

        let tpl = `<aside class="post-note draggable">
                <div class="content">this is a test2</div>
                <button class="btn btn-default" ng-click="editor.editNote()" role="button">
                    <span class="glyphicon glyphicon-edit" aria-hidden="true">Edit Note</span>
                </button>
            </aside>`;
        // append new note to place
        modalInstance.result.then();
    }
}
