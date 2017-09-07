export class NoteEditorService {
 //TODO: Note vs Book
    constructor($http, $q, APIURL, moment, noteService) {
        'ngInject';

        Object.assign(this, {
          $http, $q, APIURL, moment, noteService
        });

        this.notes = [];
        this.tags = [];
    }

    getEmptyNote() {
        return {
            title: '',
            content: 'good',
            html: '',
            status: 'draft',
            date: this.moment().format(),
            tags: []
        };
    }

    getNote(id) {
        if (id && angular.isNumber(id)) {
            let note = this.notes.find(note => note.NID === id);
            if (note && angular.isDefined(note.content)) {
                return this.$q.resolve(note);
            }
            return this.noteService.getNote(id).then(res => {
                let note = res.data.note;
                // TODO
                this.notes.push(note);
                return note;
            });
        }
    }

    getNotes() {
        return this.noteService.getNotes().then(res => {
            let notes = res.data.notes;
            for (var note in notes) {
            this.notes.push(note);
            // TODO: need update
            this.tags.push(note.tags);
            }

            return notes;
        });
    }

    newNote(note) {
        return this.noteService.newNote(note).then(res => {
            let note = res.data.note;
            this.notes.push(note);
            // TODO: need update
            this.tags.push(note.tags);
            return note;
        });
    }

    updateNote(id, note) {
        let _note = this.notes.find(note => note.NID === id);
        if (_note && angular.isDefined(_note.content)) {
            _note = note;
        }

        return this.NotesService.updateNote(id, note).then(res => {
            let note = res.data.note;
            this.notes.push(note); //update
            this.tags.push(note.tags);
            return note;
        });
    }

    deleteNote(id) {
        return this.NotesService.deleteNote(id).then(res => {
            this.notes = [];
            this.tags = [];
            return res.data;
        });
    }

    getTags() {
        if (this.tags.length) {
            return this.$q.resolve(this.tags);
        }
        return this.$http.get(this.APIURL + '/tags').then(res => {
            let tags = res.data.tags;
            this.tags = tags;
            return tags;
        });
    }
}
