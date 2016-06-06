export class NotesController {
    constructor ($state, $stateParams, noteService, moment) {
        'ngInject';

        Object.assign(this, {
            $state, $stateParams, noteService, moment
        });

        this.favorsData = [];
        this.booksData = [];
        this.tagsData = [];
        // reference to notes
        this.excerptsData = [];
        this.getExcerpts();

        this.preview = false;
        //compare id & noteId, watch
        this.id = this.$stateParams.id;
        if (angular.isNumber(this.id)){
            this.noteService.getNote(this.id).then(note => {
                this.note = note;
            });
        } else {
            this.note = {
                //title: 'test',
                content: '# test',
                html: '',
                status: 'draft',
                date: this.moment().format()
            };
        }
        //watch sync event

    }

    getTags () {
        this.tagsData = [1,2,3,4];
    }

    getExcerpts () {
        this.noteService.getNotes().then(notes => {
            this.excerptsData = notes;
        });
        this.excerptsData = [{title:'test', html: '<p>good</p>'},
        {title:'test2', html: '<p>good</p>'}];
    }

    publish() {
        //deal with content
        this.noteService.updateNote(this.note).then(note => {
            this.note = note;
        });
        //deal with tags

    }
}
