export class PostsController {
    constructor ($state, $stateParams, notesService, postService, NOTE_EVENTS) {
        'ngInject';

        Object.assign(this, {
            $state, $stateParams, notesService, postService, NOTE_EVENTS
        });

        this.favorsData = [1,2,3];
        this.booksData = [1,2,3];
        this.tagsData = [1,2,3];

        this.noteExcerpts = [{title:'test', content: '<p>good</p>'},
        {title:'test2', content: '<p>good</p>'}];

        this.postExcerpts = [];

        this.preview = false;
  }

  sync() {

  }
}
