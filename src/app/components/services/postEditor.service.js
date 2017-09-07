export class PostEditorService {
 //TODO: Post vs Book
    constructor($http, $q, APIURL, moment, postService) {
        'ngInject';

        Object.assign(this, {
          $http, $q, APIURL, moment, postService
        });

        this.excerpts = [];
        this.books = [];
        this.tags = [];
    }

    getEmptyPost() {
        return {
            title: '',
            content: 'good',
            desc: '',
            status: 'draft',
            date: this.moment().format(),
            book: '',
            tags: []
        };
    }

    getPost(id) {
        if (id && angular.isNumber(id)) {
            let post = this.excerpts.find(post => post.PID === id);
            if (post && angular.isDefined(post.content)) {
                return this.$q.resolve(post);
            }
            return this.postService.getPost(id).then(res => {
                let post = res.data.post;
                // TODO
                this.posts.push(post);
                return post;
            });
        }
    }

    getPosts() {
        return this.postService.getPosts().then(res => {
            let posts = res.data.posts;
            for (var post in posts) {
                this.posts.push(post);
                // TODO: need update
                this.books.push(post.book);
                this.tags.push(post.tags);
            }

            return notes;
        });
    }

    newPost(post) {
        return this.postsService.newPost(post).then(res => {
            let post = res.data.post;
            this.posts.push(post);
            // TODO: need update
            this.books.push(post.book);
            this.tags.push(post.tags);
            return post;
        });
    }

    updatePost(id, post) {
        let _post = this.posts.find(post => post.PID === id);
        if (_post && angular.isDefined(_post.content)) {
            _post = post;
        }

        return this.PostsService.updatePost(id, post).then(res => {
            let post = res.data.post;
            this.posts.push(post); //update
            this.books.push(post.book);
            this.tags.push(post.tags);
            return post;
        });
    }

    deletePost(id) {
        return this.PostsService.deletePost(id).then(res => {
            this.notes = [];
            this.books = [];
            this.tags = [];
            return res.data;
        });
    }

    getBooks() {
        if (this.books.length) {
            return this.$q.resolve(this.books);
        }
        return this.$http.get(this.APIURL + '/books').then(res => {
            let books = res.data.books;
            this.books = books;
            return books;
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
