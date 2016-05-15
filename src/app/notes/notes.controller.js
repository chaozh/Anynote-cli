export class NotesController {
    constructor ($state, $stateParams) {
        'ngInject';

        Object.assign(this, {
            $state, $stateParams
        });

        this.favorsData = [1,2,3];
        this.booksData = [1,2,3];
        this.tagsData = [];

        this.excerptsData = [];

        this.preview = false;
        //this.id = $stateParams.id; // fetch from url
    }

    getTags () {
        this.tagsData = [1,2,3,4];
    }

    getExcerpts () {
        this.excerptsData = [{title:'test', content: '<p>good</p>'},
        {title:'test2', content: '<p>good</p>'}];
    }
}
