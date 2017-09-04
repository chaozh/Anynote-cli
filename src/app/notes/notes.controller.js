export class NotesController {
    constructor ($scope, $state, $stateParams, $log, noteEditorService, NOTE_EVENTS) {
        'ngInject';

        Object.assign(this, {
            $scope, $state, $stateParams, $log, noteEditorService, NOTE_EVENTS
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
        var note_ = this.note;
        if (note_.content === "") {
            // no need for publish
            return;
        }

        // TODO
        if (note_.title === "") {
            note_.title = note_.content.substring(20);
            note_.url = note_.title;
        }
        // fetch user from global
        note_.UID = this.$scope.main.user.UID;
        // TODO
        note_.url = note_.title;
        this.$log.warn(note_);

        if(angular.isNumber(note_.id)) {
            this.noteEditorService.updateNote(note_.id, note_).then(note => {
                this.note = note;
                // trigger sync event
            });
        } else {

            this.noteEditorService.newNote(note_).then(note => {
                this.note = note;
                // trigger sync event
            });
        }

    }
}
