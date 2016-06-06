export class PostsController {
    constructor () {
        'ngInject';

        this.favorsData = [1,2,3];
        this.booksData = [1,2,3];
        this.tagsData = [1,2,3];

        this.noteExcerpts = [{title:'test', content: '<p>good</p>'},
        {title:'test2', content: '<p>good</p>'}];

        this.postExcerpts = [];
  }
}
