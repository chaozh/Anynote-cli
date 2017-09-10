export class PostsController {
    constructor ($scope, $state, $stateParams, noteEditorService, postEditorService, POST_EVENTS, NOTE_EVENTS) {
        'ngInject';

        Object.assign(this, {
            $scope, $state, $stateParams, noteEditorService, postEditorService, POST_EVENTS, NOTE_EVENTS
        });

        this.favorsData = [];
        this.booksData = [];
        this.tagsData = [];

        this.preview = false;

        this.notes = [];
        this.items = [];
        //
        this.excerpts = [];
        this.getExcerpts();

        //compare id & noteId, watch
        this.id = this.$stateParams.id;
        if (angular.isNumber(this.id)){
            this.postEditorService.getPost(this.id).then(post => {
                this.post = post;
                // trigger load event
                this.$scope.$broadcast(this.POST_EVENTS.postLoaded, post);
            });
        } else {
            this.post = this.postEditorService.getEmptyPost();
            // trigger init event
            this.$scope.$broadcast(this.POST_EVENTS.postInit, this.post);
        }
        // post edit
        this.$scope.$on(this.POST_EVENTS.postEdit, (event, data) => {
            this.id = data;
            this.postEditorService.getPosr(this.id).then(post => {
                this.post = post;
                // trigger load event
                this.$scope.$broadcast(this.NOTE_EVENTS.noteLoaded, post);
            });
        });

        this.$scope.$on(this.POST_EVENTS.postDelete, (event, data) => {
            this.postEditorService.deletePost(data);
        });
    }

    getTags() {
        this.postEditorService.getTags().then(tags => {
            this.tagsData = tags;
        });
    }

    getExcerpts() {
        this.postEditorService.getPosts().then(excerpts => {
            // TODO
            this.excerpts = excerpts;
            // excerpt change event
            this.$scope.$broadcast(this.NOTE_EVENTS.noteAllLoaded, excerpts);
        });

    }

    getItems() {
        //
        ids = this.post.notes.split(',');
        this.postEditorService.getNotes().then(notes => {
            this.items = notes;
            // for post edit
        })
    }

    sync() {
        //deal with content also with tags & book
        var post_ = this.post;
        if (post_.content === "") {
            // no need for publish
            return;
        }

        // TODO
        if (post_.title === "") {
            post_.title = post_.content.substring(20);
            post_.url = post_.title;
        }
        // fetch user from global
        post_.UID = this.$scope.main.user.UID;
        // merge content from notes
        for (note in this.notes){
            this.post.content += note.html;
            this.post.notes.push(note.NID);
        }
        this.post.notes = this.post.notes.join(',');

        if(angular.isNumber(post_.PID)) {
            this.noteEditorService.updateNote(post_.PID, post_).then(post => {
                this.post = post;
                // trigger sync event
                //this.$scope.$broadcast(this.NOTE_EVENTS.noteSync, this.note);
            });
        } else {

            this.noteEditorService.newNote(post_).then(post => {
                this.post = post;
                // trigger sync event
                //this.$scope.$broadcast(this.NOTE_EVENTS.noteSync, this.note);
            });
        }
    }
}
