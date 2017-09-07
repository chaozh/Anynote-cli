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
        this.notesData = [];
        this.getExcerpts();

        this.preview = true;
        this.saving = false;
        //compare id & noteId, watch
        this.id = this.$stateParams.id;
        if (angular.isNumber(this.id)){
            this.noteEditorService.getNote(this.id).then(note => {
                this.note = note;
                // trigger load event
                this.$scope.$broadcast(this.NOTE_EVENTS.noteLoaded, note);
            });
        } else {
            this.note = this.noteEditorService.getEmptyNote();
            // trigger init event
            this.$scope.$broadcast(this.NOTE_EVENTS.noteInit, this.note);
        }

        //watch sync event
        // this.$scope.$on(this.NOTE_EVENTS.noteUpdate, (event, data) => {
        //     this.sync();
        // });
        this.$scope.$on(this.NOTE_EVENTS.noteEdit, (event, data) => {
            this.id = data;
            this.noteEditorService.getNote(this.id).then(note => {
                this.note = note;
                // trigger load event
                this.$scope.$broadcast(this.NOTE_EVENTS.noteLoaded, note);
            });
        });

        this.$scope.$on(this.NOTE_EVENTS.noteDelete, (event, data) => {
            this.noteEditorService.deleteNote(data);
        });
    }

    getTags () {
        this.noteEditorService.getTags().then(tags => {
            this.tagsData = tags;
        });
    }

    getExcerpts () {
        this.noteEditorService.getNotes().then(notes => {
            this.notesData = notes;
            // excerpt change event
            this.$scope.$broadcast(this.NOTE_EVENTS.noteAllLoaded, notes);
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

        if(angular.isNumber(note_.NID)) {
            this.noteEditorService.updateNote(note_.NID, note_).then(note => {
                this.note = note;
                // trigger sync event
                this.$scope.$broadcast(this.NOTE_EVENTS.noteSync, this.note);
            });
        } else {

            this.noteEditorService.newNote(note_).then(note => {
                this.note = note;
                // trigger sync event
                this.$scope.$broadcast(this.NOTE_EVENTS.noteSync, this.note);
            });
        }

    }
}
