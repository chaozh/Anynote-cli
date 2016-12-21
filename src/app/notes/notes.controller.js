export class NotesController {
    constructor ($scope, $state, $stateParams, noteEditorService, NOTE_EVENTS) {
        'ngInject';

        Object.assign(this, {
            $scope, $state, $stateParams, noteEditorService, NOTE_EVENTS
        });

        this.favorsData = [];
        this.booksData = [];
        this.tagsData = [];
        // reference to notes
        this.excerptsData = [];
        this.getExcerpts();

        this.preview = false;
        this.saving = false;
        //compare id & noteId, watch
        this.id = this.$stateParams.id;
        if (angular.isNumber(this.id)){
            this.noteEditorService.getNote(this.id).then(note => {
                this.note = note;
                // trigger load event
            });
        } else {
            this.note = this.noteEditorService.getEmptyNote();
            // trigger init event
        }

        //watch sync event
        //this.$scope.$on(NOTE_EVENTS.noteUpdate, this.sync);
    }

    getTags () {
        this.noteEditorService.getTags().then(tags => {
            this.tagsData = tags;
        });
    }

    getExcerpts () {
        this.noteEditorService.getNotes().then(notes => {
            this.excerptsData = notes;
        });

    }

    sync() {
        //deal with content also with tags & book
        if(angular.isNumber(this.note.id)) {
            this.noteEditorService.updateNote(this.note.id, this.note).then(note => {
                this.note = note;
                // trigger sync event
            });
        } else {
            console.log(this.note);

            this.noteEditorService.newNote(this.note).then(note => {
                this.note = note;
                // trigger sync event
            });
        }

    }
}
