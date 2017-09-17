export function PostEditorDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/components/postEditor/postEditor.html',
        scope: {
           items: '='
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
        this.$uibModalInstance.close(this.note);
    }

    cancel() {
        this.$uibModalInstance.dismiss('cancel');
    }

    edit(id) {
        this.note = this.notes.find(note => note.NID === id);
        // also change style
    }

    delete(id) {

    }
}

class PostEditorController {
    constructor ($scope, $uibModal, postEditorService, noteEditorService, NOTE_EVENTS) {
        'ngInject';

        Object.assign(this, {
            $scope, $uibModal, postEditorService, noteEditorService, NOTE_EVENTS
        });

        // for note pick up
        this.notes = [];
        this.getExcerpts();

        this.sortableConf = {
            animation: 1000,
            chosenClass: 'drag-chosen',
            forceFallback: true
        }
    }

    editItem(index, note) {
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
                    return note;
                }
              }
        });

        modalInstance.result.then((note) => {
            this.items[index] = note;
        });
    }

    getExcerpts() {
        this.noteEditorService.getNotes().then(notes => {
            // TODO
            this.notes = notes;
            // excerpt change event
            this.$scope.$broadcast(this.NOTE_EVENTS.noteAllLoaded, notes);
        });

    }

    deleteItem(index) {
        this.items.splice(index, 1);
    }

    addItem() {
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
                    return {};
                }
              }
        });

        // append new note to place
        modalInstance.result.then((note) => {
            //console.log(this);
            this.items.push(note);
        });
    }
}
