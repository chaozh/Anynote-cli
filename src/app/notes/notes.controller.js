export class NotesController {
    constructor () {
        'ngInject';

        this.favorsData = [1,2,3];
        this.booksData = [1,2,3];
        this.tagsData = [];

        this.excerptsData = [{title:'test', content: '<p>good</p>'},
        {title:'test2', content: '<p>good</p>'}];

        this.preview = false;
    }

    getTags () {
        this.tagsData = [1,2,3,4];
    }


}
