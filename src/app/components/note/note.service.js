export class NoteService {

  constructor($http, $q, APIURL) {
    'ngInject';

    Object.assign(this, {
      $http, $q, APIURL
    });

    this.notes = [];
    this.books = [];
    this.tags = [];
  }

  getNotes() {
    if (this.notes.length) {
      return this.$q.resolve(this.notes);
    }
    return this.$http.get(this.APIURL + '/notes').then(res => {
      this.notes = res.data;
      return res.data;
    });
  }

  getNote(id) {
    let note = this.notes.find(note => note.id === id);
    if (note && angular.isDefined(note.content)) {
      return this.$q.resolve(note);
    }
    return this.$http.get(this.APIURL + '/notes/' + id).then(res => {
      let note = this.notes.find(note => note.id === id) || {};
      return Object.assign(note, res.data);
    });
  }

  newNote(note) {
    return this.$http.post(this.APIURL + '/notes/', note).then(res => {
      this.notes.push(res.data);
      this.books.push(res.data.books);
      this.tags.push(res.data.tags);
      return res.data;
    });
  }

  updateNote(id, note) {
    return this.$http.put(this.APIURL + '/notes/' + id, note).then(res => {
      this.notes.push(res.data);
      this.books.push(res.data.books);
      this.tags.push(res.data.tags);
      return res.data;
    });
  }

  deleteNote(id) {
    return this.$http.delete(this.APIURL + '/notes/' + id).then(res => {
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
      this.books = res.data;
      return res.data;
    });
  }

  getTags() {
    if (this.tags.length) {
      return this.$q.resolve(this.tags);
    }
    return this.$http.get(this.APIURL + '/tags').then(res => {
      this.tags = res.data;
      return res.data;
    });
  }
}
