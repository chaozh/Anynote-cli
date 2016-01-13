export class NotesController {
    constructor () {
        'ngInject';

        this.homeTxt = 'notes';
        this.favorsData = [1,2,3];
        this.booksData = [1,2,3];
        this.tagsData = [1,2,3];
    }

    getTagsData () {
        this.tagsData = [1,2,3,4];
    }


}
