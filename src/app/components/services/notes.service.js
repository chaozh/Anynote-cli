export class NotesService {

    constructor($http, $q, APIURL) {
        'ngInject';

        Object.assign(this, {
            $http, $q, APIURL
        });

        this.url = this.APIURL + '/notes/';
    }

    getNote(id) {
        return this.$http.get(this.url + id);
    }

    getNotes() {
        return this.$http.get(this.url);
    }

    newNote(note) {
        return this.$http.post(this.url, note);
    }

    updateNote(id, note) {
        return this.$http.put(this.url + id, note);
    }

    deleteNote(id) {
        return this.$http.delete(this.url + id);
    }
}
