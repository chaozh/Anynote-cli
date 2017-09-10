export function PostEditorDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/components/postEditor/postEditor.html',
        scope: {
           notes: '=',
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

        // note edit
        // this.$scope.$on(this.NOTE_EVENTS.noteEdit, (event, data) => {
        //     this.id = data;
        //     this.postEditorService.getNote(this.id).then(note => {
        //         this.note = note;
        //         // trigger load event
        //         this.$scope.$broadcast(this.NOTE_EVENTS.noteLoaded, note);
        //     });
        // });
    }

    ok() {
        this.$uibModalInstance.close(this.note);
    }

    cancel() {
        this.$uibModalInstance.dismiss('cancel');
    }

    edit(id) {
        this.note = this.notes.find(note => note.NID === id);
    }
}

class PostEditorController {
    constructor ($scope, $uibModal, postEditorService) {
        'ngInject';

        Object.assign(this, {
            $scope, $uibModal, postEditorService
        });
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
            console.log(this);
            this.items.push(note);
        });
    }
}
