export class TagsService {

    constructor($http, $q, APIURL) {
        'ngInject';

        Object.assign(this, {
            $http, $q, APIURL
        });

        this.url = this.APIURL + '/tags/';
    }

    getTag(id) {
        return this.$http.put(this.url + id);
    }

    getTags() {
        return this.$http.get(this.url);
    }

    newTag(tag) {
        return this.$http.post(this.url, tag);
    }

    updateTag(id, tag) {
        return this.$http.put(this.url + id, tag);
    }

    deleteTag(id) {
        return this.$http.delete(this.url + id);
    }
}
